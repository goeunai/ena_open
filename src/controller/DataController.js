import DataRepository from "../repository/DataRepository.js";

export const handleImage = async (req, res) => {
    const repository = new DataRepository();

    try {
        await repository.createConnection();
        await repository.createRawData(req.body);
        repository.destroyConnection();

        /**
         #swagger.responses[200] = "Ok"
         */
        res.send("Ok");
    } catch (e) {
        console.error(e);
        /**
         #swagger.responses[500] = {
            error: "메세지 || 서버 에러"
         }
         */
        return res.status(500).json({error: e?.message || "서버 에러"});
    }
    
}