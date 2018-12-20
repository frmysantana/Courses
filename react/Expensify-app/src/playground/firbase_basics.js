
database.ref('expenses').on('child_removed', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

database.ref('expenses').on('child_changed', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

database.ref('expenses').on('child_added', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

database.ref('expenses')
  .once('value')
  .then((snapshot) => {
    const expenses = [];

    snapshot.forEach((childSnapshot) => {
      expenses.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });

    console.log(expenses);
  });

database.ref('expenses').on('value', (snapshot) => {
  const expenses = [];

  snapshot.forEach((childSnapshot) => {
    expenses.push({
      id: childSnapshot.key,
      ...childSnapshot.val()
    });

    console.log(expenses);
  })
});

database.ref('expenses').push({
  description: 'Food',
  note: 'tried chia seeds',
  amount: 30.98,
  createdAt: 'Sunday, April 4, 2018'
});

database.ref('expenses').push({
  description: 'Rent',
  note: 'Should move somewhere else; rent is too high',
  amount: 1000000000,
  createdAt: 'Monday, April 14, 2018'
});

database.ref('expenses').push({
  description: 'Gum',
  note: '',
  amount: 1.50,
  createdAt: 'Saturday, April 12, 2018'
});

database.ref('notes/-L920_v58BG2uUhPNUCP').remove();
database.ref('notes').push({
  title: 'Course Topics',
  body: 'React Native, Angular, Python'
});

SUBSCRIBES TO CHANGES IN THE DATABASE

const onValueChange = database.ref().on('value', (snapshot) => {
  console.log(snapshot.val());
}, (e) => {
  console.log('Error with data fetching', e);
});

setTimeout(() => {
  database.ref('age').set(29);
}, 3500);

setTimeout(() => {
  database.ref().off(onValueChange);
}, 7000);

setTimeout(() => {
  database.ref('age').set(30);
}, 10500);

database.ref().set({
  name: 'Fremy Santana',
  age: 25,
  stressLevel: 6,
  job: {
    title: 'Software developer',
    company: 'Google'
  },
  location: {
    city: 'Haledon',
    contry: 'United States'
  },
})

database.ref().on('value', (snapshot) => {
  const value = snapshot.val();
  const name = value.name; 
  const { title:jobTitle, company:employer } =  value.job;
  console.log(`${name} is a(n) ${jobTitle} at ${employer}.`);
})

setTimeout(() => {
  database.ref('name').set('Bob');
}, 2000);

setTimeout(() => {
  database.ref('job/title').set('Project manager');
  database.ref('job/company').set('Cisco');
}, 2000);

Gives data a single time; does not rerun

database.ref('location/city')
  .once('value')
  .then((snapshot) => {
    const val = snapshot.val();
    console.log(val);
  }).catch((e) => {
    console.log('Error fetching data', e);
  });

database.ref().set({
  name: 'Fremy Santana',
  age: 25,
  stressLevel: 6,
  job: {
    title: 'Software developer',
    company: 'Google'
  },
  location: {
    city: 'Haledon',
    contry: 'United States'
  },
}).then(() => {
  console.log('Data is saved');
}).catch((error) => {
  console.log('This failed', error);
});

database.ref().update({
  stressLevel: 9,
  "job/company": "Amazon",
  "location/city": "Seattle"
});

database.ref('isSingle').remove().then(() => {
  console.log('Remove was successful.');
}).catch((e)=> {
  console.log('Remove failed', e);
});