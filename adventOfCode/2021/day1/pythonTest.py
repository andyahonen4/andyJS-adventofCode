with open('input.txt', 'r') as f:
    lines = f.readlines()
    measurements = [int(entry.strip()) for entry in lines]
prev_entry = measurements[0]
increases = 0
for entry in measurements[1:]:
    if entry > prev_entry:
        increases += 1
    prev_entry = entry

print(len(measurements))
print(increases)