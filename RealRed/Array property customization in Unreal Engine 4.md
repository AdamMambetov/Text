# Array property customization in Unreal Engine 4

Я выяснил что для отображения массивов используется `FDetailArrayBuilder`, а для мапов такого нет, надо самому всё делать.

---

[June 15, 2020](https://devconsiderations.blogspot.com/2020/06/array-property-customization-in-unreal.html "permanent link")

With the drive towards as much data-driven gameplay as possible, there comes a need for easy to edit and nice to interact with data assets that can accommodate all that data. While Unreal Engine 4’s UI framework allows us to display a wide range of data structures, its default handling of nested properties can quickly result in deeply nested structures that need to be expanded in order to edit them. This can really hurt productivity in some scenarios. Fortunately, we have the ability to fully customize how our data is laid out. While there are nice tutorials all around the web that explain how to customize our custom classes and structs, I’ve not been able to find an article that would explain how one would go about customizing how collection types display their data. In this article I will describe how to customize the display of an array property in UE4. I will follow it with the one for customizing maps display in the near future.

## Defining the issue

I intend to explain the process in a very simple example. Throughout this article we will deal with two data structures and a data asset that makes use of them. The two structures are:
```c++
USTRUCT()
struct ARRAYCUSTOMIZATION_API FC_CustomSubStruct
{
    GENERATED_BODY()
	
    UPROPERTY(EditDefaultsOnly)
    FString someName;
    UPROPERTY(EditDefaultsOnly)
    int32 someValue;
};

USTRUCT()
struct ARRAYCUSTOMIZATION_API FC_CustomStruct
{
    GENERATED_BODY();
	
    UPROPERTY(EditDefaultsOnly)
    TArray<FC_CustomSubStruct>arrayProperty;
	
    UPROPERTY(EditDefaultsOnly)
    FC_CustomSubStruct subProperty;
};
```

And the data asset looks like so:

```c++
UCLASS()
class ARRAYCUSTOMIZATION_API UC_CustomDataAsset : public UDataAsset
{
    GENERATED_BODY()
	
    UPROPERTY(EditDefaultsOnly)
    FC_CustomSubStruct customArrayElement;
    UPROPERTY(EditDefaultsOnly)
    FC_CustomStruct customArrayProperty;
};
```

Pretty simple stuff and something we deal with quite often. Once compiled, this code will display the properties for us, but the way it does it leaves a lot to be desired. Here’s a snip of how the data asset looks like when it’s opened for edit:

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiYSa8EYTcFYJQYS7VRsI3rPNiDd0AEhL0rNxevYNzCTPfW0GdYPQzMUeiRVAdfBoVAXUjIUKKhV2B5u8rki_EagD1KE8X41i_VBdq1GfvSMHKcyxdMh_1KldDNnVz3y_7vmCxF_s4YqjM/s320/initial+layout.jpg)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiYSa8EYTcFYJQYS7VRsI3rPNiDd0AEhL0rNxevYNzCTPfW0GdYPQzMUeiRVAdfBoVAXUjIUKKhV2B5u8rki_EagD1KE8X41i_VBdq1GfvSMHKcyxdMh_1KldDNnVz3y_7vmCxF_s4YqjM/s401/initial+layout.jpg)

Notice how both properties are represented only as headers and need to be expanded before their properties can be edited. In an asset that contains lots of properties, this can become tedious and increases the chance of introducing bugs when editing this data. Our goal in this article is to get to this much more helpful and useful data layout:

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh6utaEsJZmCH4FxbKae7oEGf_p5P2i3PI-3eGyCKmHfnC4GKjkiGmdRfF9ZGfdh-l6Hko1vzErVIOm_uQOipu8hzP6oEjcLy2k0cK0W-DTM8Dpc54uhSUjxftWgWhFjEMwuJp9Z_eXPyo/s320/final+layout.jpg)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh6utaEsJZmCH4FxbKae7oEGf_p5P2i3PI-3eGyCKmHfnC4GKjkiGmdRfF9ZGfdh-l6Hko1vzErVIOm_uQOipu8hzP6oEjcLy2k0cK0W-DTM8Dpc54uhSUjxftWgWhFjEMwuJp9Z_eXPyo/s492/final+layout.jpg)

This layout takes way less space on the screen and it has the additional benefit of exposing the data as is, limiting the amount of tree drilling that’s required.  

## First steps

