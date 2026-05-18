
"""One-off merge of story text files + facts into stories.bundle.json"""
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent

META = [
    {"id": "one-more-step", "emoji": "🏃‍♂️", "tag": "Running", "title": "One More Step", "accent": "green", "readMinutes": 4, "file": "one-more-step.txt"},
    {"id": "final-minute", "emoji": "⚽", "tag": "Football", "title": "The Final Minute", "accent": "green", "readMinutes": 5, "file": "final-minute.txt"},
    {"id": "shot-after-miss", "emoji": "🏀", "tag": "Basketball", "title": "The Shot After the Miss", "accent": "orange", "readMinutes": 4, "file": "shot-after-miss.txt"},
    {"id": "silence-under-water", "emoji": "🏊‍♀️", "tag": "Swimming", "title": "The Silence Under Water", "accent": "blue", "readMinutes": 5, "file": "silence-under-water.txt"},
    {"id": "point-changed-everything", "emoji": "🎾", "tag": "Tennis", "title": "The Point That Changed Everything", "accent": "yellow", "readMinutes": 5, "file": "point-changed-everything.txt"},
    {"id": "hill-ahead", "emoji": "🚴", "tag": "Cycling", "title": "The Hill Ahead", "accent": "teal", "readMinutes": 4, "file": "hill-ahead.txt"},
    {"id": "bell-rings-again", "emoji": "🥊", "tag": "Boxing", "title": "The Bell Rings Again", "accent": "red", "readMinutes": 5, "file": "bell-rings-again.txt"},
    {"id": "team-refused-fall", "emoji": "🏐", "tag": "Volleyball", "title": "The Team That Refused to Fall", "accent": "purple", "readMinutes": 5, "file": "team-refused-fall.txt"},
    {"id": "first-clean-performance", "emoji": "⛸️", "tag": "Figure Skating", "title": "The First Clean Performance", "accent": "blue", "readMinutes": 5, "file": "first-clean-performance.txt"},
    {"id": "medal-no-one-sees", "emoji": "🏆", "tag": "Motivation", "title": "The Medal No One Sees", "accent": "yellow", "readMinutes": 5, "file": "medal-no-one-sees.txt"},
    {"id": "try-trust", "emoji": "🏉", "tag": "Rugby", "title": "The Try That Started With Trust", "accent": "green", "readMinutes": 5, "file": "try-trust.txt"},
    {"id": "weight-became-goal", "emoji": "🏋️", "tag": "Weightlifting", "title": "The Weight That Became a Goal", "accent": "orange", "readMinutes": 4, "file": "weight-became-goal.txt"},
    {"id": "race-yesterday", "emoji": "🏅", "tag": "Athletics", "title": "The Race Against Yesterday", "accent": "purple", "readMinutes": 5, "file": "race-yesterday.txt"},
    {"id": "wall-above", "emoji": "🧗", "tag": "Climbing", "title": "The Wall Above", "accent": "teal", "readMinutes": 5, "file": "wall-above.txt"},
    {"id": "trick-hundred-falls", "emoji": "🛹", "tag": "Skateboarding", "title": "The Trick After a Hundred Falls", "accent": "orange", "readMinutes": 5, "file": "trick-hundred-falls.txt"},
    {"id": "save-last-second", "emoji": "🥅", "tag": "Hockey", "title": "The Save in the Last Second", "accent": "blue", "readMinutes": 5, "file": "save-last-second.txt"},
    {"id": "breath-before-release", "emoji": "🏹", "tag": "Archery", "title": "The Breath Before Release", "accent": "purple", "readMinutes": 5, "file": "breath-before-release.txt"},
    {"id": "rally-not-end", "emoji": "🏓", "tag": "Table Tennis", "title": "The Rally That Would Not End", "accent": "red", "readMinutes": 5, "file": "rally-not-end.txt"},
    {"id": "partnership-speed", "emoji": "🏇", "tag": "Equestrian Sport", "title": "The Partnership at Full Speed", "accent": "green", "readMinutes": 5, "file": "partnership-speed.txt"},
    {"id": "lesson-respect", "emoji": "🥋", "tag": "Martial Arts", "title": "The Lesson in Respect", "accent": "red", "readMinutes": 5, "file": "lesson-respect.txt"},
    {"id": "quiet-shot", "emoji": "🏌️", "tag": "Golf", "title": "The Quiet Shot", "accent": "green", "readMinutes": 5, "file": "quiet-shot.txt"},
    {"id": "routine-held-breath", "emoji": "🤸", "tag": "Gymnastics", "title": "The Routine That Held Its Breath", "accent": "purple", "readMinutes": 5, "file": "routine-held-breath.txt"},
    {"id": "current-paddle", "emoji": "🛶", "tag": "Canoeing", "title": "The Current and the Paddle", "accent": "teal", "readMinutes": 5, "file": "current-paddle.txt"},
    {"id": "comeback-unexpected", "emoji": "🏟️", "tag": "Team Sports", "title": "The Comeback No One Expected", "accent": "purple", "readMinutes": 5, "file": "comeback-unexpected.txt"},
]

