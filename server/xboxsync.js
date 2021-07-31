const { response } = require('express');
const cron = require('node-cron')

//plan to be every 30mins

cron.schedule('*/1 * * * *', async () => {
    //fetch club and xbox auth db
    console.log('Running')
    var clubid = 'clubid'
    var auth = 'userhash;token'
    var club = await fetch('https://clubhub.xboxlive.com/clubs/Ids('+ clubid +')/decoration/detail,settings,roster,clubpresence', { method: 'GET', headers: {'x-xbl-contract-version' : 1, "Accept-Language": "en_us", 'Authorization': 'XBL3.0 x=' + auth }}).then(response => response.json()).then(response => response.clubs[0])
    /*
    USEFULL VAR
    
    club.clubType.localizedTitleFamilyName == Minecraft Realm // checking club is a realm
    club.id
    club.membersCount
    club.roster.moderator.length //if we want to make a very advance algorithm to find realms with low hacker rate etc. more mods = less hackers
    club.roster.banned.length // same with this one using the members:banned ratio we can find hacker rates etc
    club.displayImageUrl.value // profilepic
    club.backgroundImageUrl.value // background image
    club.maxMembersInGame // checks realm type will always be 2 or 10
    */
});

/*

USEFULL API
https://clubhub.xboxlive.com/clubs/Ids(CLUBIDS)/decoration/clubpresence ,detail,settings,roster
https://open.minecraft.net/pocket/realms/invite/UUODxGPKuzk
minecraft://acceptRealmInvite?inviteID=Fd7lVSJjMAk
https://profile.xboxlive.com/users/me/profile/settings?settings=Gamertag,AppDisplayPicRaw
https://clubhub.xboxlive.com/clubs/xuid(USERXUID)

*/