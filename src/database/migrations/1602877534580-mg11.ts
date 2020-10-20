import {MigrationInterface, QueryRunner} from "typeorm";

export class mg111602877534580 implements MigrationInterface {
    name = 'mg111602877534580'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer_details" ("id" SERIAL NOT NULL, "name" character varying, "lastname" character varying, "phone" character varying, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "customer_id" integer, CONSTRAINT "REL_30c295036da7b372bb834becca" UNIQUE ("customer_id"), CONSTRAINT "PK_ca144d4b855fe08c813815bb2a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_details" ("id" SERIAL NOT NULL, "name" character varying(50), "lastname" character varying, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "user_id" integer, CONSTRAINT "REL_ef1a1915f99bcf7a87049f7449" UNIQUE ("user_id"), CONSTRAINT "PK_fb08394d3f499b9e441cab9ca51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "assets" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "public_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "galleryId" integer, "shop_id" integer, CONSTRAINT "REL_3a4324b52f9656b59d3139fdc1" UNIQUE ("shop_id"), CONSTRAINT "PK_da96729a8b113377cfb6a62439c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "gallery" ("id" SERIAL NOT NULL, "folder" character varying, "user_id" integer, CONSTRAINT "REL_7d957482bdc782cacb0635e455" UNIQUE ("user_id"), CONSTRAINT "PK_65d7a1ef91ddafb3e7071b188a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(25) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shops" ("id" SERIAL NOT NULL, "name" character varying(30), "description" character varying, "user_id" integer, CONSTRAINT "REL_bb9c758dcc60137e56f6fee72f" UNIQUE ("user_id"), CONSTRAINT "PK_3c6aaa6607d287de99815e60b96" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "totlaPrice" numeric DEFAULT 0, "status" character varying DEFAULT 'incomplete', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "address_id" integer, "customer_id" integer, CONSTRAINT "REL_d39c53244703b8534307adcd07" UNIQUE ("address_id"), CONSTRAINT "REL_772d0ce0473ac2ccfa26060dbe" UNIQUE ("customer_id"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "category" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "shopId" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" SERIAL NOT NULL, "totlaPrice" numeric DEFAULT 0, "customer_id" integer, CONSTRAINT "REL_242205c81c1152fab1b6e84847" UNIQUE ("customer_id"), CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "street" character varying, "number" numeric, "postalCode" numeric, "city" character varying, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "customer_id" integer, CONSTRAINT "REL_9c9614b2f9d01665800ea8dbff" UNIQUE ("customer_id"), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_order" ("ordersId" integer NOT NULL, "productsId" integer NOT NULL, CONSTRAINT "PK_0c45dc5e0efb6d0c65b3a9647be" PRIMARY KEY ("ordersId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_883448f79e97d310cec2ef38eb" ON "product_order" ("ordersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4868a04233d9fe1d086a6d5b76" ON "product_order" ("productsId") `);
        await queryRunner.query(`CREATE TABLE "product_assets" ("productsId" integer NOT NULL, "assetsId" integer NOT NULL, CONSTRAINT "PK_417b853a5cb4ee0c9be82bc28ca" PRIMARY KEY ("productsId", "assetsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_86faca09a48dcb093bfb2266fa" ON "product_assets" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7598ab365b88df3b41c313fb41" ON "product_assets" ("assetsId") `);
        await queryRunner.query(`CREATE TABLE "product_cart" ("cartId" integer NOT NULL, "productsId" integer NOT NULL, CONSTRAINT "PK_04a1bee74c2162f9c44b753f0ab" PRIMARY KEY ("cartId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_07c8f3b3b939faaa002db85a0c" ON "product_cart" ("cartId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5f2d0566abad474187e27a2780" ON "product_cart" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "customer_details" ADD CONSTRAINT "FK_30c295036da7b372bb834beccab" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_details" ADD CONSTRAINT "FK_ef1a1915f99bcf7a87049f74494" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assets" ADD CONSTRAINT "FK_82b69b671134f68d8a686786ab7" FOREIGN KEY ("galleryId") REFERENCES "gallery"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assets" ADD CONSTRAINT "FK_3a4324b52f9656b59d3139fdc1b" FOREIGN KEY ("shop_id") REFERENCES "shops"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gallery" ADD CONSTRAINT "FK_7d957482bdc782cacb0635e4551" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shops" ADD CONSTRAINT "FK_bb9c758dcc60137e56f6fee72f7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_d39c53244703b8534307adcd073" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_51a281693ebef6fa8729de39381" FOREIGN KEY ("shopId") REFERENCES "shops"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_242205c81c1152fab1b6e848470" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_9c9614b2f9d01665800ea8dbff7" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_order" ADD CONSTRAINT "FK_883448f79e97d310cec2ef38ebb" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_order" ADD CONSTRAINT "FK_4868a04233d9fe1d086a6d5b76a" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_assets" ADD CONSTRAINT "FK_86faca09a48dcb093bfb2266fa2" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_assets" ADD CONSTRAINT "FK_7598ab365b88df3b41c313fb41f" FOREIGN KEY ("assetsId") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_cart" ADD CONSTRAINT "FK_07c8f3b3b939faaa002db85a0c3" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_cart" ADD CONSTRAINT "FK_5f2d0566abad474187e27a27803" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_cart" DROP CONSTRAINT "FK_5f2d0566abad474187e27a27803"`);
        await queryRunner.query(`ALTER TABLE "product_cart" DROP CONSTRAINT "FK_07c8f3b3b939faaa002db85a0c3"`);
        await queryRunner.query(`ALTER TABLE "product_assets" DROP CONSTRAINT "FK_7598ab365b88df3b41c313fb41f"`);
        await queryRunner.query(`ALTER TABLE "product_assets" DROP CONSTRAINT "FK_86faca09a48dcb093bfb2266fa2"`);
        await queryRunner.query(`ALTER TABLE "product_order" DROP CONSTRAINT "FK_4868a04233d9fe1d086a6d5b76a"`);
        await queryRunner.query(`ALTER TABLE "product_order" DROP CONSTRAINT "FK_883448f79e97d310cec2ef38ebb"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_9c9614b2f9d01665800ea8dbff7"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_242205c81c1152fab1b6e848470"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_51a281693ebef6fa8729de39381"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_d39c53244703b8534307adcd073"`);
        await queryRunner.query(`ALTER TABLE "shops" DROP CONSTRAINT "FK_bb9c758dcc60137e56f6fee72f7"`);
        await queryRunner.query(`ALTER TABLE "gallery" DROP CONSTRAINT "FK_7d957482bdc782cacb0635e4551"`);
        await queryRunner.query(`ALTER TABLE "assets" DROP CONSTRAINT "FK_3a4324b52f9656b59d3139fdc1b"`);
        await queryRunner.query(`ALTER TABLE "assets" DROP CONSTRAINT "FK_82b69b671134f68d8a686786ab7"`);
        await queryRunner.query(`ALTER TABLE "user_details" DROP CONSTRAINT "FK_ef1a1915f99bcf7a87049f74494"`);
        await queryRunner.query(`ALTER TABLE "customer_details" DROP CONSTRAINT "FK_30c295036da7b372bb834beccab"`);
        await queryRunner.query(`DROP INDEX "IDX_5f2d0566abad474187e27a2780"`);
        await queryRunner.query(`DROP INDEX "IDX_07c8f3b3b939faaa002db85a0c"`);
        await queryRunner.query(`DROP TABLE "product_cart"`);
        await queryRunner.query(`DROP INDEX "IDX_7598ab365b88df3b41c313fb41"`);
        await queryRunner.query(`DROP INDEX "IDX_86faca09a48dcb093bfb2266fa"`);
        await queryRunner.query(`DROP TABLE "product_assets"`);
        await queryRunner.query(`DROP INDEX "IDX_4868a04233d9fe1d086a6d5b76"`);
        await queryRunner.query(`DROP INDEX "IDX_883448f79e97d310cec2ef38eb"`);
        await queryRunner.query(`DROP TABLE "product_order"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "shops"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "gallery"`);
        await queryRunner.query(`DROP TABLE "assets"`);
        await queryRunner.query(`DROP TABLE "user_details"`);
        await queryRunner.query(`DROP TABLE "customer_details"`);
    }

}
