import type { BirthdayCard } from "../types/birthday";

export const photos = {
  hill: "/photos/hill.jpg",
  cafe: "/photos/cafe.jpg",
  fries: "/photos/fries.jpg",
  mcdonalds: "/photos/mcdonalds.jpg",
  temple: "/photos/temple.jpg",
  night: "/photos/night.jpg",
  hands: "/photos/hands.jpg",
  movie: "/photos/movie.jpg",
  mirror: "/photos/mirror.jpg",
} as const;

function stock(id: string): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=max&w=1600&q=80`;
}

export const birthdayCards: BirthdayCard[] = [
  {
    id: 1,
    hour: 0,
    timeLabel: "12:00 AM",
    title: "The First Wish ❤️",
    message: `Happy 21st Birthday, Dhruv.

Before anything else, I just want to say this — I am really, really happy that you exist.

Your birthday is not just another date on my calendar. It is a reminder of how lucky I feel to have your presence in my life.

So this is my first wish for you at 12:00 AM:

I hope this year gives you the same happiness that your presence has quietly brought into my life.

Happy Birthday, my birthday boy. ❤️

— Naisu`,
    image: photos.mirror,
    imageAlt: "Dhruv and Naisargi together, smiling for a photo",
    layout: "photo",
    tone: "gold",
  },
  {
    id: 2,
    hour: 1,
    timeLabel: "01:00 AM",
    title: "21 Looks Good On You",
    message: `So... you're officially 21 now.

And honestly, sometimes I look at you and think...

How is this boy only 21?

You manage studies, work, responsibilities, people, family and your own life together, and somehow you still find a way to laugh and enjoy things.

You are growing up, Dhruv.

And I genuinely love watching the person you are becoming.`,
    image: photos.cafe,
    imageAlt: "A selfie of Naisargi and Dhruv",
    layout: "photo",
    tone: "rose",
  },
  {
    id: 3,
    hour: 2,
    timeLabel: "02:00 AM",
    title: "More Than Just My Person",
    message: `Your presence means more to me than I probably manage to explain.

There are days when I don't need advice, solutions or anything extraordinary.

Just knowing that you're there makes things feel a little lighter.

That's one of the things I love most about you.

You have become one of those people whose presence itself feels comforting.`,
    image: stock("photo-1500530855697-b586d89ba3ee"),
    imageAlt: "A quiet view from a high place",
    layout: "photo",
    tone: "wine",
  },
  {
    id: 4,
    hour: 3,
    timeLabel: "03:00 AM",
    title: "The Way You Handle Life",
    message: `I genuinely admire the way you live your life.

You have problems.
You have responsibilities.
You have studies.
You have work.

But you don't let every little thing steal your happiness.

You somehow know how to say:

"Okay, this is life... let's deal with it."

And then you continue living.

I have learned something from that.

