import type {GreetingStyle} from './greetingTypes';

export const greetingTemplates: Record<
  GreetingStyle,
  readonly string[]
> = {
  Motivational: [
    '{recipient}, your {event} is more than a date on the calendar — it is a chance to show your focus, strength, and determination. Keep believing in your effort and give this moment everything you have.',
    'This is your time, {recipient}. The road to {event} may not be easy, but every step, every practice, and every challenge has prepared you for this moment. Go forward with confidence.',
    '{recipient}, let {event} remind you how far you have already come. Trust your training, stay focused, and remember that every great achievement starts with courage.',
    'A big moment is ahead, {recipient}. For {event}, bring your energy, your discipline, and your belief. You do not need to be perfect — you only need to give your best.',
    '{recipient}, may {event} become one of those moments you look back on with pride. Stay strong, stay ready, and let your effort speak louder than doubt.',
    'The countdown is ending, {recipient}, and {event} is almost here. Step into it with a clear mind, a brave heart, and the confidence of someone who has worked for this.',
    '{recipient}, {event} is a chance to prove that effort always matters. Step into this moment with focus, trust your progress, and remember that every strong result begins with belief.',
    'Keep your head high, {recipient}. {event} is another step in your sport journey, and every step forward counts. Give it your best and be proud of the effort you bring.',
    '{recipient}, let {event} be the moment where your discipline, courage, and hard work come together. Stay calm, stay strong, and keep moving with purpose.',
    'This is a meaningful moment, {recipient}. For {event}, carry your confidence with you and remember that your preparation has already made you stronger.',
    '{recipient}, may {event} remind you that progress is built one choice at a time. Choose focus, choose energy, and choose to give your best today.',
    'The path to {event} may have taken patience and effort, {recipient}. Now let that effort guide you forward. You are ready for this moment.',
  ],
  Friendly: [
    'Hey {recipient}, wishing you an amazing {event}! Enjoy every moment, have fun, and remember that this day is part of your sport story.',
    'Good luck with {event}, {recipient}! I hope it brings you energy, excitement, and a reason to smile. You\'ve got this!',
    '{recipient}, I\'m cheering for you as {event} comes closer. Have a great time, enjoy the experience, and make it a moment to remember.',
    'Wishing you the best for {event}, {recipient}! May the day be full of good energy, strong moments, and great memories.',
    'Hey {recipient}, may {event} be exciting, successful, and full of positive emotions. Go enjoy it and make the most of every second.',
    '{recipient}, I hope {event} brings you confidence, joy, and a little bit of sport magic. Have fun and keep your spirit high!',
    'Hey {recipient}, wishing you a great {event}! Enjoy the moment, stay positive, and make it a day worth remembering.',
    'Good luck, {recipient}! I hope {event} brings you excitement, confidence, and plenty of reasons to smile.',
    '{recipient}, I hope your {event} is full of good energy, strong moments, and happy memories. Have fun and enjoy every part of it!',
    'Wishing you the best for {event}, {recipient}. May it be exciting, meaningful, and full of great sport spirit.',
    'Hey {recipient}, your {event} is here to be enjoyed. Stay relaxed, give it your best, and remember that I\'m cheering for you.',
    '{recipient}, may {event} bring you joy, motivation, and a moment you\'ll want to remember for a long time.',
  ],
  Humorous: [
    '{recipient}, good luck with {event}! May your energy be high, your mistakes be tiny, and your victory pose already practiced in the mirror.',
    'Big day alert, {recipient}! {event} is coming, so stretch your muscles, charge your confidence, and try not to trip over your own motivation.',
    '{recipient}, for {event}, may your skills be sharp, your luck be loud, and your opponents politely forget how good they are.',
    'Wishing you a fantastic {event}, {recipient}! Remember: confidence is important, hydration is important, and looking cool while doing it is absolutely optional.',
    '{recipient}, may {event} go so well that even your sports shoes feel proud of you. Go make some legendary moves!',
    'Good luck at {event}, {recipient}! Run fast, think smart, stay calm, and if all else fails — act like it was part of the strategy.',
    '{recipient}, good luck with {event}! May your confidence be high, your shoelaces stay tied, and your dramatic victory pose be camera-ready.',
    'Big sport moment incoming, {recipient}! For {event}, remember to breathe, focus, and pretend you had a master plan the whole time.',
    '{recipient}, may {event} go smoothly, your energy last longer than expected, and your mistakes be so stylish that nobody notices.',
    'Wishing you an awesome {event}, {recipient}! Play hard, smile often, and blame gravity only when absolutely necessary.',
    '{recipient}, may your {event} be full of power, luck, and just enough chaos to make the story interesting later.',
    'Good luck at {event}, {recipient}! Stay sharp, move fast, and remember: looking confident is half the sport.',
  ],
  Formal: [
    'Dear {recipient}, wishing you success and confidence as you take part in {event}. May your preparation, discipline, and commitment lead to a meaningful result.',
    'Congratulations, {recipient}, on reaching this important moment. May {event} bring you a strong performance, valuable experience, and well-deserved pride.',
    'Dear {recipient}, best wishes for {event}. May this occasion reflect your hard work, dedication, and continued growth in sport.',
    'Wishing you every success in {event}, {recipient}. May you approach this event with focus, confidence, and determination.',
    'Dear {recipient}, may {event} be a positive and memorable experience. Your effort and commitment deserve recognition and respect.',
    'Best wishes, {recipient}, as you prepare for {event}. May this event become another meaningful step in your personal sport journey.',
    'Dear {recipient}, best wishes for {event}. May your preparation and commitment help you approach this occasion with confidence and determination.',
    'Wishing you success in {event}, {recipient}. May this experience bring valuable progress, strong performance, and personal satisfaction.',
    'Dear {recipient}, may {event} be a rewarding and memorable occasion. Your dedication and effort are truly worth recognizing.',
    'Congratulations, {recipient}, on reaching {event}. May this moment reflect your discipline, focus, and continued growth.',
    'Dear {recipient}, wishing you a positive experience during {event}. May you perform with confidence and take pride in your effort.',
    'Best wishes, {recipient}, as you take part in {event}. May this event become a meaningful step forward in your sport journey.',
  ],
  Epic: [
    '{recipient}, the moment has arrived. {event} is not just an event — it is your arena, your test, and your chance to rise. Step forward and make it unforgettable.',
    'The countdown leads to this, {recipient}. {event} is where effort meets courage, where doubt fades, and where your story becomes stronger. Go claim your moment.',
    '{recipient}, every challenge before {event} has prepared you for this stage. Now it is time to move with purpose, compete with heart, and leave your mark.',
    'This is your chapter, {recipient}. Let {event} become the moment where focus becomes power, pressure becomes fuel, and your spirit refuses to back down.',
    '{recipient}, stand tall before {event}. The clock has counted down, the moment is here, and your energy is ready to turn into something legendary.',
    'For {event}, bring the fire, {recipient}. Bring the courage, the discipline, and the belief that great moments belong to those who dare to meet them.',
    '{recipient}, {event} is calling. This is the moment to rise, to move with courage, and to turn preparation into something unforgettable.',
    'The countdown has led you here, {recipient}. {event} is your stage, your challenge, and your chance to show the strength you have built.',
    '{recipient}, step into {event} like a champion of your own story. Let every second carry your energy, your focus, and your fire.',
    'For {event}, bring the heart of a fighter, the mind of a strategist, and the spirit of someone who refuses to fade, {recipient}.',
    '{recipient}, this is more than {event}. It is a test of courage, a spark of ambition, and a moment waiting to become legendary.',
    'The arena is ready, the moment is near, and your story continues, {recipient}. Let {event} become proof of what belief and effort can create.',
  ],
};

export function fillGreetingTemplate(
  template: string,
  recipient: string,
  event: string,
): string {
  const r = recipient.trim();
  const e = event.trim();
  return template.replace(/\{recipient\}/g, r).replace(/\{event\}/g, e);
}

export function pickRandomGreeting(
  style: GreetingStyle,
  recipient: string,
  event: string,
): string {
  const list = greetingTemplates[style];
  const template = list[Math.floor(Math.random() * list.length)]!;
  return fillGreetingTemplate(template, recipient, event);
}
