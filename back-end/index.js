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
    const { id } = req.params
    const deletedCard = await prisma.cards.delete({
      where: { id: parseInt(id) }
    })
    res.json(deletedCard)
  });

  app.get('/boards/:title/search', async (req, res) => {
    const { title } = req.params;
    const cards = await prisma.cards.findMany({
      where: { title: { contains: title, mode: 'insensitive' } }
    });
    res.json(cards);
  });

  app.get('/threads/:cardId', async (req, res) => {
    const {card} = req.params
    const cards = await prisma.threads.findMany(
        {where: {id: card}}
    )
    res.json(cards)
  });

  app.post('/threads/:cardId', async (req, res) => {
    if (!req.body.title || !req.body.description) {
        return res.status(400).send('Name and description are required.')
      }
      const { cardId } = req.params
      const { title, description, gif, owner } = req.body
      try {
        console.log("creating new card")
        const newThread = await prisma.threads.create({
          data: {
            title,
            description,
            gif, 
            owner,
            votes: 0,
            cardId: parseInt(cardId)
          }
        });
        res.json(newThread);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error creating card');
      }
});
  