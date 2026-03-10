import pandas as pd

csv_file_path = 'AI Job Market Dataset.csv'
json_file_path = 'data.json'

df = pd.read_csv(csv_file_path)

df.to_json(json_file_path, orient='records', indent=4)

print(f"Successfully converted {csv_file_path} to {json_file_path} using pandas")
