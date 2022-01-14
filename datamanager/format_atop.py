import matplotlib.pyplot as plt
t={'1_requisicao' :'/home/gabrel/Documentos/workspace/result/raws/memory_api_1req',
'20_requisicao':'/home/gabrel/Documentos/workspace/result/raws/memory_api_20req'}

content = {}
for context,filepath in t.items():
    content[context]={}
    with open(filepath) as fp:
        line = fp.readline()
        cnt = 1
        while line:
            parts = line.strip().split(' ')

            if parts[0] == 'ATOP':
                time = parts[8]
                content[context][time] = 0
            if parts[-1] == 'node':
                print(parts[3])
                content[context][time]=content[context][time]+int(parts[5][0:-1])

            line = fp.readline()
            cnt += 1
print(content)
for context,serie in content.items():
    x = [i  for i in range(300)]
    y = [0.0009765625* v for v in list(serie.values())[-300:]]
    plt.plot(x,y,label=context)
plt.legend()

plt.savefig("mygraph.png")
# plt.figure(figsize=(9, 3))

