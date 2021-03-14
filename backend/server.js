const app = require('./src');

const PORT = app.get('PORT');

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`))