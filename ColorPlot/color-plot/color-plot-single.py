from collections import Counter
from sklearn.cluster import KMeans
from matplotlib import colors
import matplotlib.pyplot as plt
import numpy as np
import cv2
import time
import json

image_name='gen1.jpeg'
image = cv2.imread(image_name)
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
metadata={}
metadata['image']='ipfs://'
metadata['name']="Genealogy ADN #31"
metadata['description']="Check the history behind the product"
metadata['external_url']="https://genealogylf.com/"
metadata['image']="ipfs://Qmbf2aXn1pjUmv51QSeu1Us8rdqwEaeDLi1kUkwYMvv9g3/1.png"
metadata['dna']="3101"
metadata['edition']=1
metadata['date']=time.time_ns()
metadata['attributes']=[]
metadata['attributes'].append({'trait_type': 'Gen','value': '00'})
metadata['attributes'].append({'trait_type': "Colección",'value': 'Olga'})
metadata['attributes'].append({'trait_type': 'Revitalizado','value': 'Marzo 2022'})
metadata['attributes'].append({'trait_type': 'Artesan@(s)','value': "Gloria Tobón & Gladis Helena Tobón"})
metadata['attributes'].append({'trait_type': 'Material Donatedo por','value': 'Olga Velasquez Ortega'})
metadata['attributes'].append({'trait_type': 'Fecha y lugar de Donación','value': 'Rionegro, Antioquia 2020'})
plt.imshow(image)

def rgb_to_hex(rgb_color):
    hex_color = "#"
    for i in rgb_color:
        i = int(i)
        hex_color += ("{:02x}".format(i))
    return hex_color
def prep_image(raw_img):
    modified_img = cv2.resize(raw_img, (900, 600), interpolation = cv2.INTER_AREA)
    modified_img = modified_img.reshape(modified_img.shape[0]*modified_img.shape[1], 3)
    return modified_img
def color_analysis(img):
    clf = KMeans(n_clusters = 5)
    color_labels = clf.fit_predict(img)
    center_colors = clf.cluster_centers_
    counts = Counter(color_labels)
    print(counts)
    print(sorted(counts.values())[0])
    sorted_values=sorted(counts.values())
    print(sorted(counts.values())[1])
    ordered_colors = [center_colors[i] for i in counts.keys()]
    hex_colors = [rgb_to_hex(ordered_colors[i]) for i in counts.keys()]
    print(hex_colors[0])
    print(hex_colors[1])
    print(hex_colors[2])
    i=0
    j=len(sorted_values)
    total_count=0
    for count in counts.values():
        total_count=total_count+count
    print("total Count")
    print(total_count)
    for color in hex_colors:
        metadata['attributes'].append({'trait_type': 'color'+str(i+1),'value': hex_colors[i]})
        metadata['attributes'].append({'trait_type': "%color"+str(i+1),'value': sorted_values[j-1]*100/total_count})
        # metadata['attributes'].append({'trait_type': "%color"+str(i),'value:': counts[i]})
        i=i+1
        j=j-1
    with open('3201.json', 'w') as f:
        json.dump(metadata, f, indent=True)
    plt.figure(figsize = (12, 8))
    plt.pie(counts.values(), colors = hex_colors)
    plt.savefig("color_circle_"+image_name)
    print(hex_colors)
    # plt.show()
modified_image = prep_image(image)
color_analysis(modified_image)