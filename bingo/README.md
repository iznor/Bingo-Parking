
/***********************************Bingo Parking************************************/
Authors:
Ido Dor
Ayham Hussein

**Documentation:**
test

/*************************************************************************************************/

**Important Notes and assumptions:**
/*  Each form creates a parking/contract instance
/*  User can publish multiple parking slots
/*  User can publish a parking slot for a friend
/*  The price that is shown is per day.
/*  The pricing algorithm calculates the prices as following:
        - Hourly parking price = (daily price/24) * parking hours
        - Monthly parking price = (daily price * 30) * 0.85
        - Yearly parking price = (daily price * 365) * 0.7
        - Custom choice price (IF ammount of days > 28 && < 365) = (daily price * ammount of days) * 0.85
/*  During rental periods, the rentor becomes the owner of the parking slot so he can publish it in case he doesn't want it anymore.

/*************************************************************************************************/

**MONGO-DB-COLLECTIONS:**
//TODO