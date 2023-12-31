import axios from "axios";

export const getSetting = async () => {
    const data = await axios.get("/api/setting");
    if (data.status == 200) {
        return data.data;
    }
    return null;
};
