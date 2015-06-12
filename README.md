# Crepido
Create boards to track users and projects from flat markdown files.

![crepido-screenshot](https://cloud.githubusercontent.com/assets/124599/7302912/cb8d9d54-e9fd-11e4-9183-175f79b0dd4b.png)

## Setup

1. `$ git clone https://github.com/arshad/crepido.git`.
2. `$ cd crepido && npm install`.
3. `$ gulp`.

## How to create boards

1. Create a file in the *./boards* directory.
2. Add your text as follows.

```
---
name: Arshad
picture: https://avatars0.githubusercontent.com/u/124599?v=3&s=460
---

# In Progress

* [Project A] Gumbo beet greens corn soko endive gumbo gourd.

# Pipeline

* [Project A] Turnip greens yarrow ricebean rutabaga endive.
* [Project B] Nori grape silver beet broccoli kombu beet greens fava bean.
```

3. Run `$ gulp`

Note:

1. Each heading followed by a list will be converted to a card.
2. [Title] [labels] are converted to labels.

## How to deploy to Github Pages

1. Update `remoteUrl, origin and branch` in *config.json*.
2. Run `$ gulp deploy`.

## How to customize colors

To add custom colors for boards and labels, see `./src/assets/sass/tools/_colors.scss`.


License
--------------

The MIT License (MIT)

Copyright (c) 2014 Arshad Chummun

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