It is highly recommended to contain all our type details customization code in an editor module that’s separate from our main game module and can directly link the necessary UnrealEd dlls. If you don’t have such a module set up yet, there are plenty of good resources explaining the process on the Internet. A good example is [this article](https://sandordaemen.nl/blog/creating-an-editor-module-in-unreal-engine-4/).

Once you have your module set up, we need to prepare a details customization implementation for our `FC_CustomSubStruct` struct. Once that’s done, the struct will no longer need to be expanded and we will be able to edit it inline, like so:

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhFE_agQfmgN1JPJh7ljpQI5Iub2n1OBxbxrxy7STJpmYeLs0J82_GvNxzIjVn1GX5y5ZwhrU_Xcgl-keNDSlFTamSwvoseeoM4tFClTBjFswt4n4Ur7enbPVtwzwKUdo7Fam5FrF5xwfk/s320/layout+with+subtype+customization.jpg)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhFE_agQfmgN1JPJh7ljpQI5Iub2n1OBxbxrxy7STJpmYeLs0J82_GvNxzIjVn1GX5y5ZwhrU_Xcgl-keNDSlFTamSwvoseeoM4tFClTBjFswt4n4Ur7enbPVtwzwKUdo7Fam5FrF5xwfk/s481/layout+with+subtype+customization.jpg)

  

There are two steps required to do this:  

- Creating an implementation of the `IPropertyTypeCustomization` class (`IDetailsCustomization` if our type was a class)
- Registering it as a custom property type layout in the `FPropertyEditorModule`

## Creating `IPropertyTypeCustomization` for `FC_CustomSubStruct`

There are 3 functions one must implement in order to create an `IPropertyTypeCustomization` implementation.  

The first function is the `MakeInstance()` factory function. This one should simply return a `TSharedRef` of our customization implementation class as an `IPropertyTypeCustomization`.

Then there are two virtual functions we need to override where the meat of the action happens. Those are `void CustomizeHeader` and `void CustomizeChildren` (or `CustomizeDetails` in case of classes). This is where we’re going to put our customization code in. Below I’ve attached a full header file of what we’re going to implement:  

```c++
#include "IPropertyTypeCustomization.h"
#include "DetailLayoutBuilder.h"

class FC_CustomSubStructCustomization : public IPropertyTypeCustomization   
{
public:
	static TSharedRef MakeInstance();
	
	void CustomizeHeader(
		TSharedRef PropertyHandle,
		FDetailWidgetRow& HeaderRow,
		IPropertyTypeCustomizationUtils& CustomizationUtils);
	
	void CustomizeChildren(
		TSharedRef PropertyHandle,
		IDetailChildrenBuilder& ChildBuilder,
		IPropertyTypeCustomizationUtils& CustomizationUtils);
	
private:  
	TSharedPtr someNameProperty;  
	TSharedPtr someValueProperty;
};
```

# Implementing `CustomizeHeader` and `CustomizeChildren`  

When you think about what a property consists of in Unreal, it’s two main things: its header, where usually the name of the property is found, and its children, so everything that’s accessible when the property is expanded. This means that if we want to remove that pesky requirement to expand a property to access its members, we need to move children to the header of that property, or more precisely, to that header’s value. The simplest way to achieve this is to rebuild the header using the declarative syntax and leave the `CustomizeChildren` function empty to avoid any properties being added there. In this example, I will get a reference to the properties of the `FC_CustomSubStruct` (`someName` and `someValue`) and simply add them to horizontal box slots in the `ValueContent` of the `HeaderRow`:  

```c++
void FC_CustomSubStructCustomization::CustomizeHeader(
	TSharedRef PropertyHandle,
	FDetailWidgetRow& HeaderRow,
	IPropertyTypeCustomizationUtils& CustomizationUtils)
{
	someNameProperty = PropertyHandle->GetChildHandle(
		GET_MEMBER_NAME_CHECKED(FC_CustomSubStruct, someName));
	someValueProperty = PropertyHandle->GetChildHandle(
		GET_MEMBER_NAME_CHECKED(FC_CustomSubStruct, someValue));
	if (!someNameProperty || !someValueProperty)
    {
		return;
    }
    
	HeaderRow.NameContent()
	[
		PropertyHandle->CreatePropertyNameWidget()
	]
	.ValueContent()
	.MaxDesiredWidth(500.f)
	.MinDesiredWidth(300.f)
	[
		SNew(SHorizontalBox)
		
		+ SHorizontalBox::Slot()
		.HAlign(HAlign_Left)
		.VAlign(VAlign_Center)
		.Padding(1.f, 0.f)
		[
			someNameProperty->CreatePropertyNameWidget()
		]
		
		+ SHorizontalBox::Slot()
		.HAlign(HAlign_Fill)
		.VAlign(VAlign_Center)
		.Padding(1.f, 0.f)
		.MaxWidth(200.f)
		[
			someNameProperty->CreatePropertyValueWidget()
		]
		
		+ SHorizontalBox::Slot()
		.HAlign(HAlign_Left)
		.VAlign(VAlign_Center)
		.Padding(1.f, 0.f)
		[
			someValueProperty->CreatePropertyNameWidget()
		]
		
		+SHorizontalBox::Slot()
		.HAlign(HAlign_Fill)
		.VAlign(VAlign_Center)
		.Padding(1.f, 0.f)
		.MaxWidth(60.f)
		[
			someValueProperty->CreatePropertyValueWidget()
		]
	];
}
```

