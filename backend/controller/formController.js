import { prisma } from "../db/db.js";

export const createform=async (req, res) => {
  try {
    const { title, description, headerImage, questions } = req.body;
    const form = await prisma.form.create({
      data: {
        title,
        description,
        headerImage,
        userId: req.userId,
        questions: {
          create: questions.map(q => ({
            type: q.type,
            title: q.title,
            description: q.description,
            imageUrl: q.imageUrl,
            payload: q.payload
          }))
        }
      },
      include: { questions: true }
    });
    res.status(200).json(form,{message:"Successfully created"});
  } catch (err) {
    res.status(500).json({ error: "Failed to create form" });
  }
}


export const getForm=async (req, res) => {
    try {
        const { id } = req.params;

        const form = await prisma.form.findUnique({
            where: { id },
            include: { questions: true }
        });

        if (!form) {
            return res.status(404).json({ error: "Form not found" });
        }

        res.json(form);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}


export const getNumberOfForms=async(req,res)=>{
    const id=req.userId;
    try{
        const forms=await prisma.form.findMany({
            where:{
                userId:id
            },select:{
                title:true,
                updatedAt:true,
                id:true
            }
        })

         if (!forms) {
            return res.status(404).json({ error: "Form not found" });
        }

        res.json({forms});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
}


export const formResponse = async (req, res) => {
  try {
    const { formId, userId, answers } = req.body;

    if (!formId || !answers) {
      return res.status(400).json({ error: "formId and answers are required" });
    }

    const newResponse = await prisma.formResponse.create({
      data: {
        formId,
        meta: { userId }, 
      },
    });

    const answerData = [];

    for (const questionId of Object.keys(answers)) {
      const value = answers[questionId];

      answerData.push({
        responseId: newResponse.id,
        questionId,
        value,
      });
    }

    await prisma.answer.createMany({
      data: answerData,
    });

    res.status(201).json({ message: "Response submitted successfully", responseId: newResponse.id });
  } catch (error) {
    console.error("Error saving form response:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};