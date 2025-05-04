
export function useReadNoStream() {
    // 读取非流信息
    async function handleNoStreamResponse(response: any, onMessage: (jsonData: any) => void) {
        const questionResult = await response.json();
        console.log(22)
        console.log(questionResult)
        onMessage(questionResult)
    }
    return {handleNoStreamResponse};
}
