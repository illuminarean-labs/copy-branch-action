# Hello Copy Branch Action! 👋
해당 액션은 Github Action 내에서 특정 레포지토리(타 레포지토리 활용 가능)에서 Source 브런치 내용을 Destination 브런치로 복사하는 액션입니다.

# Token Permission
토큰에는 Source Repository를 읽고 쓸 수 있는 멤버의 `repo` 권한이 필요합니다.

# Usage
```yaml
- name: Copy branch in Cloud config repository
  uses: illuminarean-labs/copy-branch@v1
  id: copy-branch
  with:
    token: ${{ secrets.GH_TOKEN }}
    source_branch: 'source-branch'
    destination_branch: 'destination-branch'
    repository: 'owner/repo'
```