You can also create your own look for this data by instantiating some slate widgets here, but we’re not going to do this in this article for the sake of brevity. The approach I took here yields satisfactory results either way, and we’re not after fully custom display here. With that done, that’s pretty much it for the customization of `FC_CustomSubStruct` member properties display.  

# Registering a type customization  

We will be registering our custom `FC_CustomSubStruct` layout inside the implementation of our editor module’s `StartupModule` function. First, we’re loading the `PropertyEditor` module, like so:

```c++
FPropertyEditorModule& propertyModule = FModuleManager::LoadModuleChecked("PropertyEditor");
```

Next, we register our custom type display factory method in the property module:
```c++
propertyModule.RegisterCustomPropertyTypeLayout("C_CustomSubStruct", FOnGetPropertyTypeCustomizationInstance::CreateStatic(&FC_CustomSubStructCustomization::MakeInstance));
```

Here, we must remember to leave the _F_ of our `FC_CustomSubStruct` struct name out of the string used to identify the struct. If the type we’re customizing was a class, we’d then use the `RegisterCustomClassLayout` function instead of the `RegisterCustomPropertyTypeLayout`. Once this is done and the code compiled, our `FC_CustomSubStruct` should now be editable entirely inline without any expanding needed. Sweet. Now let’s see what we can do about removing that `Custom Array Property`, which still needs to be manually expanded to access the array.

# Customizing the look of `FC_CustomStruct`  

Since the array property is created automatically as an instance of the standard `TArray` edit slate widget, there is nothing we can really do about changing that behavior. What we can do, though, is create a custom layout for our `FC_CustomStruct` and inside it assign a custom instance of class derived from `FDetailArrayBuilder`. This builder class will take care of creating the look of our array property, both its header and its elements. Although we could customize this ourselves without using the builder class, deriving from it gives us the benefit of getting the drag and drop index switching behavior for free. The first step on our way to achieving this is creating and registering a custom type layout for the `FC_CustomStruct` property. This time around, we will be leaving its `CustomizeHeader` function empty and instead focus on implementing `CustomizeChildren`. As I already mentioned, we will also need an implementation of `FDetailArrayBuilder`, so let’s do code this one up now. We’ll call our custom array details builder `FC_CustomStructDetailsArrayBuilder` and make it derive from both `FDetailArrayBuilder` and `TSharedFromThis`.

Next up, we need to implement its `GenerateEntry` function and provide a constructor that’s going to take in the array’s property handle. The code below represents our header file contents:

```c++
class FC_CustomStructDetailsArrayBuilder : public FDetailArrayBuilder, public TSharedFromThis
{
public:
    FC_CustomStructDetailsArrayBuilder(TSharedRef inBaseProperty);
	
    virtual void GenerateChildContent(
	    IDetailChildrenBuilder& ChildrenBuilder) override;  
	
private:
    void GenerateEntry(
	    TSharedRef elementProperty,
	    int32 elementIndex,
	    IDetailChildrenBuilder& childrenBuilder);
	
private:
    TSharedPtr arrayPropertyHandle;
};
```

In our _cpp_ file we will implement the constructor. I’m caching the passed in property as an array property to make our code easier to work with down the line.  

```c++
FC_CustomStructDetailsArrayBuilder::FC_CustomStructDetailsArrayBuilder(TSharedRef inBaseProperty)
	: FDetailArrayBuilder(inBaseProperty, true, true, true)
	, arrayPropertyHandle(inBaseProperty->AsArray())
{}
```

Inside our `GenerateChildContent` function all we’re doing is iterating over current elements of our array property and call `GenerateEntry` function on them.  

