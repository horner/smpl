# SMPL Parse

Parses Simple Markup Procedure Language

## Simple Markup Procedure Language
A human friendly syntax designed to be easily read and interpreted by both computers and humans. Built from the principles of YAML and Markdown but extended to support concepts needed to document procedures (steps, timing,and looping). The initial design has no support for conditionals or branching, instead focusing on linear procedures. Examples of procedures include: a workout, simple surgical procedure, or instructions for how to use a computer program. The goal of SMPL to enable non-technical procedure designer to communicate their wisdom about a procedure and allow a computer to automate or assist a performer with reminders and collect performance information.

### Simple examples

#### Workouts

```
5 rounds for time
  20 Pull-ups
  30 Push-ups
  40 Sit-ups
  50 Squats
As many rounds as possible (AMRAP) in 20 min
  5 Pull-ups
  10 Push-ups
  15 Squats
```

#### Computer instructions

```
Fill out the following fields:
* Last Name: Horner
* Phone: 260-459-6270
Click on the 'Save' button.
Click 'OK'.
Type 'finally' in 'Slow Input'
Click on the 'going away' link.
```

#### Surgical

```
Prep:
  Administer Antibiotics if signs of sepsis are seen; otherwise, a single dose of prophylactic intravenous antibiotics is given immediately before surgery.
  Induce general anaesthesia, with endotracheal intubation and full muscle relaxation
  Positioned patient supine.
  Prepare abdomen and drape
Incision:
  If a mass is present:
    Make incision over the mass;
  otherwise,
    make the incision over [McBurney's point](one-third of the way from the anterior superior iliac spine to the umbilicus)
Open the various layers of the abdominal wall
  Making all efforts to preserve the integrity of abdominal wall.
  Split the external oblique aponeurosis along the line of its fibers,
  Split internal oblique muscle along it's fibers.
  As the two run at right angles to each other, this reduces the risk of later incisional hernia.
On entering the peritoneum:
  identify the appendix
  mobilize the appendix and ligate and divided at its base.
  Consider burying the stump of the appendix by inverting it so it points into the caecum.
Closing:
  For each layer of the abdominal wall, close in turn.
  Close skin with with staples or stitches.
  Dress wound
Send patient to the recovery room.
```

**Note:** leading space is critical to understanding scope, so fixed fonts are required to edit script. Tabs shoud be converted to spaces before parsing.
