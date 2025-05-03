
export function useReadNoStream() {
    // 读取非流信息
    async function handleStreamNoResponse(response: any, onMessage: (jsonData: any) => void) {
        const questionResult = response.body;
        console.log(questionResult)
    }
    return {handleStreamNoResponse};
}
