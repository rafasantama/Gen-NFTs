import os
path_of_the_directory= "C:\Proyectos\NFT_Displayer\GenealogyNfts\color-plot\Tejidos"
print("Files and directories in a specified path:")
for filename in os.listdir(path_of_the_directory):
    f = os.path.join(path_of_the_directory,filename)
    if os.path.isfile(f):
        print(f)