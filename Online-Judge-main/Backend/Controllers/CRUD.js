const mongoose = require('mongoose')
const Problem = require('../models/Problem')
const User = require('../models/User')


const getDataFromDatabase = async (req, res) => {
    try {
        const problem = await Problem.find()

        if (problem.length) {
            res.send(problem)
        }


    } catch (error) {
        console.log("Error while fetching data ", error)
    }

}

const saveDataTodatabase = async (req, res) => {
    try {
        const { ProblemName, ProblemStatement, Editorial, Difficulty, Testcase } = req.body
        const existingOne = await Problem.findOne({ ProblemStatement })
        if (existingOne) {
            return res.status(400).send("Problem Statement Already Exists")
        }

        const newProblem = await Problem.create({
            ProblemName,
            ProblemStatement,
            Editorial,
            Difficulty,
            Testcase

        })

        res.status(201).json({
            message: "Data has been successfully saved",
            success: true,
            newProblem
        })
    } catch (error) {
        console.log("Error while storing the data in database ", error)
    }


}

const saveCodeToDatabase = async (req, res) => {
    const userId = req.params.id
    const { id, code, language } = req.body

    try {

        const user = await User.findById(userId)
        if (user) {
            const existingCode = user.code.find(c => c.id === id);
            if (existingCode) {
                existingCode.code = code
                existingCode.Language = language
            }
            else {
                user.code.push({ id, code, Language: language });
            }

            // Both of the below methods are correct
            await user.save()
            // await User.updateOne({ _id: userId }, { $set: { code: user.code } });

            return res.status(200).json({
                message: 'Code saved successfully',
                success: true
            });
        }

        else {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }

    } catch (error) {
        console.error('Error saving code:', error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }

}


const getCodeFromdatabase = async (req, res) => {
    const { userId, id } = req.params
    try {
        const user = await User.findById(userId)
        if (user) {
            const existingCode = user.code.find(c => c.id === id);
            if (existingCode) {
                const result = {
                    code: existingCode.code,
                    Language: existingCode.Language
                }
                res.status(200).json({
                    data: result,
                    success: true
                })
            }
            else {
                return res.status(400).json({
                    message: "Code not found",
                    success: false
                })
            }
        }
    } catch (error) {
        console.error('Error retrieving code:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error,
            success: false
        });
    }
}


const SaveVerdictToDatabase = async (req, res) => {
    const { userId, id } = req.params
    const { verdict, code, language } = req.body
    try {
        const user = await User.findById(userId)
        const problem = await Problem.findById(id);
        problem.submissions.push({ userId, result: verdict, code, Language: language })
        await problem.save();
        if (user) {
            const existingCode = user.code.find(c => c.id === id);
            if (existingCode) {

                existingCode.Verdict.push({ verdict, code, Language: language })
                await user.save()
                res.status(200).json({
                    message: "Verdict Successfull Saved",
                    success: true
                })
            }
            else {
                return res.status(400).json({
                    message: "Verdict cannot be save as code not found",
                    success: false
                })
            }
        }


    } catch (error) {
        console.error('Error while saving verdict:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error,
            success: false
        });
    }
}

const MySubmissionsDetails = async (req, res) => {
    const { userId, id } = req.params
    try {
        const user = await User.findById(userId)
        if (user) {
            const existingCode = user.code.find(c => c.id === id);
            const ProblemData = await Problem.findById(id)

            if (existingCode) {
                const sortedSubmissions = existingCode.Verdict.sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                const result = {
                    ProblemName: ProblemData.ProblemName,
                    CodeDetails: sortedSubmissions
                }

                res.status(200).json({
                    Data: result,
                    success: true
                })

            }
            else {
                return res.status(404).json({
                    message: 'Code not found',
                    success: false
                });
            }
        }

        else {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }
    } catch (error) {
        console.error('Error while fetching submission details :', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error,
            success: false
        });
    }
}


const AllSubmissionDetails = async (req, res) => {
    const { id } = req.params
    try {
        const problem = await Problem.findById(id)
            .populate({
                path: 'submissions.userId',
                select: 'email'
            });

        const submissionsDetails = problem.submissions.map(submission => ({
            ...submission.toObject(),
            ProblemName: problem.ProblemName
        }));

        const sortedSubmissions = submissionsDetails.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        res.status(200).json({
            Data: sortedSubmissions,
            success: true
        })



    } catch (error) {
        console.error('Error while fetching All submission details:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error,
            success: false
        });
    }
}


const getProblemStatementUsingID = async (req, res) => {
    try {
        const id = req.params.id
        const ProblemData = await Problem.findById(id)
        if (!ProblemData) {
            return res.status(400).json({
                message: "Problem doesn't exists",
                success: false
            })
        }

        res.status(201).json({
            message: ProblemData,
            success: true
        })
    } catch (error) {
        console.log("Error while fetching problem statement using id = ", error);
    }


}

const UpdateDataonDatabase = async (req, res) => {

    const id = req.params.id
    const { updatedProblemDetails } = req.body


    try {

        const originalProblemDetails = await Problem.findById(id)
        if (!originalProblemDetails) {
            return res.status(400).json({
                message: "Problem doesn't exists",
                success: false
            })
        }

        const result = await Problem.findByIdAndUpdate(id, { ProblemStatement: updatedProblemDetails })
        if (!result) {
            console.log("Error")
            return res.status(400).json({
                message: "Error while updating",
                success: false
            })
        }

        res.status(201).json({
            message: "Problem Updated Succesfully",
            success: true
        })



    } catch (error) {
        console.log("Error while updating the problem", error);
    }

}

const DeleteDatafromDatabase = async (req, res) => {

    const id = req.params.id;
    const isDeleted = await Problem.findByIdAndDelete(id)
    if (!isDeleted) {
        return res.status(400).json({
            message: "Error while deleting",
            success: false
        })
    }

    res.status(200).json({
        message: "Deleted Successfully",
        success: true
    })

}

module.exports = {
    getDataFromDatabase, saveDataTodatabase, getProblemStatementUsingID, UpdateDataonDatabase, DeleteDatafromDatabase,
    saveCodeToDatabase, getCodeFromdatabase, SaveVerdictToDatabase, MySubmissionsDetails, AllSubmissionDetails
}