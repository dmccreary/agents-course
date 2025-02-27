# Conda Setup

## Install Conda



## Creating a Conda Python Environment
```sh
conda create -n "agents" python=3
conda activate agents
# note we are using cuda 12.6
pip install --upgrade torch torchvision torchaudio \
    --index-url https://download.pytorch.org/whl/cu126
pip install --upgrade transformers accelerate bitsandbytes
```

Before you activate the conda environment your prompt will have the string 'base' in it like this:

```
(base) $
```

```sh
conda activate agents
(agents) $
```

You can get a full list of all the Python libraries by using the ```pip freeze``` command.

```sh
pip freeze
```
