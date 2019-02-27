const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql"); // Usando Chaves eu posso pegar uma propriedade dentro do pacote
const app = express();
app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`
        type Event{
          _id:ID!
          title:String!
           description:String!
           price:Float!
           date:String!
        }
        input eventInput{
          title:String!
          description:String!
          price:Float!
          date:String!
        }
          type RootQuery{
        events:[Event!]!

         }
         type RootMutation{
            createEvent(eventInput:eventInput):Event
         }
     schema{
         query:RootQuery,
         mutation:RootMutation
        }
    `), //Backticks me permite usar melhor as strings em javascript
    //Query eu busco algum dado no banco, enquanto mutation eu realizo alguma operação crud.
    //Graphql usa uma linguagem tipada, vou ter que usar TYPES
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: args => {
        const event = {
          _id: Math.random.toString(),
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: args.eventInput.date
        };
        events.push(event);
        return event;
      }
    }, //Resolver
    graphiql: true
  })
);
app.listen(3000);