```c++
void FC_CustomStructDetailsArrayBuilder::GenerateChildContent(
	IDetailChildrenBuilder& childrenBuilder)
{
    uint32 childrenCount = 0;
    arrayPropertyHandle->GetNumElements(childrenCount);
	
    for (uint32 childIndex = 0; childIndex < childrenCount; childIndex++)
    {
        TSharedRef elementHandle = arrayPropertyHandle->GetElement(childIndex);
        GenerateEntry(elementHandle, childIndex, childrenBuilder);
    }
}
```

The `GenerateEntry` function is super basic in this case - we’re just adding in a new property for every entry in the array. If we wanted to, we could further customize the display of these properties here, but that’s beyond the scope of this article.  

```c++
void FC_CustomStructDetailsArrayBuilder::GenerateEntry(
	TSharedRef elementProperty,
	int32 elementIndex,
	IDetailChildrenBuilder& childrenBuilder)
{
    IDetailPropertyRow& newElementRow = childrenBuilder.AddProperty(elementProperty);
    newElementRow.ShowPropertyButtons(true);
}
```

It’s also possible to generate a custom header for the array property, but I’m not going to go into this in this article. It’s a fairly simple process compared to what we did so far. With our builder ready to roll out those array elements, we can now get back to the customization class of our `FC_CustomStruct` type. We’re leaving its `CustomizeHeader` function empty as mentioned before, but inside the `CustomizeChildren` there’s a bit more going on this time around:  

```c++
void FC_CustomStructCustomization::CustomizeChildren(
	TSharedRef PropertyHandle,
	IDetailChildrenBuilder& ChildBuilder,
	IPropertyTypeCustomizationUtils& CustomizationUtils)
{
    static const FName arrayPropertyName = TEXT("arrayProperty");
    TSharedPtr subStructArrayProperty = PropertyHandle->GetChildHandle(
	    GET_MEMBER_NAME_CHECKED(FC_CustomStruct, arrayProperty));
	
    uint32 childPropertiesCount = 0;
    PropertyHandle->GetNumChildren(childPropertiesCount);
	
    for (uint32 childIndex = 0; childIndex < childPropertiesCount; childIndex++)
    {
        TSharedPtr propertyAtIndex = PropertyHandle->GetChildHandle(childIndex);
        if (propertyAtIndex == subStructArrayProperty)
        {
            subStructArrayBuilder = TSharedPtr(new FC_CustomStructDetailsArrayBuilder(subStructArrayProperty.ToSharedRef()));
            ChildBuilder.AddCustomBuilder(subStructArrayBuilder.ToSharedRef());
        }
        else
        {
            ChildBuilder.AddProperty(propertyAtIndex.ToSharedRef());
        }
    }
}
```

First off, we’re taking a handle to the array property which we will want to be built using our custom builder. Next, we iterate over the properties’ children. For every child that’s not our array property, we add it as is. If however the property is our array property, we create a shared ptr to our `FC_CustomStructDetailsArrayBuilder` instance and add that into the `ChildBuilder` using its `AddCustomBuilder` function. And that’s pretty much it. After the code is compiled, we end up with a nice and flat data layout that is a lot more user-friendly and almost entirely inline-editable.

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEileaiEolGKfG15cq53G-yXXS2d8SK_mrQzShNLYOfyHDVeavDWyTz4kwNDf0Dd96ojmrJhtjPN0Z1DBXwMNOUHIWAeDN2cJB4hVOj-1-dBbEifMGRjFNLJeBT2HPXFAPsOWxip82VdD4Y/s320/final+layout.jpg)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEileaiEolGKfG15cq53G-yXXS2d8SK_mrQzShNLYOfyHDVeavDWyTz4kwNDf0Dd96ojmrJhtjPN0Z1DBXwMNOUHIWAeDN2cJB4hVOj-1-dBbEifMGRjFNLJeBT2HPXFAPsOWxip82VdD4Y/s492/final+layout.jpg)

It’s also entirely possible to get rid of the array’s header altogether to flatten it further, but we’re not doing it in this particular case in order to keep things simple. Hopefully with the steps described above, you should be able to flatten that property hierarchy and inline it to improve the experience of you and your teammates. This kind of work takes some time initially, but once you get used to it, it’s a breeze to implement these kinds of customizations. Considering how much they can improve the work of your team and reduce clickcounts, I highly encourage you to explore doing this whenever you see an asset becoming unwieldy and difficult to browse. Next time, I will explore how we can use some of these same principles to customize the display of map types. Until then!