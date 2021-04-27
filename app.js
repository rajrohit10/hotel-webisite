const express = require('express');
const fs = require('fs');



const app = express();
app.use(express.json());
app.use((req,res,next)=>{
    console.log("Hello from the middleware");
    next

});


const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(val => val.id === id);
  if (id > tours.length) {
    return res.status(404).json({
      status: 'failed',

      data: {
        tour: 'Id not found'
      }
    });
  }

  res.status(200).json({
    status: 'success',

    data: {
      tour: tour
    }
  });
};
const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'failed',

      data: {
        tour: 'Id not found'
      }
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated the tour'
    }
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'failed',

      data: {
        tour: 'Id not found'
      }
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
};
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );

  //   res.send('Data Received');
};
// //Get all tours
// app.get('/api/v1/tours', getAllTours);

// //Get One tours
// app.get('/api/v1/tours/:id', getTour);

// app.patch('/api/v1/tours/:id', updateTour);

// app.delete('/api/v1/tours/:id', deleteTour);
// //Add new tour
// app.post('/api/v1/tours', createTour);

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);
  app.route('/api/v1/users').get(getAllUsers);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port} sucessfully`);
});