FACTS = [
    {"emoji": "🏃‍♂️", "tag": "Running", "text": "Running can improve endurance gradually because the heart, lungs, and muscles adapt to repeated effort over time."},
    {"emoji": "⚽", "tag": "Football", "text": "A standard football match usually lasts 90 minutes, but added time can make the final moments even more intense and unpredictable."},
    {"emoji": "🏀", "tag": "Basketball", "text": "Basketball was invented in 1891 by James Naismith as an indoor game to keep students active during winter."},
    {"emoji": "🏊‍♀️", "tag": "Swimming", "text": "Swimming uses almost the entire body, which is why it is often considered one of the most complete physical activities."},
    {"emoji": "🎾", "tag": "Tennis", "text": 'In tennis, the term "love" means zero, and it is one of the most recognizable scoring words in sport.'},
    {"emoji": "🚴", "tag": "Cycling", "text": "Cyclists often use drafting, riding close behind another cyclist, to reduce air resistance and save energy."},
    {"emoji": "🥊", "tag": "Boxing", "text": "Boxing footwork is just as important as punches, because movement helps fighters control distance, balance, and timing."},
    {"emoji": "🏐", "tag": "Volleyball", "text": "A volleyball team can touch the ball up to three times before sending it over the net, usually with a pass, set, and attack."},
    {"emoji": "⛸️", "tag": "Figure Skating", "text": "Figure skaters combine athletic jumps, spins, balance, and musical expression in one performance."},
    {"emoji": "🏆", "tag": "Motivation", "text": "Many athletes use visualization before competitions, imagining their performance to build focus and confidence."},
    {"emoji": "🏉", "tag": "Rugby", "text": 'In rugby, a "try" is scored when a player grounds the ball in the opponent\'s in-goal area.'},
    {"emoji": "🏋️", "tag": "Weightlifting", "text": "Proper technique in weightlifting is essential because lifting safely depends on body position, timing, and control."},
    {"emoji": "🏅", "tag": "Athletics", "text": "In sprinting, reaction time at the start can strongly affect the final result, especially in short-distance races."},
    {"emoji": "🧗", "tag": "Climbing", "text": "Climbing is not only about strength; balance, route planning, grip technique, and calm decision-making are just as important."},
    {"emoji": "🛹", "tag": "Skateboarding", "text": "Many skateboard tricks are built from small variations of balance, timing, board control, and body rotation."},
    {"emoji": "🥅", "tag": "Hockey", "text": "Ice hockey players can change direction extremely quickly because skate blades allow sharp turns and rapid acceleration."},
    {"emoji": "🏹", "tag": "Archery", "text": "In archery, breathing control helps the archer stay steady before releasing the arrow."},
    {"emoji": "🏓", "tag": "Table Tennis", "text": "Table tennis balls can spin very fast, making timing and paddle angle important for every return."},
    {"emoji": "🏇", "tag": "Equestrian Sport", "text": "Equestrian sport depends on communication between rider and horse, using balance, posture, reins, and subtle body signals."},
    {"emoji": "🥋", "tag": "Martial Arts", "text": "Martial arts often focus on discipline, respect, balance, and self-control, not only physical techniques."},
    {"emoji": "🏌️", "tag": "Golf", "text": "Golf courses are designed with different challenges such as bunkers, slopes, wind, water hazards, and distance control."},
    {"emoji": "🤸", "tag": "Gymnastics", "text": "Gymnasts need strength, flexibility, coordination, and body awareness to perform complex movements safely."},
    {"emoji": "🛶", "tag": "Canoeing", "text": "In canoeing and kayaking, paddle angle and rhythm can strongly affect speed, balance, and direction."},
    {"emoji": "🏟️", "tag": "Team Sports", "text": "Strong communication can change the outcome of a team sport because players must react together under pressure."},
    {"emoji": "🏑", "tag": "Field Hockey", "text": "Field hockey players use only one flat side of the stick to control, pass, and shoot the ball."},
    {"emoji": "🏂", "tag": "Snowboarding", "text": "Snowboarders shift body weight between the front and back foot to control turns, speed, and balance."},
    {"emoji": "🏸", "tag": "Badminton", "text": "A badminton shuttlecock can travel extremely fast after a smash, making reaction time very important."},
    {"emoji": "🥌", "tag": "Curling", "text": "Curling players sweep the ice to influence the speed and direction of the stone."},
    {"emoji": "🏎️", "tag": "Motorsport", "text": "In motorsport, pit stops can decide races because even a few seconds gained or lost can change track position."},
    {"emoji": "🧘", "tag": "Training Mindset", "text": "Rest and recovery are part of athletic progress because muscles need time to repair and become stronger."},
]


def main() -> None:
    txtdir = HERE / "storytext"
    stories = []
    for m in META:
        path = txtdir / m["file"]
        body = path.read_text(encoding="utf-8").strip()
        stories.append(
            {
                "id": m["id"],
                "emoji": m["emoji"],
                "tag": m["tag"],
                "title": m["title"],
                "accent": m["accent"],
                "readMinutes": m["readMinutes"],
                "body": body,
            }
        )
    bundle = {"stories": stories, "facts": FACTS}
    out = HERE / "stories.bundle.json"
    out.write_text(json.dumps(bundle, ensure_ascii=False, indent=2), encoding="utf-8")
    print("wrote", out, "stories", len(stories), "facts", len(FACTS))


if __name__ == "__main__":
    main()
