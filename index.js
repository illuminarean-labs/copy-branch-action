const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        // 액션 입력 가져오기
        const repository = core.getInput('repository', { required: true });
        const token = core.getInput('token', { required: true });
        const sourceBranch = core.getInput('source_branch', { required: true });
        const destinationBranch = core.getInput('destination_branch', { required: true });

        // GitHub 클라이언트 인증
        const octokit = github.getOctokit(token);

        // 레포지토리 정보 가져오기
        const [owner, repo] = repository.split('/');

        // 소스 브랜치 가져오기
        const { data: sourceBranchData } = await octokit.rest.git.getRef({
            owner,
            repo,
            ref: `heads/${sourceBranch}`,
        });

        // 대상 브랜치 생성
        await octokit.rest.git.createRef({
            owner,
            repo,
            ref: `refs/heads/${destinationBranch}`,
            sha: sourceBranchData.object.sha,
        });

        // 성공 메시지 출력
        core.info(`Successfully copied ${sourceBranch} to ${destinationBranch} in ${repository}`);
    } catch (error) {
        // 에러 처리
        core.setFailed(error.message);
    }
}

run();