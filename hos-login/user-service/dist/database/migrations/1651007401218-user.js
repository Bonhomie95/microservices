const TABLE_NAME = "tbl_user";
export class user1651007401218 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE ${TABLE_NAME} (
                "id" uuid,
                "email" varchar(100),
                "password" text,
                "firstName" varchar(50),
                "lastName" varchar(50),
                "phoneNumber" varchar(20),
                "userType" varchar(30),
                "role" varchar(30),
                "dateOfBirth" date,
                "imageUrl" text,
                "isActive" boolean,
                "isVerified" boolean,
                "lastLoginAt" timestamp,
                "createdBy" uuid,
                "createdAt" timestamp,
                "updatedBy" uuid,
                "updatedAt" timestamp
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE ${TABLE_NAME}`);
    }
}
