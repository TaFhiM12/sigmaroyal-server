/**
 * model Client {
    id        String   @id @default(cuid())
    name      String
    logoUrl   String
    website   String
    order     String
    isActive  Boolean  @default(true)
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
}
 */

import { Client } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";

const createClient = async (clientData: Client) => {
    const client = await prisma.client.create({
        data: clientData,
    });
    return client;
}

