import {db} from "$lib/database";
import {json} from "@sveltejs/kit";


async function getUser() {
    try {
        const user = await db.user.findMany(); //findMany() = all ()
        console.log(user);
        return user;
    } catch (error) {

    }
}

export async function GET() {
    const user = await getUser();
    return json(user);
    //return new Response (JSON.stringify(user));
}


async function createUser(obj) {
    try {
        const user = await db.user.create({
            data: { 
                email: obj.email,
                name: obj.name
            },
    });
        return user;
    } catch (error) {

    }
}


export async function POST(requestEvent) {
    const { request } = requestEvent;
    const obj = await request.json();

    const newObj = {
        email: obj.email,
        name: obj.name
    }
    const res = await createUser(newObj);
    return json(res);
}



