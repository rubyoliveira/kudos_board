const cors = require('cors')
const express = require('express')
const app = express()
const PORT = 3000

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

  // Boards
app.get('/boards', async (req, res) => {
    const cards = await prisma.cards.findMany()
    res.json(cards)
  });
  
  app.post('/boards', async (req, res) => {
    if (!req.body.title || !req.body.category) {
        return res.status(400).send('Name and date are required.')
      }
      const { title, category, author } = req.body
      try {
        console.log("creating new card")
        const newCard = await prisma.cards.create({
          data: {
            title,
            category,
            author
          }
        });
        res.json(newCard);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error creating card');
      }
});
  
  app.get('/boards/:category/filter', async (req, res) => {
    const {category} = req.params
    const cards = await prisma.cards.findMany(
        {where: {category: category}}
    )
    res.json(cards)
  });
  
  app.delete('/boards/:id/delete', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await prisma.$transaction(async (prisma) => {
            await prisma.threads.deleteMany({
                where: { cardId: parseInt(id) }
            });
            return await prisma.cards.delete({
                where: { id: parseInt(id) }
            });
        });
        res.json(result);
    } catch (error) {
        console.error("Error deleting card and its threads:", error);
        res.status(500).json({ message: "Error deleting card and its threads" });
    }
});


  app.get('/boards/:title/search', async (req, res) => {
    const { title } = req.params;
    const cards = await prisma.cards.findMany({
      where: { title: { contains: title, mode: 'insensitive' } }
    });
    res.json(cards);
  });

  app.get('/threads/:cardId', async (req, res) => {
    const { cardId } = req.params; 
    const threads = await prisma.threads.findMany({
        where: { cardId: parseInt(cardId) }  
    });
    res.json(threads);
  });

  app.post('/threads/:cardId', async (req, res) => {
    if (!req.body.title || !req.body.description) {
        return res.status(400).send('Title and description are required.');
    }
    const { cardId } = req.params;
    const { title, description, gif, owner } = req.body;
    try {
        const newThread = await prisma.threads.create({
            data: {
                title,
                description,
                gif,
                owner,
                votes: 0,
                cardId: parseInt(cardId)  // Ensure cardId is parsed as an integer
            }
        });
        res.json(newThread);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating thread');
    }
});

app.delete('/threads/:cardId/:id/delete', async (req, res) => {
    const { id } = req.params
    const deletedCard = await prisma.threads.delete({
      where: { id: parseInt(id) }
    })
    res.json(deletedCard)
  });

  app.patch('/threads/:cardId/:id/upvote', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedThread = await prisma.threads.update({
            where: { id: parseInt(id) },
            data: {
                votes: {
                    increment: 1
                }
            }
        });
        res.json(updatedThread);
    } catch (error) {
        console.error("Error updating thread votes:", error);
        res.status(500).send("Failed to update votes");
    }
});
  