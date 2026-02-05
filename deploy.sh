#!/bin/bash

# A script to initialize the Git repository and push code to GitHub.

# --- IMPORTANT ---
# Replace the URL below with your actual GitHub repository URL.
# You can find it on your repository's page on GitHub.
GITHUB_REPO_URL="https://github.com/your-username/your-repo-name.git"

# --- END OF CONFIGURATION ---

echo "Starting deployment script..."

# Check if a GitHub URL is set
if [ "$GITHUB_REPO_URL" == "https://github.com/your-username/your-repo-name.git" ]; then
    echo "-----------------------------------------------------------------"
    echo "⚠️  ACTION REQUIRED: Please edit this file (deploy.sh) first!"
    echo "Replace 'https://github.com/your-username/your-repo-name.git' with your actual GitHub repository URL."
    echo "-----------------------------------------------------------------"
    exit 1
fi

# 1. Initialize Git repository if it doesn't exist
if [ ! -d ".git" ]; then
    echo "🔍 No .git directory found. Initializing a new Git repository..."
    git init -b main
else
    echo "✅ Git repository already initialized."
fi

# 2. Add the remote 'origin' if it doesn't exist
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "🔗 Adding remote 'origin'..."
    git remote add origin $GITHUB_REPO_URL
else
    echo "✅ Remote 'origin' already exists."
    # Optional: Update the URL in case it changed
    git remote set-url origin $GITHUB_REPO_URL
    echo "   (Ensured URL is up to date)"
fi

# 3. Add all files to staging
echo "➕ Adding all files to the commit..."
git add .

# 4. Commit the changes
# Check if there are any changes to commit
if git diff-index --quiet HEAD --; then
    echo "ℹ️ No changes to commit. Your repository is up-to-date."
else
    echo "📝 Committing changes..."
    # Use a default commit message or take one as an argument
    COMMIT_MESSAGE=${1:-"Update project files"}
    git commit -m "$COMMIT_MESSAGE"
fi

# 5. Push the code to the main branch on GitHub
echo "🚀 Pushing code to GitHub..."
git push -u origin main

echo "-----------------------------------------------------------------"
echo "🎉 Success! Your code has been pushed to GitHub."
echo "You can now go to Vercel to import your repository and deploy."
echo "-----------------------------------------------------------------"
