# Installing GPU Drivers

We need to find out the exact version of CUDA we have on our local
GPU before we install Python libraries.  We can find this out
by running the ```nvcc``` command at the UNIX shell.

```sh
nvcc --version
```

Response

```
$ nvcc --version
nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2024 NVIDIA Corporation
Built on Fri_Jun_14_16:34:21_PDT_2024
Cuda compilation tools, release 12.6, V12.6.20
Build cuda_12.6.r12.6/compiler.34431801_0
```

Note that the CUDA release is 12.6.  We will use this later in our installation process.