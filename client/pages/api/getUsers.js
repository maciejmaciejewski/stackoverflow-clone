export default function handler(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json([{
            created: "2022-09-08T11:36:36.142Z",
            id: "6319d3c49f231700178c6710",
            profilePhoto: "https://secure.gravatar.com/avatar/6319d3c49f231700178c6710?s=90&d=identicon",
            role: "user",
            username: "nikhil"
        }]
    );
}
