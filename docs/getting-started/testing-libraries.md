# Testing Supporting Libraries

## Python Library Version Test

```py
import torch
print(f"PyTorch version: {torch.__version__}")
print(f"CUDA available: {torch.cuda.is_available()}")
print(f"CUDA version: {torch.version.cuda}")
```

## Sample Response

```
PyTorch version: 2.6.0+cu126
CUDA available: True
CUDA version: 12.6
```
