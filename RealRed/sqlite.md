```cpp

void USqlManager::GetFieldByName(
	const FString& TableName,
	int32 Id,
	const FString& Name,
	bool& Success,
	FSqlResult& Result,
	ESqlError& Error,
	FString& ErrorMessage,
	const FString& IdName)
{
	const FString SelectCommand = FString::Printf(
		TEXT("SELECT %s FROM %s WHERE (%s = %d);"),
		*Name,
		*TableName,
		*IdName,
		Id
	);

	TArray<FSqlRow> Rows{};
	Success = GetRows(SelectCommand, Rows, Error, ErrorMessage);
	if (Success) {
		if (Rows.IsEmpty()) {
			Success = false;
			Error = ESqlError::IdNotValid;
			ErrorMessage = FString::Printf(
				TEXT("No rows with Id %d"),
				Id
			);
		} else {
			Result = Rows[0].Fields[0].Value;
		}
	}
}

void USqlManager::GetFieldsByNames(
	const FString& TableName,
	int32 Id,
	const TArray<FString>& Names,
	bool& Success,
	TArray<FSqlField>& Fields,
	ESqlError& Error,
	FString& ErrorMessage,
	const FString& IdName)
{
	if (Names.IsEmpty()) {
		Error = ESqlError::FieldNameNotValid;
		ErrorMessage = TEXT("Names is empty");
		Success = false;
		return;
	}

	const FString SelectCommand = FString::Printf(
		TEXT("SELECT %s FROM %s WHERE (%s = %d);"),
		*FString::Join(Names, TEXT(", ")),
		*TableName,
		*IdName,
		Id
	);

	TArray<FSqlRow> Rows{};
	Success = GetRows(SelectCommand, Rows, Error, ErrorMessage);
	if (Success) {
		if (Rows.IsEmpty()) {
			Success = false;
			Error = ESqlError::IdNotValid;
			ErrorMessage = FString::Printf(
				TEXT("No rows with Id %d"),
				Id
			);
		} else {
			Fields = Rows[0].Fields;
		}
	}
}

void USqlManager::GetAllFields(
	const FString& TableName,
	int32 Id,
	bool& Success,
	TArray<FSqlField>& Fields,
	ESqlError& Error,
	FString& ErrorMessage,
	const FString& IdName)
{
	const FString SelectCommand = FString::Printf(
		TEXT("SELECT * FROM %s WHERE (%s = %d);"),
		*TableName,
		*IdName,
		Id
	);

	TArray<FSqlRow> Rows{};
	Success = GetRows(SelectCommand, Rows, Error, ErrorMessage);
	if (Success) {
		if (Rows.IsEmpty()) {
			Success = false;
			Error = ESqlError::IdNotValid;
			ErrorMessage = FString::Printf(
				TEXT("No rows with Id %d"),
				Id
			);
		} else {
			Fields = Rows[0].Fields;
		}
	}
}

void USqlManager::GetAllRows(
	const FString& TableName,
	bool& Success,
	TArray<FSqlRow>& Rows,
	ESqlError& Error,
	FString& ErrorMessage)
{
	const FString SelectCommand = FString::Printf(
		TEXT("SELECT * FROM %s;"),
		*TableName
	);

	Success = GetRows(SelectCommand, Rows, Error, ErrorMessage);
}

void USqlManager::GetAllRowsByCondition(
	const FString& TableName,
	const FString& Condition,
	bool& Success,
	TArray<FSqlRow>& Rows,
	ESqlError& Error,
	FString& ErrorMessage)
{
	if (Condition.IsEmpty()) {
		Error = ESqlError::ConditionNotValid;
		ErrorMessage = TEXT("Condition is empty");
		Success = false;
		return;
	}

	const FString SelectCommand = FString::Printf(
		TEXT("SELECT * FROM %s WHERE (%s);"),
		*TableName,
		*Condition
	);

	Success = GetRows(SelectCommand, Rows, Error, ErrorMessage);
}
```

---

```
GetFieldByName          - SELECT %s FROM %s WHERE (%s = %d);

GetFieldsByNames        - SELECT %s FROM %s WHERE (%s = %d);

GetAllFields            - SELECT * FROM %s WHERE (%s = %d);

GetAllRows              - SELECT * FROM %s;

GetAllRowsByCondition   - SELECT * FROM %s WHERE (%s);
```