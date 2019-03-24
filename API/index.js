const Hapi = require('hapi')
const Inert = require('inert')
const {Client} = require('pg');
const fs = require('fs');


const server = Hapi.server({
    host: 'localhost',
    port: 8000,
    routes: {
        cors: true
    }
})


const client = new Client({
    user: 'arman',
    password: '1',
    host: '127.0.0.1',
    port: 5432,
    database: 'jubelio'
});

client.connect()

const start = async ()=>{
   await server.register(Inert);

   const handleFileUpload = file => {
      return new Promise((resolve, reject) => {
        const filename = file.hapi.filename
        const data = file._data
        fs.writeFile('./upload/' + filename, data, err => {
          if (err) {
            reject(err)
          }
          resolve({ message: 'Upload successfully!' })
        })
      })
    }

    server.route({
        method: 'GET',
        path: '/',
        handler: async function(request, reply){
            //await client.connect();
            const res = await client.query('select * from barang')
            await console.log(res.rows)
            await console.log('connected to db')
            //client.end()
            return res.rows
        }
    });

    server.route({
        path: '/upload',
        method: 'POST',
        config: {
            payload: {
                maxBytes:30485760,
                parse: true,
                output: 'stream',
                allow: 'multipart/form-data'
            }
        },
        handler: async (req, h) => {
          const { payload } = req
          //console.log(payload)
          const response = handleFileUpload(payload.file)
          return 'thanks'
        }
      });

    server.route({
      path: '/post',
      method: 'POST',
      handler: async (req, h)=>{
         const { payload } = req;
         //console.log(payload)
        await client.query("INSERT INTO barang(name, price, description, picurl) VALUES($1, $2, $3, $4)", [payload.name, payload.price, payload.description, payload.picurl]);

        return payload
      }
    });


    server.route({
      path: '/delete',
      method: 'DELETE',
      handler: async (req, h) => {
         const { payload } = req;
         await client.query("DELETE FROM barang WHERE id = $1", [payload.id])
         return payload
      }
    })

    server.route({
      path: '/update',
      method: 'POST',
      handler: async (req, h) => {
         const { payload } = req;
         console.log(payload)
         await client.query("UPDATE barang SET name=$1, price=$2, description=$3, picurl=$4 WHERE id = $5", [payload.name, payload.price, payload.description, payload.picurl, payload.id])
         return payload
      }
    })

    server.route({
      method: 'GET',
      path: '/upload/{file*}',
      handler: {
        directory: {
          path: 'upload'
        }
      }
    })

    server.start()
    
}

start()




