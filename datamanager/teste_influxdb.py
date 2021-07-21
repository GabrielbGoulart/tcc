from influxdb_client import InfluxDBClient
from datetime import datetime

from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS
token = ""
org = "meutcc"
bucket = "prices"
query = 'from(bucket: "prices")\
|> range(start: -10)\
|> filter(fn: (r) => r._measurement == "price")\
|> filter(fn: (r) => r.bond == "TFOF11")'

#establish a connection
client = InfluxDBClient(url="http://localhost:8086", token=token, org=org)
print('connected')
#instantiate the WriteAPI and QueryAPI
write_api = client.write_api(write_options=SYNCHRONOUS)
query_api = client.query_api()

#create and write the point
# p = Point("price").tag("bond", "PETRO4").field("value", 22.5)
# write_api.write(bucket=bucket,org=org,record=p)
#return the table and print the result
result = client.query_api().query(org=org, query=query)
results = []
for table in result:
    for record in table.records:
        print(record)
        results.append((record.get_time(),record.get_value(), record.get_field(),))
print(results)