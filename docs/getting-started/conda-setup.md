# Conda Setup

## Creating a Conda Python Environment
```sh
conda create -n "agents" python=3
conda activate agents
# note we are using cuda 12.6
pip install --upgrade torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu126
pip install --upgrade transformers accelerate bitsandbytes
```



