import os
import boto3


endpoint = os.getenv(
    "DYNAMODB_ENDPOINT",
    "http://localhost:8001"
)


dynamodb = boto3.resource(
    "dynamodb",
    endpoint_url=endpoint,
    region_name="eu-west-2",
    aws_access_key_id="dummy",
    aws_secret_access_key="dummy"
)


existing_tables = dynamodb.meta.client.list_tables()["TableNames"]


if "Events" in existing_tables:
    print("Events table already exists")
else:
    table = dynamodb.create_table(
        TableName="Events",
        KeySchema=[
            {
                "AttributeName": "event_id",
                "KeyType": "HASH"
            }
        ],
        AttributeDefinitions=[
            {
                "AttributeName": "event_id",
                "AttributeType": "S"
            }
        ],
        BillingMode="PAY_PER_REQUEST"
    )

    table.wait_until_exists()

    print("Events table created successfully")
