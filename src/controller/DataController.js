export const handleImage = (req, res, next) => {
    try {
        // raw_sequence 저장
        // S3에 저장
        //// S3에 저장 성공: filename, path등등의 정보 저장
        //// S3에 저장 실패: byteStream 저장

        /**
         #swagger.responses[200] = "Ok"
         */
        res.send("Ok");
    } catch (e) {
        console.error(e);
        return res.status(500).json({error: "서버 에러"});
    }
    
}