Life doesn't always have to be carried with tension.`,
    image: photos.night,
    imageAlt: "Dhruv and Naisargi in a night selfie by the water",
    layout: "photo",
    tone: "gold",
  },
  {
    id: 5,
    hour: 4,
    timeLabel: "04:00 AM",
    title: "Our Important Research 🍝",
    message: `Of course, no collection of our memories would be complete without food.

Because apparently some of our most important life discussions require fries, pasta, burgers or basically anything edible.

And honestly?

I wouldn't change that.

Some of the best memories aren't grand adventures.

Sometimes they're just two people eating something good and being happy together.`,
    image: photos.fries,
    imageAlt: "A plate of cheese fries from one of our food stops",
    layout: "photo",
    tone: "rose",
  },
  {
    id: 6,
    hour: 5,
    timeLabel: "05:00 AM",
    title: "The Small Things",
    message: `This picture looks like just food.

But I see something else.

I see one of those completely ordinary moments that somehow became a memory.

That's what I love about us.

We don't always need something extraordinary.

Sometimes sitting together, eating together and laughing about absolutely nothing is enough.`,
    image: photos.mcdonalds,
    imageAlt: "A McDonald's tray from one of our stops",
    layout: "photo",
    tone: "wine",
  },
  {
    id: 7,
    hour: 6,
    timeLabel: "06:00 AM",
    title: "Safe",
    message: `I don't think you realise how much comfort your presence gives me.

There are moments when I feel confused about things, and somehow talking to you brings me back to myself.

You don't always tell me what I want to hear.

You tell me what you think I NEED to hear.

And strangely enough...

that's one of the reasons I trust you so much.`,
    image: photos.hands,
    imageAlt: "Dhruv and Naisargi holding hands",
    layout: "photo",
    tone: "gold",
  },
  {
    id: 8,
    hour: 7,
    timeLabel: "07:00 AM",
    title: "Your Way of Living",
    message: `I sometimes look at the way you live and think:

Maybe this is how life is supposed to be.

Work hard.
Take responsibility.
Enjoy your time.
Laugh.
Eat good food.
Spend time with people you love.
And don't turn every problem into the end of the world.

You make balance look easier than it actually is.`,
    image: stock("photo-1470252649378-9c29740c9fa8"),
    imageAlt: "A soft sunrise over a quiet horizon",
    layout: "photo",
    tone: "rose",
  },
  {
    id: 9,
    hour: 8,
    timeLabel: "08:00 AM",
    title: "My Favourite Kind of Trouble",
    message: `You can be sweet.

You can be irritating.

You can be caring.

You can be unbelievably stubborn.

And sometimes you can make me think:

"Why am I even arguing with this boy?" 😂

But somehow...

even your irritating side has become part of the person I love.`,
    image: stock("photo-1495474472287-4d71bcdd2085"),
    imageAlt: "A warm cup of coffee on a table",
    layout: "photo",
    tone: "wine",
  },
  {
    id: 10,
    hour: 9,
    timeLabel: "09:00 AM",
    title: "Look At You",
    message: `One thing I am genuinely proud of is the way you handle your career.

You're studying.
You're working.
You're learning.
You're handling responsibilities.

And you aren't just doing it because you have to.

You're actually building yourself.

At 21.

That's something worth being proud of, Dhruv.`,
    image: stock("photo-1454165804606-c3d57bc86b40"),
    imageAlt: "A quiet desk with work spread across it",
    layout: "photo",
    tone: "gold",
  },
  {
    id: 11,
    hour: 10,
    timeLabel: "10:00 AM",
    title: "Employee of the Month 🏆",
    message: `And then came Employee of the Month.

I know it may look like just an award.

But I know what it represents.

Your effort.
Your consistency.
Your ability to handle responsibility.
Your work.

You earned that.

And yes...

I am allowed to be a little proud girlfriend here. 😌

Because watching you succeed genuinely makes me happy.`,
    image: stock("photo-1567427017947-545c5f8d16ad"),
    imageAlt: "A small celebration of something earned",
    layout: "photo",
    tone: "rose",
  },
  {
    id: 12,
    hour: 11,
    timeLabel: "11:00 AM",
    title: "Someone Very Loved",
    message: `You're not just important to me.

You're important to your family too.

And it shows.

You're the small child of the family, but somehow you have this maturity where you can stand up for the people you love.

That's something beautiful.

Being loved is special.

But becoming someone your family can rely on is even more special.`,
    image: photos.temple,
    imageAlt: "A decorated temple we visited",
    layout: "photo",
    tone: "wine",
  },
  {
    id: 13,
    hour: 12,
    timeLabel: "12:00 PM",
    title: "Mr. Family Man",
    message: `I love the fact that behind all your fun and jokes, there is a very responsible side of you.

You care about your family.

You notice things.

And apparently you're also fully qualified to scold Daddy when Daddy does something wrong. 😂

Smallest child?

Maybe.

But definitely not the least powerful member of the family.`,
    image: stock("photo-1511895426328-dc8714191300"),
    imageAlt: "A family walking together outdoors",
    layout: "photo",
    tone: "gold",
  },
  {
    id: 14,
    hour: 13,
    timeLabel: "01:00 PM",
    title: "Okay, Now My Turn",
    message: `And then there's me.

Because somehow you also decided that I need supervision.

You scold me.
You correct me.
You tell me when I'm thinking too much.
You tell me when I'm doing something wrong.

Sometimes I get annoyed.

But deep down?

I know where it comes from.

You genuinely want me to be okay.

And that's something I will always value.`,
    image: stock("photo-1609220136736-443140cffec6"),
    imageAlt: "A warm family moment at home",
    layout: "photo",
    tone: "rose",
  },
  {
    id: 15,
    hour: 14,
    timeLabel: "02:00 PM",
    title: "My Unexpected Teacher",
    message: `You probably don't realise how many little things I have learned from you.

How to handle situations.
How to stop overthinking everything.
How to enjoy the moment.
How to stay calm.
How to keep moving.

You never officially became my teacher.

But somehow...

you have taught me a lot.`,
    image: stock("photo-1469854523086-cc02fe5d8800"),
    imageAlt: "A road leading toward the horizon",
    layout: "photo",
    tone: "wine",
  },
  {
    id: 16,
    hour: 15,
    timeLabel: "03:00 PM",
    title: "Don't Lose This Part Of You",
    message: `If there is one thing I hope you never lose as you grow older...

it's this version of you.

The boy who can still laugh.

The boy who can enjoy a simple moment.

The boy who doesn't let every problem take away his peace.

Responsibilities will keep increasing.

Life will become more complicated.

But please never forget how to simply be happy.`,
    image: stock("photo-1495616811223-4d98c6e9c869"),
    imageAlt: "A calm sunset over open land",
    layout: "photo",
    tone: "gold",
  },
  {
    id: 17,
    hour: 16,
    timeLabel: "04:00 PM",
    title: "The Person Behind Everything",
    message: `People may see your job.

People may see your achievements.

People may see your responsibilities.

But I see the person behind all of that.

The slightly crazy boy.
The caring person.
The stubborn one.
The protective one.
The one who laughs at random things.

And honestly...

that's the person I love.`,
    image: stock("photo-1500534314209-a25ddb2bd429"),
    imageAlt: "Someone sitting quietly with a wide view in front of them",
    layout: "photo",
    tone: "rose",
  },
  {
    id: 18,
    hour: 17,
    timeLabel: "05:00 PM",
    title: "Because We Also Need This 😂",
    message: `Not every memory has to be deep.

Sometimes it's literally:

Movie.
Food.
Random plans.
Bad jokes.
Taking pictures.
Going somewhere without a proper plan.

And those moments matter too.

Because happiness doesn't always arrive as some huge life event.

Sometimes it looks exactly like this.`,
    image: photos.movie,
    imageAlt: "The movie screen showing Dhamal 4",
    layout: "photo",
    tone: "wine",
  },
  {
    id: 19,
    hour: 18,
    timeLabel: "06:00 PM",
    title: "If You Ever Forget",
    message: `If you ever have a day when you feel like you're not doing enough...

I hope you remember this.

You are already handling more than you realise.

You're studying.
You're working.
You're growing.
You're taking care of people.
You're building your future.

Give yourself some credit too, Dhruv.

You deserve it.`,
    image: stock("photo-1474552226712-ac0f0961a954"),
    imageAlt: "Two people walking together in golden light",
    layout: "photo",
    tone: "gold",
  },
  {
    id: 20,
    hour: 19,
    timeLabel: "07:00 PM",
    title: "Your Future",
    message: `I don't know exactly where life is going to take you.

Maybe new jobs.
Maybe new places.
Maybe new responsibilities.
Maybe completely unexpected things.

But I genuinely believe you're going to build something beautiful for yourself.

Because you have something important:

You know how to keep going.`,
    image: stock("photo-1480714378408-67cf0d13bc1b"),
    imageAlt: "City lights in the evening",
    layout: "photo",
    tone: "rose",
  },
  {
    id: 21,
    hour: 20,
    timeLabel: "08:00 PM",
    title: "One Of My Favourite Feelings",
    message: `One of my favourite feelings is simply knowing that I can talk to you.

Sometimes we talk about important things.

Sometimes we talk absolute nonsense.

Sometimes we don't even need to say much.

But that connection matters to me.

You became a part of my everyday life in a way I never expected.

And I wouldn't want to remove that.`,
    image: stock("photo-1519608487953-e999c86e7455"),
    imageAlt: "A city at night, lit up and quiet",
    layout: "photo",
    tone: "wine",
  },
  {
    id: 22,
    hour: 21,
    timeLabel: "09:00 PM",
    title: "What I Wish For You",
    message: `I don't want to wish you only success.

I want you to have peace too.

I want you to have people around you who genuinely love you.

I want you to laugh a lot.

I want your hard work to pay off.

I want you to be proud of the person you become.

And most importantly...

I want you to remain happy while becoming everything you want to be.`,
    image: stock("photo-1419242902214-272b3f66ee7a"),
    imageAlt: "A night sky full of stars",
    layout: "photo",
    tone: "gold",
  },
  {
    id: 23,
    hour: 22,
    timeLabel: "10:00 PM",
    title: "One More Thing...",
    message: `After all these cards, all these memories and all these words...

there is still one thing I haven't said properly.

Dhruv...

your presence has become important to me.

Not because you are perfect.

Not because everything is always easy.

But because you are YOU.

And somehow, having you in my life makes my life feel more like mine.`,
    image: stock("photo-1478144592103-25e218a04891"),
    imageAlt: "Soft evening lights",
    layout: "photo",
    tone: "rose",
  },
  {
    id: 24,
    hour: 23,
    timeLabel: "11:00 PM",
    title: "The Last Surprise ❤️",
    message: `Happy Birthday, Dhruv.

You are 21 now.

And when I look at you, I don't just see a 21-year-old boy.

I see someone who is already learning how to handle life.

Someone who studies.
Someone who works.
Someone who takes responsibility.
Someone who makes his family proud.
Someone who can still be the little child of the family while somehow being one of the most mature people around.

Someone who can scold Daddy when he's wrong. 😂

Someone who can scold me when I need someone to show me the right path.

Someone who knows how to work hard without forgetting how to enjoy life.

Someone who has earned achievements like Employee of the Month.

Someone who is loved by his family.

Someone who is loved by me.

And yes...

someone who can be extremely annoying sometimes. 😂❤️

But if I had to choose again...

I'd still choose all these little moments.

The food.
The movies.
The random plans.
The pictures.
The arguments.
The laughs.
The silence.
The hand-holding.
The conversations.
The memories.

All of it.

I hope 21 brings you a life that makes you genuinely happy.

I hope you achieve everything you're working for.

I hope you stay healthy, peaceful, successful and surrounded by people who love you.

And I hope that no matter how much life changes...

you never lose that happy, tension-free, slightly crazy Dhruv who knows how to enjoy the moment.

Thank you for being part of my life.

Thank you for correcting me when I need it.

Thank you for making me laugh.

Thank you for being someone I can rely on.

And thank you...

for simply being you.

Happy 21st Birthday, my birthday boy. ❤️

With all my love,

Naisu`,
    image: photos.hill,
    imageAlt: "Dhruv and Naisargi together at the viewpoint",
    layout: "finale",
    tone: "gold",
  },
];

const personalPhotos = new Set<string>(Object.values(photos));
const usedPersonal = birthdayCards.map((card) => card.image).filter((src): src is string => Boolean(src && personalPhotos.has(src)));

if (birthdayCards.length !== 24 || birthdayCards.some((card, index) => card.id !== index + 1 || card.hour !== index)) {
  throw new Error("Birthday cards must be 24 sequential hours.");
}

if (new Set(usedPersonal).size !== usedPersonal.length || usedPersonal.length !== personalPhotos.size) {
  throw new Error("Each personal photo must appear on exactly one card.");
}
