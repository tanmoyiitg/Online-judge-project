import axios from 'axios'
const URL =process.env.VITE_BACKEND_URL
const URLForCompiler=process.env.VITE_COMPILER_URL

const uploadDataRegister = async (Data) => {
    try {
        const response = await axios.post(`${URL}/api/auth/register`, Data, { withCredentials: true })
        return response
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const newResponse = {
                data: error.response.data,
                success: false
            }
            return newResponse; // You can return this to handle the error in the calling function
        } else {
            console.log("Error while Uploading Data ", error);
        }
    }
}

const uploadDataLogIn = async (Data) => {
    try {
        const response = await axios.post(`${URL}/api/auth/login`, Data, { withCredentials: true })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const newResponse = {
                data: {
                    message: error.response.data,
                    success: false
                }
            }
            return newResponse; // You can return this to handle the error in the calling function
        } else {
            console.log("Error while Uploading Data ", error);
        }
    }
}


const uploadDataProblem = async (Data) => {
    try {
        const response = await axios.post(`${URL}/api/Crud/save`, Data)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const newResponse = {
                message: error.response.data,
                success: false

            }
            return newResponse; // You can return this to handle the error in the calling function
        } else {
            console.log("Error while creating Coding Problem ", error);
        }
    }
}

const fetchDatafromDatabase = async () => {
    try {
        const response = await axios.get(`${URL}/api/Crud/get`)
        return response.data

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const newResponse = {
                data: {
                    message: error.response.data,
                    success: false
                }
            }
            return newResponse; // You can return this to handle the error in the calling function
        } else {
            console.log("Error while fetching data ", error);
        }
    }
}

const saveCodeToDatabase = async (id, code, userId, language) => {
    try {
        const response = await axios.put(`${URL}/api/Crud/codeUpdate/${userId}`, { code, id, language })
    } catch (error) {
        console.error("Error = ", error)
    }


}

const RetrieveCodeFromDatabase = async (id, userId) => {
    try {
        const response = await axios.get(`${URL}/api/Crud/getCode/${userId}/${id}`)
        return response
    } catch (error) {
        console.error("Error while retrieving code = ", error)
    }
}

const SaveVerdictToDatabase = async (id, verdict, language, code, userId) => {
    try {
        const response = await axios.post(`${URL}/api/Crud/saveVerdict/${userId}/${id}`, { verdict, code, language })
        return response
    } catch (error) {
        console.log("Error while saving verdict to database = ", error)
    }
}


const MySubmissionsDetails = async (userId, id) => {
    try {
        const response = await axios.get(`${URL}/api/Crud/submissionDetails/${userId}/${id}`)
        return response
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const newResponse = {
                data: error.response.data
            }
            return newResponse; // You can return this to handle the error in the calling function
        } else {
            console.log("Error while Uploading Data ", error);
        }
    }
}

const AllSubmissionDetails = async (id) => {
    try {
        const response = await axios.get(`${URL}/api/Crud/AllSubmissionDetails/${id}`)
        return response
    } catch (error) {
        console.error("Error while retrieving All Submission details = ", error)
    }
}


const fetchDatafromDatabaseUisngID = async (id) => {
    try {
        const response = await axios.get(`${URL}/api/Crud/problemStatement/${id}`)
        return response

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const newResponse = {
                data: {
                    message: error.response.data,
                    success: false
                }
            }
            return newResponse; // You can return this to handle the error in the calling function
        } else {
            console.log("Error while fetching data ", error);
        }
    }
}


const updateProblemInDatabase = async (id, diff) => {
    try {
        const response = await axios.put(`${URL}/api/Crud/update/${id}`, diff)
        return response
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const newResponse = {
                data: {
                    message: error.response.data,
                    success: false
                }
            }
            return newResponse; // You can return this to handle the error in the calling function
        } else {
            console.log("Error while fetching data ", error);
        }
    }
}


const deleteDatafromDatabase = async (id) => {
    try {

        const response = await axios.delete(`${URL}/api/Crud/delete/${id}`)
        return response

    } catch (error) {

        if (axios.isAxiosError(error) && error.response) {
            const newResponse = {
                data: {
                    message: error.response.data,
                    success: false
                }
            }
            return newResponse; // You can return this to handle the error in the calling function
        } else {
            console.log("Error while fetching data ", error);
        }


    }
}


const CompileCode = async (language, code, Input) => {
    try {
        const response = await axios.post(`${URLForCompiler}/runCode`, { language, code, Input })
        return response

    } catch (error) {
        const response = error.response
        return response
    }

}


const CompileCodeWithHiddenTestCases = async (language, code, testcase) => {
    try {
        const response = await axios.post(`${URLForCompiler}/submitCode`, { language, code, testcase })
        return response


    } catch (error) {

        if (axios.isAxiosError(error) && error.response) {
            const response = error.response
            return response; // You can return this to handle the error in the calling function
        } else {
            console.log("Error while Uploading Data ", error);
        }

    }

}


export {
    uploadDataRegister, uploadDataLogIn, uploadDataProblem, fetchDatafromDatabase, fetchDatafromDatabaseUisngID,
    updateProblemInDatabase, deleteDatafromDatabase, CompileCode, CompileCodeWithHiddenTestCases,
    saveCodeToDatabase, RetrieveCodeFromDatabase, SaveVerdictToDatabase, MySubmissionsDetails, AllSubmissionDetails
}