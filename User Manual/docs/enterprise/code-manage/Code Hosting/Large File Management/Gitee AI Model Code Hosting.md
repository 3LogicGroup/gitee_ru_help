---
title: How to host AI models on Gitee
slug: /enterprise/code-manage/code-hosting/large-file-manage/ai-model-hosting
keywords:
- AI
- AI Model
- open ai
- chatgpt
---

To help developers learn and develop AI models more efficiently, Gitee now supports AI model hosting, providing stable and high-speed hosting services for AI developers. Now, in addition to code, you can also host your AI models on Gitee.

## View AI Models

The management interface of AI models and the management interface of code have a unified style. The main difference is that after large files (such as AI model files), they are annotated with LFS file and indicate the space size they occupy, making it easy to locate the AI model files.

![LFS file size](./assets/gitee-ai-model-file-size.png)

## Download AI Models

### Downloading through web pages

If you want to download a specific AI model from the repository, just like downloading a file from the code repository, click on its filename and click download.

![Download LFS file](./assets/gitee-ai-model-download-file.png)

### Download via Command Line

In addition to the web page, you can also download the model file through the command line:

```bash
# Clone Repository
git clone https://gitee.ru/<your-gitee-repo-path>
cd <your-gitee-repo-path>

# If LFS has been globally started, AI models have all been downloaded automatically
# If LFS is not globally enabled, you can manually download the specified model.
git lfs install

# After execution, the model file at <model-file-path> can be used directly.
git lfs pull -I <model-file-path>
```

## Manage models using Git LFS

You can also use Git LFS to manage models. In the repository's tab page, go to "Manage" and then "Git LFS" option to view all LFS files in the repository, including their file types, sizes, and perform download and delete operations on them.

![Manage LFS](./assets/gitee-ai-model-manage-lfs.png)

## How to Upload AI Models to Gitee

So, how do you host AI models on Gitee? Is the process the same as code hosting?

Similar to code hosting, supports two ways to upload AI models: importing from Hugging Face and pushing from local

### Import from Hugging Face

Hugging Face is a very active AI startup. It has an active AI community. Over 5000 institutions have published content in the Hugging Face community, including Google AI, Facebook AI, Microsoft, etc., which makes it the most familiar AI technology community for developers at present.

Now you can directly import Hugging Face models to Gitee using their model address, similar to importing code repositories.

- Click the "+" next to the avatar in the upper right corner and select "Import from External Repository";
- Enter the Hugging Face address you want to import into the Git repository URL, and Gitee will automatically set the name and path for it.
- Click "Import" and wait a few minutes to complete, and the background will start synchronizing LFS files (the speed depends on the file size).

![Import LFS](./assets/gitee-ai-model-import-lfs.gif)

### Pushing from Local

In addition to importing from Hugging Face, since Gitee fully supports Git LFS, Gitee also supports pushing AI models from local. The process and commands for pushing AI models are slightly different, as `git lfs` commands need to be included.

- Push Hugging Face's model repository

```bash
# Clone the repository to local
git clone https://huggingface.co/bert-base-uncased.git
cd bert-base-uncased

# Synchronize model data
git lfs fetch --all

# Push to Gitee Repository
git lfs push https://gitee.ru/<your-gitee-repo-path> --all
```

- Push your own AI model repository

```bash
cd ai-models-project

# Initialize Repository
git init

# Add remote
git remote add origin https://gitee.ru/<your-gitee-repo-path>

// ...
// Create AI models, such as: xxx.msgpack
// ...

# Track Model Files
git lfs track "*.msgpack"
# Submit Tracking Changes
git add .gitattributes
git commit -m "track *.msgpack"

Submit Model
git add .
git commit -m "append ...."

Push Model
git lfs push origin --all
git push
```

## Want More Storage Space?

:::tip

Currently, this feature has been opened to all paid enterprises. Due to the large size of AI models, the storage and traffic costs are high. Paid enterprises can expand the LFS capacity to store more AI models.

:::

In the Enterprise Console, click on the settings in the lower left corner to view the Git LFS quota usage and expand it as needed.

![LFS Expansion](./assets/gitee-ai-model-more-lfs.png)

If you want to get more information about LFS expansion, please scan the QR code below to contact the exclusive consultant, or go to Gitee