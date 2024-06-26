import { loadFixture, ethers, expect } from "./setup";

describe("AuctionEngine", function () {
    async function deploy() {
        //deploy by default is done with user1 account funds
        const [owner, seller, buyer] = await ethers.getSigners()

        const Factory = await ethers.getContractFactory("AuctionEngine", owner);
        const auctionEngine = await Factory.deploy();
        await auctionEngine.waitForDeployment()

        return { owner, seller, buyer, auctionEngine }
    }

    it("sets owner", async function () {
        const { owner, seller, buyer, auctionEngine } = await loadFixture(deploy);
        const currentOwner = await auctionEngine.owner();
        expect(currentOwner).to.eq(owner.address)
    })

    async function getTimestamp(bn:number){
        return (
            await ethers.provider.getBlock(bn)
        )?.timestamp
    }

    describe("createAuction", function () {
        it("creates auction correctly", async function () {
            const { owner, seller, buyer, auctionEngine } = await loadFixture(deploy);
            const duration = 60;
            const tx = await auctionEngine.createAuction(
                ethers.parseEther("0.0001"),
                3, 
                "fake item",
                duration
            );

            const cAuction = await auctionEngine.auctions(0)
            console.log(cAuction);
            expect(cAuction.item).to.eq("fake item");
            const ts = await getTimestamp(tx.blockNumber||0)||0;
            expect(cAuction.endsAt).to.eq(ts + duration)
            
        })
    })

    function delay(ms:number){
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    describe("buy", function () {
        it("It allows to buy", async function () {
            const { owner, seller, buyer, auctionEngine } = await loadFixture(deploy);
            const duration = 60;
            const tx = await auctionEngine.connect(seller).createAuction(
                ethers.parseEther("0.0001"),
                3, 
                "fake item",
                duration
            );

            this.timeout(5000);
            delay(1000)

            const buyTx  = await auctionEngine.connect(buyer).buy(0, {value: ethers.parseEther("0.0001")})

            const cAuction = await auctionEngine.auctions(0);
            const finalPrice = cAuction.finalPrice;
            await expect(()=> buyTx).to.changeEtherBalance(
                    seller, finalPrice - BigInt(Math.floor(Number((finalPrice * BigInt(10)) / BigInt(100))))
                )
            await expect(buyTx).to.emit(auctionEngine, "AuctionEnded").withArgs(0, finalPrice, buyer.address)

            await expect(
                auctionEngine.connect(buyer).buy(0, {value: ethers.parseEther("0.0001")})
            ).to.be.revertedWith('stopped!');
        })
    })

});

