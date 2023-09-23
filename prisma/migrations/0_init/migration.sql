-- CreateTable
CREATE TABLE "anounce" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "title" VARCHAR NOT NULL,
    "description" VARCHAR,
    "unit" VARCHAR NOT NULL,
    "quantity" DECIMAL(15,2) NOT NULL,
    "total" DECIMAL(15,2) NOT NULL,
    "anouncer_fk" UUID NOT NULL,
    "residue_fk" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "anounce_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "email" VARCHAR NOT NULL,
    "username" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "cnpj" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "trading_name" VARCHAR NOT NULL,
    "type" VARCHAR NOT NULL,
    "uf" VARCHAR NOT NULL,
    "city" VARCHAR NOT NULL,
    "phone" VARCHAR,
    "image_url" VARCHAR,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proposal" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "description" VARCHAR,
    "price" DECIMAL(10,2),
    "acepted" BOOLEAN,
    "status" BOOLEAN,
    "proposer_fk" UUID NOT NULL,
    "anounce_fk" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "quantity" DECIMAL(15,2) NOT NULL,

    CONSTRAINT "proposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "residue" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "nature" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "residue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "anounce_title_key" ON "anounce"("title");

-- CreateIndex
CREATE UNIQUE INDEX "profile_email_key" ON "profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profile_username_key" ON "profile"("username");

-- CreateIndex
CREATE UNIQUE INDEX "residue_name_key" ON "residue"("name");

-- AddForeignKey
ALTER TABLE "anounce" ADD CONSTRAINT "anounce_anouncer_fk_fkey" FOREIGN KEY ("anouncer_fk") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "anounce" ADD CONSTRAINT "anounce_residue_fk_fkey" FOREIGN KEY ("residue_fk") REFERENCES "residue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "proposal" ADD CONSTRAINT "proposal_anounce_fk_fkey" FOREIGN KEY ("anounce_fk") REFERENCES "anounce"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "proposal" ADD CONSTRAINT "proposal_proposer_fk_fkey" FOREIGN KEY ("proposer_fk") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

