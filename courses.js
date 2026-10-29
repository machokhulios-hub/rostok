/* Направления обучения: уроки, экзамены, словарь. Этот файл обновляет Claude.
   Отметки и результаты хранятся в телефоне отдельно и при обновлении не теряются.
   Важно: id уроков и экзаменов не меняются, иначе пропадёт прогресс по ним.

   Типы вопросов экзамена:
   choice — выбрать ответ; ПЕРВЫЙ вариант в options всегда правильный (приложение перемешивает).
   input  — вписать ответ; a — список допустимых ответов.
   order  — собрать фразу из слов; a — правильная фраза. */
window.COURSES = [
  {
    id: 'eng', cat: 'eng', name: 'Английский', type: 'path',
    goal: 'Свободно писать Claude по-английски. Словарь курса — около 450 слов по темам; транскрипция русскими буквами приблизительная, точное произношение проверяй на слух.', level: 'A0', target: 'A1',
    vocab: [{"topic": "Время, дни, сезоны", "words": [["Monday", "ма́ндэй", "понедельник"], ["Tuesday", "тью́здэй", "вторник"], ["Wednesday", "уэ́нздэй", "среда"], ["Thursday", "сё́здэй", "четверг"], ["Friday", "фра́йдэй", "пятница"], ["Saturday", "сэ́тэдэй", "суббота"], ["Sunday", "са́ндэй", "воскресенье"], ["week", "уик", "неделя"], ["month", "манс", "месяц"], ["year", "йиэ", "год"], ["weekend", "уи́кэнд", "выходные"], ["o'clock", "окло́к", "ровно (о часах): at 5 o'clock"], ["half", "хаф", "половина"], ["quarter", "куо́тэ", "четверть"], ["soon", "сун", "скоро"], ["always", "о́лвэйз", "всегда"], ["never", "нэ́вэ", "никогда"], ["sometimes", "са́мтаймз", "иногда"], ["often", "офн", "часто"], ["spring", "спринг", "весна"], ["summer", "са́мэ", "лето"], ["autumn", "о́тэм", "осень"], ["winter", "уи́нтэ", "зима"], ["holiday", "хо́лидэй", "выходной, отпуск, праздник"]]}, {"topic": "Числа до тысячи и деньги", "words": [["thirty", "сё́ти", "тридцать"], ["forty", "фо́ти", "сорок"], ["fifty", "фи́фти", "пятьдесят"], ["sixty", "си́ксти", "шестьдесят"], ["seventy", "сэ́вэнти", "семьдесят"], ["eighty", "э́йти", "восемьдесят"], ["ninety", "на́йнти", "девяносто"], ["hundred", "ха́ндрэд", "сто"], ["thousand", "са́узэнд", "тысяча"], ["first", "фёст", "первый"], ["second", "сэ́кэнд", "второй; секунда"], ["third", "сёд", "третий"], ["price", "прайс", "цена"], ["cheap", "чип", "дешёвый"], ["expensive", "икспэ́нсив", "дорогой"], ["rouble", "рубл", "рубль"], ["dollar", "до́лэ", "доллар"], ["pay", "пэй", "платить"], ["cost", "кост", "стоить"], ["count", "каунт", "считать"], ["percent", "пэсэ́нт", "процент"], ["double", "дабл", "двойной"]]}, {"topic": "Дом, вещи, одежда", "words": [["flat", "флэт", "квартира"], ["floor", "фло", "пол; этаж"], ["wall", "уол", "стена"], ["chair", "чеа", "стул"], ["sofa", "со́уфа", "диван"], ["lamp", "лэмп", "лампа"], ["light", "лайт", "свет; лёгкий"], ["key", "ки", "ключ"], ["bag", "бэг", "сумка"], ["clothes", "клоузз", "одежда"], ["shirt", "шёт", "рубашка"], ["jacket", "джэ́кит", "куртка"], ["shoes", "шуз", "обувь"], ["hat", "хэт", "шапка, шляпа"], ["glasses", "гла́сиз", "очки"], ["clock", "клок", "часы (настенные)"], ["computer", "кэмпью́тэ", "компьютер"], ["bathroom", "ба́срум", "ванная"], ["bedroom", "бэ́друм", "спальня"], ["garden", "га́дн", "сад"], ["street", "стрит", "улица"], ["city", "си́ти", "город"], ["village", "ви́лидж", "деревня"], ["shop", "шоп", "магазин"], ["market", "ма́кит", "рынок"]]}, {"topic": "Еда и кафе", "words": [["breakfast", "брэ́кфэст", "завтрак"], ["lunch", "ланч", "обед"], ["dinner", "ди́нэ", "ужин"], ["soup", "суп", "суп"], ["rice", "райс", "рис"], ["potato", "пэтэ́йтоу", "картофель"], ["chicken", "чи́кин", "курица"], ["cheese", "чиз", "сыр"], ["butter", "ба́тэ", "масло (сливочное)"], ["sugar", "шу́гэ", "сахар"], ["salt", "солт", "соль"], ["salad", "сэ́лэд", "салат"], ["fruit", "фрут", "фрукты"], ["vegetables", "вэ́джтэблз", "овощи"], ["juice", "джус", "сок"], ["beer", "биэ", "пиво"], ["cake", "кэйк", "торт, пирожное"], ["menu", "мэ́нью", "меню"], ["bill", "бил", "счёт (в кафе)"], ["delicious", "дили́шэс", "очень вкусный"], ["hungry", "ха́нгри", "голодный"], ["thirsty", "сё́сти", "хочу пить"], ["cup", "кап", "чашка"], ["plate", "плэйт", "тарелка"], ["knife", "найф", "нож"], ["fork", "фок", "вилка"], ["spoon", "спун", "ложка"]]}, {"topic": "Работа и железная дорога", "words": [["driver", "дра́йвэ", "машинист; водитель"], ["assistant", "эси́стэнт", "помощник"], ["engineer", "энджини́э", "инженер"], ["locomotive", "локэмо́утив", "локомотив"], ["railway", "рэ́йлуэй", "железная дорога"], ["track", "трэк", "путь (рельсовый); трек"], ["wagon", "уэ́гэн", "вагон (грузовой)"], ["freight train", "фрэйт трэйн", "грузовой поезд"], ["cargo", "ка́гоу", "груз"], ["signal", "си́гнэл", "сигнал"], ["speed", "спид", "скорость"], ["brake", "брэйк", "тормоз"], ["stop", "стоп", "остановка; останавливаться"], ["depot", "дэ́поу", "депо"], ["schedule", "шэ́дьюл", "расписание, график"], ["night shift", "найт шифт", "ночная смена"], ["boss", "бос", "начальник"], ["colleague", "ко́лиг", "коллега"], ["salary", "сэ́лэри", "зарплата"], ["office", "о́фис", "офис, контора"], ["meeting", "ми́тинг", "встреча, совещание"], ["safety", "сэ́йфти", "безопасность"], ["rule", "рул", "правило"], ["report", "рипо́т", "отчёт; докладывать"], ["tool", "тул", "инструмент"], ["repair", "рипэ́э", "ремонт; чинить"]]}, {"topic": "Город и дорога", "words": [["ticket", "ти́кит", "билет"], ["airport", "э́апот", "аэропорт"], ["plane", "плэйн", "самолёт"], ["bus", "бас", "автобус"], ["taxi", "тэ́кси", "такси"], ["metro", "мэ́троу", "метро"], ["road", "роуд", "дорога"], ["map", "мэп", "карта"], ["hotel", "хоутэ́л", "гостиница"], ["passport", "па́спот", "паспорт"], ["left", "лэфт", "налево; левый"], ["right", "райт", "направо; правый; правильно"], ["straight", "стрэйт", "прямо"], ["near", "ниэ", "рядом"], ["far", "фа", "далеко"], ["bank", "бэнк", "банк"], ["hospital", "хо́спитл", "больница"], ["pharmacy", "фа́мэси", "аптека"], ["police", "пэли́с", "полиция"], ["museum", "мьюзи́эм", "музей"], ["park", "пак", "парк"], ["river", "ри́вэ", "река"], ["bridge", "бридж", "мост"], ["arrive", "эра́йв", "прибывать"], ["leave", "лив", "уезжать; оставлять"]]}, {"topic": "Какой? Прилагательные и чувства", "words": [["big", "биг", "большой"], ["small", "смол", "маленький"], ["hot", "хот", "горячий, жаркий"], ["cold", "коулд", "холодный"], ["warm", "уом", "тёплый"], ["old", "оулд", "старый"], ["young", "янг", "молодой"], ["long", "лонг", "длинный"], ["short", "шот", "короткий"], ["fast", "фаст", "быстрый"], ["slow", "слоу", "медленный"], ["easy", "и́зи", "лёгкий (простой)"], ["difficult", "ди́фикэлт", "трудный"], ["beautiful", "бью́тифул", "красивый"], ["bad", "бэд", "плохой"], ["strong", "стронг", "сильный"], ["weak", "уик", "слабый"], ["clean", "клин", "чистый"], ["dirty", "дё́ти", "грязный"], ["important", "импо́тэнт", "важный"], ["interesting", "и́нтрэстинг", "интересный"], ["boring", "бо́ринг", "скучный"], ["sad", "сэд", "грустный"], ["angry", "э́нгри", "злой, сердитый"], ["afraid", "эфрэ́йд", "боюсь, испуганный"], ["sick", "сик", "больной"], ["glad", "глэд", "рад"]]}, {"topic": "Фразы для чата с Claude", "words": [["Let's practice", "лэтс прэ́ктис", "Давай потренируемся"], ["Correct my mistakes", "кэрэ́кт май мистэ́йкс", "Исправь мои ошибки"], ["What is the difference?", "уот из зэ ди́фрэнс", "В чём разница?"], ["How do you say … in English?", "хау ду ю сэй … ин и́нглиш", "Как сказать … по-английски?"], ["Say it again, please", "сэй ит эгэ́н плиз", "Повтори, пожалуйста"], ["Give me an example", "гив ми эн игза́мпл", "Приведи пример"], ["Is it correct?", "из ит кэрэ́кт", "Это правильно?"], ["I have a question", "ай хэв э куэ́счен", "У меня вопрос"], ["Speak simply", "спик си́мпли", "Говори просто"], ["One more time", "уан мо тайм", "Ещё раз"], ["I agree", "ай эгри́", "Согласен"], ["I don't know", "ай доунт ноу", "Не знаю"], ["Good idea", "гуд айди́э", "Хорошая идея"], ["Let me think", "лэт ми синк", "Дай подумать"], ["Thanks a lot", "сэнкс э лот", "Большое спасибо"], ["See you tomorrow", "си ю тумо́роу", "До завтра"], ["What does it mean?", "уот даз ит мин", "Что это значит?"], ["Can you help me?", "кэн ю хэлп ми", "Можешь помочь?"], ["Write it down", "райт ит даун", "Запиши это"], ["That's all for today", "зэтс ол фо тудэ́й", "На сегодня всё"]]}, {"topic": "Музыка и творчество", "words": [["song", "сонг", "песня"], ["melody", "мэ́лэди", "мелодия"], ["rhythm", "ри́зэм", "ритм"], ["beat", "бит", "бит, удар"], ["sound", "саунд", "звук"], ["voice", "войс", "голос"], ["guitar", "гита́", "гитара"], ["drums", "драмз", "барабаны"], ["piano", "пиа́ноу", "пианино"], ["record", "рико́д", "записывать"], ["mix", "микс", "сводить; микс"], ["studio", "стью́диоу", "студия"], ["headphones", "хэ́дфоунз", "наушники"], ["loud", "лауд", "громкий"], ["quiet", "куа́йэт", "тихий"], ["poem", "по́уэм", "стихотворение"], ["write a song", "райт э сонг", "написать песню"], ["release", "рили́с", "релиз; выпускать"], ["album", "э́лбэм", "альбом"], ["singer", "си́нгэ", "певец"], ["artist", "а́тист", "артист, художник"], ["lyrics", "ли́рикс", "текст песни"], ["idea", "айди́э", "идея"], ["talent", "тэ́лэнт", "талант"]]}, {"topic": "Погода и природа", "words": [["weather", "уэ́зэ", "погода"], ["sun", "сан", "солнце"], ["rain", "рэйн", "дождь"], ["snow", "сноу", "снег"], ["wind", "уинд", "ветер"], ["cloud", "клауд", "облако"], ["sky", "скай", "небо"], ["tree", "три", "дерево"], ["forest", "фо́рист", "лес"], ["sea", "си", "море"], ["mountain", "ма́унтин", "гора"], ["flower", "фла́уэ", "цветок"], ["grass", "грас", "трава"], ["bird", "бёд", "птица"], ["horse", "хос", "лошадь"], ["cow", "кау", "корова"], ["sunny", "са́ни", "солнечно"], ["rainy", "рэ́йни", "дождливо"], ["cloudy", "кла́уди", "облачно"], ["windy", "уи́нди", "ветрено"], ["degree", "дигри́", "градус"], ["It's raining", "итс рэ́йнинг", "Идёт дождь"], ["nature", "нэ́йчэ", "природа"], ["earth", "ёс", "земля"], ["moon", "мун", "луна"], ["star", "ста", "звезда"]]}],
    unit: 'урок',
    prompt: 'Проведи со мной урок английского №{n}: «{t}». Я учу английский с нуля. Объясняй по-русски, у каждого английского слова пиши транскрипцию русскими буквами. План урока: {plan}. Новые слова: {words}. В конце дай 5 коротких упражнений и проверь мои ответы.',
    steps: [
      { id: 'e1', t: 'Глагол to be: I am, you are, he is', plan: 'am / is / are, местоимения, короткие фразы «Я дома», «Он на работе»',
        theory: {"rule": "Глагол **to be** («быть») меняется по лицам: **I am** — я, **you are** — ты, вы, **he / she / it is** — он, она, оно, **we / they are** — мы, они.", "ex": [["I am at home [ай эм эт хоум]", "я дома"], ["He is at work [хи из эт уёк]", "он на работе"], ["We are friends [уи а фрэндз]", "мы друзья"]], "tip": "В английской фразе глагол обязателен: «I am at home», а не «I at home»."},
        ex: [{"k": "choice", "q": "«I ___ at home»", "options": ["am", "is", "are"]}, {"k": "choice", "q": "«She ___ tired»", "options": ["is", "are", "am"]}, {"k": "choice", "q": "«You ___ my friend»", "options": ["are", "is", "am"]}, {"k": "choice", "q": "«He ___ at work»", "options": ["is", "are", "am"]}, {"k": "choice", "q": "Выбери перевод: «Мы дома»", "options": ["We are at home", "We is at home", "We am at home"]}],
        words: [["I", "ай", "я"], ["you", "ю", "ты, вы"], ["he", "хи", "он"], ["she", "ши", "она"], ["it", "ит", "оно, это"], ["we", "уи", "мы"], ["they", "зэй", "они"], ["am", "эм", "есть (я)"], ["is", "из", "есть (он, она, оно)"], ["are", "а", "есть (ты, вы, мы, они)"], ["here", "хиэ", "здесь"], ["there", "зэа", "там"], ["now", "нау", "сейчас"], ["today", "туде́й", "сегодня"], ["not", "нот", "не"]] },
      { id: 'e2', t: 'Приветствия и знакомство', plan: 'поздороваться, назвать себя, попрощаться, сказать спасибо',
        theory: {"rule": "**Hello** [хэлоу] — привет. **Good morning** — доброе утро, **good evening** — добрый вечер. Представиться: **My name is …** («меня зовут …»). После знакомства: **Nice to meet you**. Попрощаться: **Goodbye**. Поблагодарить: **Thank you**.", "ex": [["My name is Alex [май нэйм из Э́лекс]", "меня зовут Алекс"], ["Nice to meet you [найс ту мит ю]", "приятно познакомиться"], ["Thank you [сэнк ю]", "спасибо"]], "tip": "Good morning говорят до обеда, good evening — вечером. Просто hello подходит в любое время."},
        ex: [{"k": "choice", "q": "Как по-английски «до свидания»?", "options": ["goodbye", "hello", "please", "thank you"]}, {"k": "choice", "q": "Что значит «My name is Anna»?", "options": ["Меня зовут Анна", "Моя подруга Анна", "Это Анна", "Анна дома"]}, {"k": "choice", "q": "Утром ты скажешь:", "options": ["Good morning", "Good evening", "Goodbye", "Thank you"]}, {"k": "choice", "q": "Что значит please [плиз]?", "options": ["пожалуйста", "спасибо", "привет", "имя"]}, {"k": "choice", "q": "Выбери перевод: «Приятно познакомиться»", "options": ["Nice to meet you", "Thank you", "Good evening", "My name is"]}],
        words: [["hello", "хэлоу", "привет"], ["good morning", "гуд мо́рнинг", "доброе утро"], ["good evening", "гуд и́внинг", "добрый вечер"], ["goodbye", "гудба́й", "до свидания"], ["name", "нэйм", "имя"], ["my", "май", "мой"], ["nice to meet you", "найс ту мит ю", "приятно познакомиться"], ["thank you", "сэнк ю", "спасибо"], ["please", "плиз", "пожалуйста"], ["hi", "хай", "привет (неформально)"], ["good afternoon", "гуд афтэну́н", "добрый день"], ["good night", "гуд найт", "спокойной ночи"], ["see you", "си ю", "увидимся"], ["sorry", "со́ри", "извини"], ["excuse me", "икскью́з ми", "извините (чтобы обратиться)"], ["how are you", "хау а ю", "как дела"], ["fine", "файн", "хорошо, нормально"], ["I am from", "ай эм фром", "я из"], ["Russia", "ра́ша", "Россия"]] },
      { id: 'e3', t: 'Числа от 1 до 20', plan: 'счёт до двадцати, время и номера',
        theory: {"rule": "Числа **1–10**: one, two, three, four, five, six, seven, eight, nine, ten. **11 и 12** — отдельные слова: eleven, twelve. **13–19** кончаются на **-teen** [тин]: fifteen = five + teen. **20** — twenty.", "ex": [["fifteen [фифти́н]", "15 = five + teen"], ["twenty [ту́энти]", "20"], ["seven [сэвн]", "7"]], "tip": "В fifteen ударение на конце: фифти́н. В twenty — на первом слоге: ту́энти."},
        ex: [{"k": "choice", "q": "Как по-английски 5?", "options": ["five", "four", "six", "fifteen"]}, {"k": "choice", "q": "two + two = ?", "options": ["four", "five", "three", "six"]}, {"k": "choice", "q": "Напиши цифрой: eleven", "options": ["11", "12", "10", "20"]}, {"k": "choice", "q": "Что значит twenty?", "options": ["20", "12", "2", "15"]}, {"k": "choice", "q": "ten + five = ?", "options": ["fifteen", "twelve", "twenty", "eleven"]}],
        words: [["one", "уан", "один"], ["two", "ту", "два"], ["three", "сри", "три"], ["four", "фо", "четыре"], ["five", "файв", "пять"], ["six", "сикс", "шесть"], ["seven", "сэвн", "семь"], ["eight", "эйт", "восемь"], ["nine", "найн", "девять"], ["ten", "тэн", "десять"], ["eleven", "илэ́вн", "одиннадцать"], ["twelve", "туэлв", "двенадцать"], ["fifteen", "фифти́н", "пятнадцать"], ["twenty", "ту́энти", "двадцать"], ["thirteen", "сёти́н", "тринадцать"], ["fourteen", "фоти́н", "четырнадцать"], ["sixteen", "сиксти́н", "шестнадцать"], ["seventeen", "сэвнти́н", "семнадцать"], ["eighteen", "эйти́н", "восемнадцать"], ["nineteen", "найнти́н", "девятнадцать"], ["zero", "зи́эроу", "ноль"], ["number", "на́мбэ", "номер, число"], ["hour", "а́уэ", "час"], ["minute", "ми́нит", "минута"]] },
      { id: 'e4', t: 'Вопросы с to be: Are you ready?', plan: 'как задать вопрос и коротко ответить: Yes, I am / No, I am not',
        theory: {"rule": "Чтобы задать вопрос с **to be**, поставь **am / is / are** на первое место: «You are ready» → **Are you ready?** Короткий ответ: **Yes, I am.** или **No, I am not.**", "ex": [["Are you ready? [а ю рэ́ди]", "ты готов?"], ["Is he at work? [из хи эт уёк]", "он на работе?"], ["Yes, I am. [йес ай эм]", "да"]], "tip": "В коротком ответе повторяется тот же глагол: Are you tired? — Yes, I am. Нельзя «Yes, I are»."},
        ex: [{"k": "choice", "q": "Выбери перевод: «Ты устал?»", "options": ["Are you tired?", "You are tired?", "Is you tired?", "Are tired you?"]}, {"k": "choice", "q": "Как ответить «нет» на «Is she at home?»", "options": ["No, she is not.", "No, she am not.", "No, I am not.", "No, she are not."]}, {"k": "choice", "q": "«___ he ready?»", "options": ["Is", "Are", "Am"]}, {"k": "choice", "q": "Что значит at home [эт хоум]?", "options": ["дома", "на работе", "готов", "уставший"]}, {"k": "choice", "q": "Как правильно?", "options": ["Are they ready?", "They are ready?", "Is they ready?"]}],
        words: [["yes", "йес", "да"], ["no", "ноу", "нет"], ["ready", "рэ́ди", "готов"], ["tired", "та́йэд", "уставший"], ["at work", "эт уёк", "на работе"], ["at home", "эт хоум", "дома"], ["busy", "би́зи", "занят"], ["free", "фри", "свободен; бесплатный"], ["late", "лэйт", "поздно; опоздавший"], ["early", "ё́ли", "рано"], ["happy", "хэ́пи", "счастливый, довольный"], ["sure", "шуэ", "конечно; уверен"], ["maybe", "мэ́йби", "может быть"], ["of course", "ов кос", "конечно"]] },
      { id: 'e5', t: 'I have / I want / I like', plan: 'иметь, хотеть, нравиться; he/she — добавляем -s: he likes, she wants, но he has',
        theory: {"rule": "**I have** — у меня есть, **I want** — я хочу, **I like** — мне нравится. С **he / she / it** к глаголу добавляется **-s**: he likes, she wants. Но **have** меняется на **has**: he has.", "ex": [["I have a car [ай хэв э ка]", "у меня есть машина"], ["She likes tea [ши лайкс ти]", "ей нравится чай"], ["He has time [хи хэз тайм]", "у него есть время"]], "tip": "Не говори «he have» и «she want»: после he / she / it всегда -s."},
        ex: [{"k": "choice", "q": "«I ___ a car»", "options": ["have", "has", "am"]}, {"k": "choice", "q": "«She ___ coffee» (хочет)", "options": ["wants", "want", "wanting"]}, {"k": "choice", "q": "«He ___ time»", "options": ["has", "have", "haves"]}, {"k": "choice", "q": "Выбери перевод: «Мне нравится музыка»", "options": ["I like music", "I likes music", "I am like music", "Me like music"]}, {"k": "choice", "q": "Выбери перевод: «Она любит чай»", "options": ["She loves tea", "She love tea", "She is love tea", "Her loves tea"]}],
        words: [["have", "хэв", "иметь"], ["want", "уонт", "хотеть"], ["like", "лайк", "нравиться"], ["love", "лав", "любить"], ["need", "нид", "нуждаться"], ["car", "ка", "машина"], ["time", "тайм", "время"], ["coffee", "ко́фи", "кофе"], ["tea", "ти", "чай"], ["music", "мью́зик", "музыка"], ["has", "хэз", "имеет (он, она)"], ["money", "ма́ни", "деньги"], ["phone", "фоун", "телефон"], ["book", "бук", "книга"], ["dog", "дог", "собака"], ["cat", "кэт", "кошка"], ["job", "джоб", "работа (место)"], ["day", "дэй", "день"], ["new", "нью", "новый"], ["good", "гуд", "хороший"]] },
      { id: 'e6', t: 'Еда, дом, семья', plan: 'слова для дома и семьи, фразы «Моя мама любит рыбу»',
        theory: {"rule": "Дом: **house, kitchen, room**. Семья: **mother, father, brother, sister**. Слово **my** («мой, моя») ставится перед существительным: **my mother**. С he / she / it не забывай -s: **My mother likes fish**.", "ex": [["My brother is at home [май бра́зэ из эт хоум]", "мой брат дома"], ["My mother likes fish [май ма́зэ лайкс фиш]", "моя мама любит рыбу"], ["a kitchen [э ки́чен]", "кухня"]], "tip": "В mother, father, brother звук th читается мягко: ма́зэ, фа́зэ, бра́зэ. Язык слегка между зубами."},
        ex: [{"k": "choice", "q": "Что значит sister [си́стэ]?", "options": ["сестра", "брат", "мама", "друг"]}, {"k": "choice", "q": "Как по-английски «хлеб»?", "options": ["bread", "fish", "water", "apple"]}, {"k": "choice", "q": "Выбери перевод: «Мой брат любит рыбу»", "options": ["My brother likes fish", "My brother like fish", "My brother is fish", "Brother my likes fish"]}, {"k": "choice", "q": "«My sister ___ tea» (любит)", "options": ["likes", "like", "are like"]}, {"k": "choice", "q": "Что значит house [хаус]?", "options": ["дом", "комната", "кухня", "друг"]}],
        words: [["house", "хаус", "дом"], ["kitchen", "ки́чен", "кухня"], ["room", "рум", "комната"], ["mother", "ма́зэ", "мама"], ["father", "фа́зэ", "папа"], ["brother", "бра́зэ", "брат"], ["sister", "си́стэ", "сестра"], ["bread", "брэд", "хлеб"], ["fish", "фиш", "рыба"], ["water", "уо́тэ", "вода"], ["apple", "эпл", "яблоко"], ["friend", "фрэнд", "друг"], ["son", "сан", "сын"], ["daughter", "до́тэ", "дочь"], ["wife", "уайф", "жена"], ["husband", "ха́збэнд", "муж"], ["family", "фэ́мили", "семья"], ["meat", "мит", "мясо"], ["milk", "милк", "молоко"], ["egg", "эг", "яйцо"], ["table", "тэйбл", "стол"], ["bed", "бэд", "кровать"], ["door", "до", "дверь"], ["window", "уи́ндоу", "окно"]] },
      { id: 'eng-x1', exam: true, t: 'Экзамен: уроки 1–6', covers: ['e1', 'e2', 'e3', 'e4', 'e5', 'e6'], pass: 0.8,
        q: [
          { k: 'choice', s: 'e1', q: 'Выбери перевод: «Я дома»', options: ['I am at home', 'I is at home', 'I are at home', 'Me at home'] },
          { k: 'choice', s: 'e1', q: 'Вставь слово: «We ___ ready»', options: ['are', 'am', 'is', 'be'] },
          { k: 'input', s: 'e1', q: 'Вставь слово: «They ___ friends»', a: ['are'] },
          { k: 'choice', s: 'e1', q: 'Выбери перевод: «Она устала»', options: ['She is tired', 'She are tired', 'She am tired', 'Her is tired'] },
          { k: 'choice', s: 'e2', q: 'Что значит «Nice to meet you»?', options: ['Приятно познакомиться', 'Доброе утро', 'Спасибо', 'До свидания'] },
          { k: 'choice', s: 'e2', q: 'Что значит «My name is Alex»?', options: ['Меня зовут Алекс', 'Мой друг Алекс', 'Это Алекс', 'Алекс дома'] },
          { k: 'input', s: 'e2', q: 'Переведи на английский: «спасибо»', a: ['thank you', 'thanks'] },
          { k: 'choice', s: 'e2', q: 'Выбери перевод: «Добрый вечер»', options: ['Good evening', 'Good morning', 'Goodbye', 'Good night'] },
          { k: 'choice', s: 'e3', q: 'Как по-английски 12?', options: ['twelve', 'twenty', 'two', 'eleven'] },
          { k: 'input', s: 'e3', q: 'Напиши цифрами: «fifteen»', a: ['15'] },
          { k: 'choice', s: 'e3', q: 'Seven + three = ?', options: ['ten', 'eleven', 'nine', 'eight'] },
          { k: 'order', s: 'e4', q: 'Собери вопрос: «Ты готов?»', words: ['ready', 'Are', 'you'], a: 'Are you ready' },
          { k: 'choice', s: 'e4', q: 'Выбери перевод: «Он на работе?»', options: ['Is he at work?', 'He is at work?', 'Are he at work?', 'Is he work?'] },
          { k: 'choice', s: 'e4', q: 'Как ответить «да» на «Are you tired?»', options: ['Yes, I am.', 'Yes, I is.', 'Yes, you are.', 'Yes, I have.'] },
          { k: 'choice', s: 'e5', q: 'Выбери перевод: «У меня есть машина»', options: ['I have a car', 'I has a car', 'I am a car', 'I want a car'] },
          { k: 'choice', s: 'e5', q: 'Выбери перевод: «Я хочу кофе»', options: ['I want coffee', 'I like coffee', 'I have coffee', 'I need tea'] },
          { k: 'order', s: 'e5', q: 'Собери фразу: «Мне нравится музыка»', words: ['music', 'like', 'I'], a: 'I like music' },
          { k: 'choice', s: 'e6', q: 'Что значит kitchen [ки́чен]?', options: ['кухня', 'комната', 'дом', 'спальня'] },
          { k: 'input', s: 'e6', q: 'Переведи на английский: «брат»', a: ['brother', 'a brother'] },
          { k: 'choice', s: 'e6', q: 'Выбери перевод: «Моя мама любит рыбу»', options: ['My mother likes fish', 'My mother like fish', 'My mother love fish', 'Mother my likes fish'] }
        ] },
      { id: 'e7', t: 'I can / I do / I don\'t', plan: 'могу, делаю, не делаю; короткие ответы',
        theory: {"rule": "**I can** [ай кэн] — я умею, могу. После **can** глагол не меняется: **I can drive**. Отрицание строится с **do**: **I do not work** (сокращённо **I don't work**) — я не работаю.", "ex": [["I can drive [ай кэн драйв]", "я умею водить"], ["I don't read [ай доунт рид]", "я не читаю"], ["Can you write? [кэн ю райт]", "ты умеешь писать?"]], "tip": "После can и don't глагол остаётся как в словаре: «I can drive», а не «I can drives». Даже для he / she: he can drive."},
        ex: [{"k": "choice", "q": "Выбери перевод: «Я умею читать»", "options": ["I can read", "I can reading", "I reading can", "I am can read"]}, {"k": "choice", "q": "«He can ___» (писать)", "options": ["write", "writes", "writing", "to writes"]}, {"k": "choice", "q": "Выбери перевод: «Я не пишу»", "options": ["I don't write", "I not write", "I no write", "I am not write"]}, {"k": "choice", "q": "Как ответить «да» на «Can you drive?»", "options": ["Yes, I can.", "Yes, I do.", "Yes, I drive.", "Yes, I am."]}, {"k": "choice", "q": "Что значит «I work»?", "options": ["Я работаю", "Я могу", "Я читаю", "Я не работаю"]}],
        words: [["can", "кэн", "мочь"], ["do", "ду", "делать"], ["work", "уёк", "работать"], ["read", "рид", "читать"], ["write", "райт", "писать"], ["drive", "драйв", "водить"], ["speak", "спик", "говорить"], ["see", "си", "видеть"], ["know", "ноу", "знать"], ["think", "синк", "думать"], ["play", "плэй", "играть"], ["cook", "кук", "готовить (еду)"], ["swim", "суим", "плавать"], ["sing", "син", "петь"], ["don't", "доунт", "не (с глаголом)"], ["can't", "кант", "не могу"]] },
      { id: 'e8', t: 'Глаголы на каждый день', plan: 'get up, go, eat, sleep, listen; мой обычный день',
        theory: {"rule": "Глаголы на каждый день: **get up** (вставать), **go** (идти, ехать), **eat** (есть), **sleep** (спать), **listen** (слушать), **learn** (учить). С **he / she** добавь -s: he **eats**, she **sleeps**. Но go → **goes**.", "ex": [["I get up at six [ай гет ап эт сикс]", "я встаю в шесть"], ["He eats fish [хи итс фиш]", "он ест рыбу"], ["She sleeps [ши слипс]", "она спит"]], "tip": "Глагол go с he / she меняется: he goes [хи гоуз], а не «he gos»."},
        ex: [{"k": "choice", "q": "Что значит sleep [слип]?", "options": ["спать", "есть", "идти", "учить"]}, {"k": "choice", "q": "Выбери перевод: «Я встаю в шесть»", "options": ["I get up at six", "I gets up at six", "I get at six up", "I am get up at six"]}, {"k": "choice", "q": "«She ___ music» (слушает)", "options": ["listens", "listen", "listening", "is listen"]}, {"k": "choice", "q": "«He ___ fish» (ест)", "options": ["eats", "eat", "eating", "is eat"]}, {"k": "choice", "q": "Как правильно?", "options": ["He goes", "He gos", "He go", "He is go"]}],
        words: [["get up", "гет ап", "вставать"], ["go", "гоу", "идти, ехать"], ["eat", "ит", "есть"], ["sleep", "слип", "спать"], ["listen", "лисн", "слушать"], ["learn", "лён", "учить"], ["wake up", "уэйк ап", "просыпаться"], ["wash", "уош", "мыть, умываться"], ["drink", "дринк", "пить"], ["come", "кам", "приходить"], ["take", "тэйк", "брать"], ["give", "гив", "давать"], ["make", "мэйк", "делать, создавать"], ["buy", "бай", "покупать"], ["watch", "уоч", "смотреть"], ["walk", "уок", "гулять, идти пешком"], ["every day", "э́ври дэй", "каждый день"], ["usually", "ю́жуэли", "обычно"]] },
      { id: 'e9', t: 'Вопросы What / Where / Why / How', plan: 'вопросительные слова и порядок слов в вопросе',
        theory: {"rule": "Вопросительные слова: **what** (что), **where** (где), **why** (почему), **how** (как), **when** (когда), **who** (кто). Они стоят **в начале** вопроса: **What is your name?** С глаголом work и другими: **Where do you work?**", "ex": [["What is your name? [уот из ё нэйм]", "как тебя зовут?"], ["Where do you work? [уэа ду ю уёк]", "где ты работаешь?"], ["Why are you tired? [уай а ю та́йэд]", "почему ты устал?"]], "tip": "Порядок такой: вопросительное слово, потом помощник (is, are, do), потом тот, о ком спрашиваем. Where + do + you + work."},
        ex: [{"k": "choice", "q": "Что значит when [уэн]?", "options": ["когда", "где", "кто", "как"]}, {"k": "choice", "q": "«___ are you tired?» (почему)", "options": ["Why", "Who", "Where", "How"]}, {"k": "choice", "q": "Как по-английски «где»?", "options": ["where", "when", "why", "who"]}, {"k": "choice", "q": "Выбери перевод: «Как дела?»", "options": ["How are you?", "What are you?", "Where are you?", "Who are you?"]}, {"k": "choice", "q": "Что значит «Who is he?»", "options": ["Кто он?", "Где он?", "Что он?", "Почему он?"]}],
        words: [["what", "уот", "что"], ["where", "уэа", "где"], ["why", "уай", "почему"], ["how", "хау", "как"], ["when", "уэн", "когда"], ["who", "ху", "кто"], ["which", "уич", "который"], ["whose", "хуз", "чей"], ["how much", "хау мач", "сколько (цена, количество)"], ["how many", "хау мэ́ни", "сколько (штук)"], ["how old", "хау оулд", "сколько лет"], ["because", "бико́з", "потому что"], ["question", "куэ́счен", "вопрос"], ["answer", "а́нсэ", "ответ"]] },
      { id: 'e10', t: 'Фразы для чата с Claude', plan: 'попросить, уточнить, поблагодарить: Can you help me? What does it mean?',
        theory: {"rule": "Фразы для чата с Claude: **Can you help me?** — ты можешь мне помочь? **Explain, please** — объясни, пожалуйста. **What does it mean?** — что это значит? **Again, please** — ещё раз, пожалуйста. **I understand** — я понимаю. **I don't understand** — я не понимаю.", "ex": [["Can you help me? [кэн ю хэлп ми]", "ты можешь мне помочь?"], ["What does it mean? [уот даз ит мин]", "что это значит?"], ["I don't understand [ай доунт андэстэ́нд]", "я не понимаю"]], "tip": "Не понял ответ Claude — пиши: «Explain again, please». Это одна из главных фраз для учёбы."},
        ex: [{"k": "choice", "q": "Что значит example [игза́мпл]?", "options": ["пример", "объяснять", "понимать", "снова"]}, {"k": "choice", "q": "Что значит understand [андэстэ́нд]?", "options": ["понимать", "объяснять", "значить", "помогать"]}, {"k": "choice", "q": "Как сказать «Я не понимаю»?", "options": ["I don't understand", "I not understand", "I understand not", "I am not understand"]}, {"k": "choice", "q": "Выбери перевод: «Объясни, пожалуйста»", "options": ["Explain, please", "Understand, please", "Mean, please", "Example, please"]}, {"k": "choice", "q": "Что значит «What does it mean?»", "options": ["Что это значит?", "Что ты делаешь?", "Где это?", "Ты можешь помочь?"]}],
        words: [["help", "хэлп", "помогать"], ["explain", "иксплэ́йн", "объяснять"], ["mean", "мин", "значить"], ["example", "игза́мпл", "пример"], ["again", "эгэ́н", "снова"], ["understand", "андэстэ́нд", "понимать"], ["word", "уёд", "слово"], ["sentence", "сэ́нтэнс", "предложение"], ["mistake", "мистэ́йк", "ошибка"], ["correct", "кэрэ́кт", "правильный; исправлять"], ["translate", "трэнслэ́йт", "переводить"], ["slowly", "сло́ули", "медленно"], ["simple", "симпл", "простой"], ["check", "чек", "проверять"], ["repeat", "рипи́т", "повторять"], ["I don't understand", "ай доунт андэстэ́нд", "я не понимаю"]] },
      { id: 'e11', t: 'Прошлое: was / were', plan: 'я был, мы были; вчера, на прошлой неделе',
        theory: {"rule": "Прошлое у **to be**: **was** [уоз] — для I / he / she / it, **were** [уё] — для you / we / they. Слова времени: **yesterday** — вчера, **last week** — на прошлой неделе, **ago** — назад.", "ex": [["I was at work yesterday [ай уоз эт уёк йе́стэдэй]", "вчера я был на работе"], ["They were at home [зэй уё эт хоум]", "они были дома"], ["We were tired last week [уи уё та́йэд ласт уик]", "на прошлой неделе мы устали"]], "tip": "Запомни пары: I am → I was, he is → he was, we are → we were."},
        ex: [{"k": "choice", "q": "«I ___ at home yesterday»", "options": ["was", "were", "am", "is"]}, {"k": "choice", "q": "«You ___ tired» (были)", "options": ["were", "was", "are", "is"]}, {"k": "choice", "q": "Что значит yesterday [йе́стэдэй]?", "options": ["вчера", "завтра", "сегодня", "утром"]}, {"k": "choice", "q": "Выбери перевод: «Она была на работе»", "options": ["She was at work", "She were at work", "She is at work", "She am at work"]}, {"k": "choice", "q": "Что значит ago [эго́у]?", "options": ["назад", "вчера", "давно", "потом"]}],
        words: [["was", "уоз", "был"], ["were", "уё", "были"], ["yesterday", "йе́стэдэй", "вчера"], ["last week", "ласт уик", "на прошлой неделе"], ["ago", "эго́у", "назад"], ["tomorrow", "тумо́роу", "завтра"], ["last year", "ласт йиэ", "в прошлом году"], ["then", "зэн", "тогда, потом"], ["before", "бифо́", "до, раньше"], ["after", "а́фтэ", "после"], ["morning", "мо́нинг", "утро"], ["evening", "и́внинг", "вечер"], ["night", "найт", "ночь"]] },
      { id: 'e12', t: 'Первый мини-диалог с Claude', plan: '10 сообщений подряд только на английском', theory: {"rule": "Цель урока: написать Claude **10 сообщений подряд только по-английски**. Начни просто: **Hello! How are you?** Потом: **My name is Alex.** **Can you help me?** Не бойся ошибок: Claude поймёт и мягко поправит.", "ex": [["Hello! How are you? [хэлоу хау а ю]", "привет! как дела?"], ["I am fine, thank you [ай эм файн сэнк ю]", "у меня всё хорошо, спасибо"], ["Can you explain again? [кэн ю иксплэ́йн эгэ́н]", "можешь объяснить ещё раз?"]], "tip": "Пиши короткими фразами из слов, которые уже знаешь. Не знаешь слово — спроси: «How do you say … in English?»"},
        ex: [{"k": "choice", "q": "Claude пишет: «Hello! What is your name?». Лучший ответ:", "options": ["My name is Alex", "Name my Alex", "I am name Alex", "Alex my is"]}, {"k": "choice", "q": "Как попросить Claude объяснить ещё раз?", "options": ["Can you explain again?", "You explain again can?", "Explain can you again?", "Can explain you again?"]}, {"k": "choice", "q": "Ты не понял слово. Что написать?", "options": ["What does it mean?", "What is it ready?", "Where is it?", "Why are you?"]}, {"k": "choice", "q": "Как закончить разговор?", "options": ["Thank you, goodbye", "Please, hello", "Good morning, no", "I am goodbye"]}, {"k": "choice", "q": "Выбери перевод: «Я дома. Мне нравится музыка.»", "options": ["I am at home. I like music.", "I am at home. I likes music.", "I at home. I like music.", "I is at home. I like music."]}],
        words: [["let's", "лэтс", "давай"], ["start", "стат", "начинать"], ["finish", "фи́ниш", "заканчивать"], ["talk", "ток", "разговаривать"], ["about", "эба́ут", "о, про"], ["my day", "май дэй", "мой день"], ["train", "трэйн", "поезд"], ["station", "стэ́йшн", "станция, вокзал"], ["work shift", "уёк шифт", "рабочая смена"], ["tell me", "тэл ми", "расскажи мне"], ["I think", "ай синк", "я думаю"], ["really", "ри́эли", "правда, действительно"]] },
      { id: 'eng-x2', exam: true, t: 'Экзамен: уроки 7–12', covers: ['e7', 'e8', 'e9', 'e10', 'e11', 'e12'], pass: 0.8,
        q: [
          { k: 'choice', s: 'e7', q: 'Выбери перевод: «Я умею водить»', options: ['I can drive', 'I can driving', 'I drive can', 'I am drive'] },
          { k: 'choice', s: 'e7', q: 'Вставь слово: «I ___ work on Sunday» (не работаю)', options: ["don't", "doesn't", 'not', 'am not'] },
          { k: 'input', s: 'e7', q: 'Переведи на английский: «писать»', a: ['write', 'to write'] },
          { k: 'choice', s: 'e7', q: 'Как ответить «да» на «Can you read?»', options: ['Yes, I can.', 'Yes, I do.', 'Yes, I am.', 'Yes, I read.'] },
          { k: 'choice', s: 'e8', q: 'Что значит get up [гет ап]?', options: ['вставать', 'ложиться', 'идти', 'есть'] },
          { k: 'input', s: 'e8', q: 'Переведи на английский: «спать»', a: ['sleep', 'to sleep'] },
          { k: 'choice', s: 'e8', q: 'Выбери перевод: «Я ем рыбу»', options: ['I eat fish', 'I eats fish', 'I am eat fish', 'I fish eat'] },
          { k: 'order', s: 'e8', q: 'Собери фразу: «Я учу английский»', words: ['English', 'learn', 'I'], a: 'I learn English' },
          { k: 'choice', s: 'e9', q: 'Что значит where [уэа]?', options: ['где', 'когда', 'почему', 'кто'] },
          { k: 'choice', s: 'e9', q: 'Вставь слово: «___ is your name?»', options: ['What', 'Where', 'Why', 'When'] },
          { k: 'order', s: 'e9', q: 'Собери вопрос: «Где ты работаешь?»', words: ['you', 'Where', 'work', 'do'], a: 'Where do you work' },
          { k: 'choice', s: 'e9', q: 'Как по-английски «почему»?', options: ['why', 'who', 'how', 'what'] },
          { k: 'choice', s: 'e10', q: 'Что значит «Can you help me?»', options: ['Ты можешь мне помочь?', 'Ты меня понимаешь?', 'Что это значит?', 'Объясни ещё раз'] },
          { k: 'input', s: 'e10', q: 'Переведи на английский: «пример»', a: ['example', 'an example'] },
          { k: 'choice', s: 'e10', q: 'Как попросить: «Объясни ещё раз, пожалуйста»?', options: ['Please explain again', 'Please understand again', 'Please mean again', 'Please example again'] },
          { k: 'choice', s: 'e11', q: 'Вставь слово: «Yesterday I ___ at home»', options: ['was', 'were', 'am', 'is'] },
          { k: 'choice', s: 'e11', q: 'Вставь слово: «They ___ tired yesterday»', options: ['were', 'was', 'are', 'be'] },
          { k: 'choice', s: 'e11', q: 'Выбери перевод: «на прошлой неделе»', options: ['last week', 'next week', 'this week', 'every week'] },
          { k: 'choice', s: 'e12', q: 'Claude пишет: «How are you?». Какой ответ лучше?', options: ['I am fine, thank you', 'I fine thank', 'Me am fine', 'You are fine'] },
          { k: 'order', s: 'e12', q: 'Собери фразу: «Можешь объяснить?»', words: ['you', 'Can', 'explain'], a: 'Can you explain' }
        ] },
      {"id": "e13", "t": "There is / there are: что где есть", "plan": "есть, имеется; один предмет — is, несколько — are; вопрос и отрицание", "theory": {"rule": "**There is** [зэа из] — «есть, имеется», когда предмет один: There is a cat in the room — в комнате кошка. **There are** [зэа а] — когда несколько: There are two cats. Вопрос — меняем местами: Is there a shop near here? Ответ: Yes, there is / No, there isńt. Отрицание: There is no water / There are no shops. Порядок: there is + что + где.", "ex": [["There is a bank near the station [зэа из э бэнк ниэ зэ стэ́йшн]", "рядом с вокзалом есть банк"], ["There are five people in the car [зэа а файв пипл ин зэ ка]", "в машине пять человек"], ["Is there a shop here? — Yes, there is. [из зэа э шоп хиэ — йес зэа из]", "здесь есть магазин? — да"], ["There is no water [зэа из ноу уо́тэ]", "воды нет"]], "tip": "Смотри на то, что идёт после: один предмет — is, несколько — are."}, "ex": [{"k": "choice", "q": "«There ___ a cat on the sofa»", "options": ["is", "are", "am", "be"], "explanation": "Одна кошка — is."}, {"k": "choice", "q": "«There ___ three trains at the station»", "options": ["are", "is", "am", "be"], "explanation": "Три поезда — are."}, {"k": "choice", "q": "Выбери перевод: «В комнате нет окна»", "options": ["There is no window in the room", "There are no window in the room", "No window there is", "Room has not window"]}, {"k": "order", "q": "Собери вопрос: «Здесь есть банк?»", "words": ["Is", "there", "a", "bank", "here?"], "a": "Is there a bank here?", "explanation": "В вопросе is выходит вперёд."}, {"k": "choice", "q": "Что значит people [пипл]?", "options": ["люди", "человек", "народы", "семья"]}, {"k": "order", "q": "Собери: «На столе есть книга»", "words": ["There", "is", "a", "book", "on", "the", "table"], "a": "There is a book on the table"}, {"k": "input", "q": "Вставь одно слово: «There ___ two cups»", "a": ["are"], "explanation": "Две чашки — are."}, {"k": "choice", "q": "Как ответить «да» на «Is there a problem?»", "options": ["Yes, there is.", "Yes, it is.", "Yes, there are.", "Yes, I am."]}, {"k": "choice", "q": "«There are ___ apples in the bag» (несколько)", "options": ["some", "a", "an", "one"], "explanation": "Some — несколько, немного."}, {"k": "choice", "q": "Выбери перевод: «В депо много локомотивов»", "options": ["There are a lot of locomotives in the depot", "There is a lot of locomotive in the depot", "Depot there are many locomotive", "In the depot is many locomotives"]}], "words": [["there is", "зэа из", "есть, имеется (один)"], ["there are", "зэа а", "есть, имеются (несколько)"], ["people", "пипл", "люди"], ["problem", "про́блэм", "проблема"], ["a lot of", "э лот ов", "много"], ["some", "сам", "несколько, немного"], ["any", "э́ни", "какой-нибудь (в вопросах и отрицаниях)"], ["in", "ин", "в"], ["on", "он", "на"], ["next to", "нэкст ту", "рядом с"]]},
      {"id": "e14", "t": "Множественное число", "plan": "-s, -es, -ies и особые формы: men, children, people", "theory": {"rule": "Обычно прибавляем **-s**: cat — cats, train — trains. После **-s, -sh, -ch, -x** — **-es**: bus — buses, watch — watches, box — boxes. Согласная + **y** → **-ies**: city — cities (но day — days: перед y гласная). Особые формы учат наизусть: man — **men**, woman — **women**, child — **children**, person — **people**, foot — **feet**, tooth — **teeth**, mouse — **mice**. Не меняются: sheep, fish. После числительного — всегда множественное: two days, five minutes.", "ex": [["one train — two trains [уан трэйн — ту трэйнз]", "один поезд — два поезда"], ["a bus — buses, a box — boxes [э бас — ба́сиз, э бокс — бо́ксиз]", "после s, sh, ch, x — -es"], ["a city — cities, a day — days [э си́ти — си́тиз, э дэй — дэйз]", "согласная + y → ies; гласная + y → ys"], ["a man — men, a child — children [э мэн — мэн, э чайлд — чи́лдрэн]", "особые формы"]], "tip": "Произноси -s как [з] после звонких (trains — трэйнз) и как [с] после глухих (cats — кэтс)."}, "ex": [{"k": "input", "q": "Множественное от train", "a": ["trains"]}, {"k": "input", "q": "Множественное от bus", "a": ["buses"], "explanation": "После s — -es."}, {"k": "input", "q": "Множественное от city", "a": ["cities"], "explanation": "Согласная + y → ies."}, {"k": "input", "q": "Множественное от child", "a": ["children"], "explanation": "Особая форма."}, {"k": "choice", "q": "Множественное от man", "options": ["men", "mans", "manes", "mens"]}, {"k": "choice", "q": "«I have two ___»", "options": ["cats", "cat", "cates", "cat's"]}, {"k": "choice", "q": "Что значит children [чи'лдрэн]?", "options": ["дети", "ребёнок", "взрослые", "девочки"]}, {"k": "input", "q": "Множественное от day", "a": ["days"], "explanation": "Перед y гласная — просто -s."}, {"k": "choice", "q": "Какое слово не меняется во множественном числе?", "options": ["fish", "dog", "book", "car"]}, {"k": "choice", "q": "Выбери перевод: «пять минут»", "options": ["five minutes", "five minute", "fives minutes", "five minut"]}], "words": [["child", "чайлд", "ребёнок"], ["children", "чи́лдрэн", "дети"], ["man", "мэн", "мужчина"], ["men", "мэн", "мужчины"], ["woman", "ву́мэн", "женщина"], ["women", "уи́мин", "женщины"], ["person", "пё́сн", "человек"], ["foot", "фут", "ступня"], ["feet", "фит", "ступни"], ["tooth", "тус", "зуб"], ["teeth", "тис", "зубы"], ["box", "бокс", "коробка"]]},
      {"id": "e15", "t": "Артикли a, an, the", "plan": "«один из» — a/an, «тот самый» — the, когда артикля нет", "theory": {"rule": "**A / an** [э / эн] — «какой-то, один из»: a train, a cat. **An** — перед гласным звуком: an apple, an hour (h не читается), an engineer. **The** [зэ] — «тот самый, конкретный»: уже известный или единственный: the sun, the station near my house. **Без артикля:** имена и города (Moscow), языки (English), еда и вещества вообще (I like coffee), множественное число в общем смысле (I like cats). Первое упоминание — a, дальше — the: I have a dog. The dog is big.", "ex": [["I have a dog. The dog is big. [ай хэв э дог. зэ дог из биг]", "первый раз — a, потом — the"], ["an apple, an hour, an engineer [эн эпл, эн а́уэ, эн энджини́э]", "перед гласным звуком — an"], ["the sun, the moon, the station [зэ сан, зэ мун, зэ стэ́йшн]", "единственный в своём роде или конкретный"], ["I like coffee. I like cats. [ай лайк ко́фи. ай лайк кэтс]", "вообще — без артикля"]], "tip": "Можно сказать «один из»? — a/an. «Тот самый»? — the. Ни то ни другое — без артикля."}, "ex": [{"k": "choice", "q": "«I have ___ dog»", "options": ["a", "an", "the", "— (без артикля)"], "explanation": "Первое упоминание, один из — a."}, {"k": "choice", "q": "«I ate ___ apple»", "options": ["an", "a", "the", "— (без артикля)"], "explanation": "Перед гласным звуком — an."}, {"k": "choice", "q": "«I have a cat. ___ cat is black.»", "options": ["The", "A", "An", "— (без артикля)"], "explanation": "Уже известная кошка — the."}, {"k": "choice", "q": "«I like ___ coffee» (вообще)", "options": ["— (без артикля)", "a", "an", "the"], "explanation": "Вещество вообще — без артикля."}, {"k": "choice", "q": "«___ sun is hot»", "options": ["The", "A", "An", "— (без артикля)"], "explanation": "Солнце одно — the."}, {"k": "choice", "q": "Перед каким словом нужен an?", "options": ["hour", "house", "dog", "train"], "explanation": "В hour h не читается — начинается с гласного звука."}, {"k": "choice", "q": "«She lives in ___ Moscow»", "options": ["— (без артикля)", "the", "a", "an"], "explanation": "Города — без артикля."}, {"k": "input", "q": "Вставь артикль: «This is ___ orange»", "a": ["an"]}, {"k": "choice", "q": "«He is ___ engineer»", "options": ["an", "a", "the", "— (без артикля)"], "explanation": "Профессия — a/an; engineer начинается с гласного."}, {"k": "choice", "q": "Выбери перевод: «Поезд опаздывает» (тот самый, который мы ждём)", "options": ["The train is late", "A train is late", "An train is late", "Train late is"]}], "words": [["a", "э", "(какой-то) один"], ["an", "эн", "один (перед гласным звуком)"], ["the", "зэ", "тот самый, этот"], ["umbrella", "амбрэ́ла", "зонт"], ["orange", "о́риндж", "апельсин"], ["elephant", "э́лифэнт", "слон"], ["ice cream", "айс крим", "мороженое"], ["language", "лэ́нгуидж", "язык (речь)"], ["English", "и́нглиш", "английский"], ["Moscow", "мо́скоу", "Москва"], ["Saint Petersburg", "сэйнт пи́тэзбёг", "Санкт-Петербург"]]},
      {"id": "e16", "t": "Сейчас: I am working", "plan": "am / is / are + глагол с -ing; правила -ing; разница с «вообще»", "theory": {"rule": "Действие **прямо сейчас**: **am / is / are + глагол-ing**. I am working — я работаю (сейчас). He is sleeping. They are eating. Вопрос: Are you working? Отрицание: I am not working, He isńt sleeping. Правила -ing: write → writing (убираем e), sit → sitting (удваиваем согласную после краткого гласного), go → going. Слова-сигналы: now, at the moment, look!, listen! Сравни: I work — вообще, каждый день; I am working — в эту минуту.", "ex": [["I am working now [ай эм уё́кинг нау]", "я работаю сейчас"], ["She is reading a book [ши из ри́дин э бук]", "она читает книгу (сейчас)"], ["Are you listening? — Yes, I am. [а ю ли́снин — йес ай эм]", "ты слушаешь? — да"], ["They areńt sleeping [зэй ант сли́пин]", "они не спят"]], "tip": "Два вопроса: когда? прямо сейчас → -ing. Есть ли am/is/are? Без них -ing не работает."}, "ex": [{"k": "choice", "q": "«I ___ working now»", "options": ["am", "is", "are", "be"]}, {"k": "choice", "q": "«She ___ reading»", "options": ["is", "are", "am", "be"]}, {"k": "input", "q": "Добавь -ing: write", "a": ["writing"], "explanation": "Убираем e."}, {"k": "input", "q": "Добавь -ing: sit", "a": ["sitting"], "explanation": "Удваиваем t."}, {"k": "choice", "q": "Выбери перевод: «Они едят» (сейчас)", "options": ["They are eating", "They eating", "They is eating", "They eat now are"]}, {"k": "order", "q": "Собери вопрос: «Ты работаешь?» (сейчас)", "words": ["Are", "you", "working?"], "a": "Are you working?"}, {"k": "choice", "q": "«He ___ sleeping» (не спит)", "options": ["isn't", "aren't", "don't", "not"]}, {"k": "choice", "q": "Что значит wait [уэйт]?", "options": ["ждать", "бежать", "сидеть", "звонить"]}, {"k": "choice", "q": "В чём разница: «I work» и «I am working»?", "options": ["work — вообще, am working — прямо сейчас", "разницы нет", "work — сейчас, am working — вообще", "am working — в прошлом"]}, {"k": "input", "q": "Переведи: «Я жду» (сейчас)", "a": ["I am waiting", "I'm waiting"]}], "words": [["at the moment", "эт зэ мо́умэнт", "в данный момент"], ["look", "лук", "смотри; смотреть"], ["wait", "уэйт", "ждать"], ["run", "ран", "бегать"], ["sit", "сит", "сидеть"], ["stand", "стэнд", "стоять"], ["rest", "рэст", "отдыхать"], ["call", "кол", "звонить"], ["still", "стил", "всё ещё"], ["right now", "райт нау", "прямо сейчас"]]},
      {"id": "e17", "t": "Прошлое: worked, played — правильные глаголы", "plan": "-ed, did в вопросе и отрицании, слова прошлого", "theory": {"rule": "Прошедшее время у большинства глаголов — **-ed**: work → worked, play → played, like → liked (e уже есть), stop → stopped (удвоение), study → studied. Форма одна для всех: I worked, he worked, we worked. **Вопрос и отрицание** — через **did** (прошлое от do), а глагол возвращается в начальную форму: Did you work? I didńt work. Короткий ответ: Yes, I did / No, I didńt. Слова: yesterday, last week, two days ago, in 2020.", "ex": [["I worked yesterday [ай уёкт йе́стэдэй]", "я работал вчера"], ["She liked the film [ши лайкт зэ филм]", "ей понравился фильм"], ["Did you call him? — Yes, I did. [дид ю кол хим — йес ай дид]", "ты звонил ему? — да"], ["We didńt play [уи диднт плэй]", "мы не играли"]], "tip": "После did глагол без -ed: Did you worked ✗ — Did you work ✓."}, "ex": [{"k": "input", "q": "Прошедшее от work", "a": ["worked"]}, {"k": "input", "q": "Прошедшее от play", "a": ["played"]}, {"k": "input", "q": "Прошедшее от stop", "a": ["stopped"], "explanation": "Удваиваем p."}, {"k": "input", "q": "Прошедшее от study", "a": ["studied"], "explanation": "y → ied."}, {"k": "choice", "q": "«I ___ work yesterday» (не работал)", "options": ["didn't", "don't", "wasn't", "not"]}, {"k": "choice", "q": "«___ you call him?» (звонил?)", "options": ["Did", "Do", "Was", "Are"]}, {"k": "choice", "q": "Как ответить «да» на «Did you work?»", "options": ["Yes, I did.", "Yes, I do.", "Yes, I was.", "Yes, I worked did."]}, {"k": "choice", "q": "Выбери верное", "options": ["Did you open the door?", "Did you opened the door?", "Do you opened the door?", "Did you opening the door?"], "explanation": "После did — начальная форма."}, {"k": "choice", "q": "Что значит visit [ви'зит]?", "options": ["посещать", "видеть", "звонить", "закрывать"]}, {"k": "order", "q": "Собери: «Мы остановились на станции»", "words": ["We", "stopped", "at", "the", "station"], "a": "We stopped at the station"}], "words": [["did", "дид", "делал (прошлое от do)"], ["didn't", "диднт", "не (в прошлом)"], ["worked", "уёкт", "работал"], ["played", "плэйд", "играл"], ["stopped", "стопт", "остановился"], ["study", "ста́ди", "учиться, изучать"], ["studied", "ста́дид", "учился"], ["open", "о́упэн", "открывать"], ["close", "клоуз", "закрывать"], ["visit", "ви́зит", "посещать"], ["film", "филм", "фильм"]]},
      {"id": "e18", "t": "Неправильные глаголы: went, saw, took", "plan": "20 самых частых пар; did в вопросе и отрицании", "theory": {"rule": "Самые частые глаголы в прошедшем меняются не по правилу — их учат парами: go → **went**, see → **saw**, take → **took**, have → **had**, do → **did**, come → **came**, get → **got**, give → **gave**, make → **made**, say → **said**, know → **knew**, read → **read** [рэд], write → **wrote**, eat → **ate**, drink → **drank**, sleep → **slept**, buy → **bought**, think → **thought**, drive → **drove**. В вопросе и отрицании — снова did + начальная форма: Did you go? I didńt see.", "ex": [["I went to work yesterday [ай уэнт ту уёк йе́стэдэй]", "вчера я ходил на работу"], ["She saw a film [ши со э филм]", "она посмотрела фильм"], ["We had a good day [уи хэд э гуд дэй]", "у нас был хороший день"], ["Did he come? — No, he didńt. [дид хи кам — ноу хи диднт]", "он пришёл? — нет"]], "tip": "Учи по 5 пар в день и сразу используй в сообщениях Claude: I went, I saw, I took."}, "ex": [{"k": "input", "q": "Прошедшее от go", "a": ["went"]}, {"k": "input", "q": "Прошедшее от see", "a": ["saw"]}, {"k": "input", "q": "Прошедшее от take", "a": ["took"]}, {"k": "input", "q": "Прошедшее от have", "a": ["had"]}, {"k": "choice", "q": "Прошедшее от buy", "options": ["bought", "buyed", "bught", "boughted"]}, {"k": "choice", "q": "«I ___ a letter yesterday» (написал)", "options": ["wrote", "writed", "write", "written"]}, {"k": "choice", "q": "Что значит said [сэд]?", "options": ["сказал", "видел", "сидел", "послал"]}, {"k": "choice", "q": "Выбери верное", "options": ["Did you see him?", "Did you saw him?", "Do you saw him?", "Did you seen him?"], "explanation": "После did — начальная форма see."}, {"k": "choice", "q": "Выбери перевод: «Я спал восемь часов»", "options": ["I slept eight hours", "I sleeped eight hours", "I sleep eight hours ago", "I was sleep eight hours"]}, {"k": "order", "q": "Собери: «Она купила билет»", "words": ["She", "bought", "a", "ticket"], "a": "She bought a ticket"}], "words": [["went", "уэнт", "ходил, ездил"], ["saw", "со", "видел"], ["took", "тук", "взял"], ["had", "хэд", "имел; был (у меня)"], ["came", "кэйм", "пришёл"], ["got", "гот", "получил"], ["gave", "гэйв", "дал"], ["made", "мэйд", "сделал"], ["said", "сэд", "сказал"], ["knew", "нью", "знал"], ["wrote", "роут", "написал"], ["ate", "эт", "ел"], ["drank", "дрэнк", "пил"], ["slept", "слэпт", "спал"], ["bought", "бот", "купил"], ["thought", "сот", "думал"], ["drove", "дроув", "вёл (машину, поезд)"]]},
      {"id": "eng-x3", "exam": true, "t": "Экзамен: уроки 13–18", "covers": ["e13", "e14", "e15", "e16", "e17", "e18"], "pass": 0.8, "q": [{"k": "choice", "q": "«There ___ a shop near here»", "options": ["is", "are", "am", "be"], "s": "e13"}, {"k": "choice", "q": "Выбери перевод: «Здесь нет воды»", "options": ["There is no water here", "There are no water here", "Here is not water", "No water here is"], "s": "e13"}, {"k": "order", "q": "Собери: «Есть две кошки»", "words": ["There", "are", "two", "cats"], "a": "There are two cats", "s": "e13"}, {"k": "input", "q": "Множественное от box", "a": ["boxes"], "s": "e14"}, {"k": "input", "q": "Множественное от woman", "a": ["women"], "s": "e14"}, {"k": "choice", "q": "Множественное от foot", "options": ["feet", "foots", "feets", "footes"], "s": "e14"}, {"k": "choice", "q": "«She has ___ umbrella»", "options": ["an", "a", "the", "— (без артикля)"], "s": "e15"}, {"k": "choice", "q": "«I like ___ music» (вообще)", "options": ["— (без артикля)", "the", "a", "an"], "s": "e15"}, {"k": "choice", "q": "«Look at ___ moon!»", "options": ["the", "a", "an", "— (без артикля)"], "s": "e15"}, {"k": "choice", "q": "«They ___ eating now»", "options": ["are", "is", "am", "be"], "s": "e16"}, {"k": "input", "q": "Добавь -ing: run", "a": ["running"], "s": "e16"}, {"k": "choice", "q": "Выбери перевод: «Он сейчас не работает»", "options": ["He isn't working now", "He don't work now", "He not working now", "He isn't work now"], "s": "e16"}, {"k": "input", "q": "Прошедшее от visit", "a": ["visited"], "s": "e17"}, {"k": "choice", "q": "«___ you play yesterday?»", "options": ["Did", "Do", "Were", "Was"], "s": "e17"}, {"k": "choice", "q": "«We ___ open the door» (не открыли)", "options": ["didn't", "don't", "wasn't", "weren't"], "s": "e17"}, {"k": "input", "q": "Прошедшее от come", "a": ["came"], "s": "e18"}, {"k": "input", "q": "Прошедшее от make", "a": ["made"], "s": "e18"}, {"k": "choice", "q": "Прошедшее от think", "options": ["thought", "thinked", "thunk", "thinking"], "s": "e18"}, {"k": "choice", "q": "Выбери верное", "options": ["I ate an apple", "I eated an apple", "I eat an apple yesterday did", "I was eat an apple"], "s": "e18"}, {"k": "input", "q": "Прошедшее от drink", "a": ["drank"], "s": "e18"}]},
      {"id": "e19", "t": "Будущее: will и going to", "plan": "решение сейчас — will, план — going to; won't; слова будущего", "theory": {"rule": "**Will** [уил] + глагол — решение в момент речи, обещание, прогноз: I will call you. It will rain. Сокращения: Íll, yoúll, héll. Отрицание: **wońt** [уоунт]. Вопрос: Will you come? — Yes, I will. **Going to** [го́уин ту] — заранее принятый план: I am going to learn English. Слова будущего: tomorrow, next week, in an hour. Will одинаково для всех лиц.", "ex": [["I will call you tomorrow [ай уил кол ю тумо́роу]", "я позвоню тебе завтра"], ["It will be cold [ит уил би коулд]", "будет холодно"], ["I am going to buy a car [ай эм го́уин ту бай э ка]", "я собираюсь купить машину"], ["Will you help me? — Yes, I will. [уил ю хэлп ми — йес ай уил]", "ты поможешь? — да"]], "tip": "Решил прямо сейчас — will. Запланировал заранее — going to."}, "ex": [{"k": "choice", "q": "«I ___ call you tomorrow»", "options": ["will", "am", "going", "do"]}, {"k": "choice", "q": "«I am ___ to learn English» (собираюсь)", "options": ["going", "will", "go", "went"]}, {"k": "choice", "q": "Отрицание от will", "options": ["won't", "willn't", "don't will", "not will"]}, {"k": "choice", "q": "Выбери перевод: «Будет холодно»", "options": ["It will be cold", "It will cold", "It is will cold", "It going cold"], "explanation": "После will — be."}, {"k": "input", "q": "Сокращение от «I will»", "a": ["I'll"]}, {"k": "order", "q": "Собери вопрос: «Ты придёшь?»", "words": ["Will", "you", "come?"], "a": "Will you come?"}, {"k": "choice", "q": "Что значит next week [нэкст уик]?", "options": ["на следующей неделе", "на прошлой неделе", "каждую неделю", "через две недели"]}, {"k": "choice", "q": "«Я собираюсь купить билет» — какая форма?", "options": ["I am going to buy a ticket", "I will going to buy a ticket", "I going buy a ticket", "I buy going a ticket"]}, {"k": "choice", "q": "Решил только что: «Хорошо, я помогу»", "options": ["OK, I will help", "OK, I am going to help", "OK, I helped", "OK, I helping"], "explanation": "Решение в момент речи — will."}, {"k": "input", "q": "Переведи: «Я не буду ждать»", "a": ["I won't wait", "I will not wait"]}], "words": [["will", "уил", "буду (будущее)"], ["won't", "уоунт", "не буду"], ["going to", "го́уин ту", "собираюсь"], ["next week", "нэкст уик", "на следующей неделе"], ["next year", "нэкст йиэ", "в следующем году"], ["in an hour", "ин эн а́уэ", "через час"], ["promise", "про́мис", "обещать"], ["plan", "плэн", "план; планировать"], ["future", "фью́чэ", "будущее"], ["probably", "про́бэбли", "вероятно"]]},
      {"id": "e20", "t": "Должен: must, should, have to", "plan": "обязан — must, стоит — should, приходится — have to; mustn't и don't have to", "theory": {"rule": "**Must** [маст] — должен (правило, обязанность, твёрдое решение): I must go. **Mustńt** — нельзя: You mustńt smoke here. **Should** [шуд] — стоит, следует (совет): You should sleep more. **Have to / has to** [хэв ту] — приходится, вынужден (так сложились обстоятельства): I have to work on Sunday. He has to get up early. После must и should глагол без to, после have — с to. **Dońt have to** — не обязан (а не «нельзя»): You dońt have to come.", "ex": [["I must go now [ай маст гоу нау]", "мне нужно идти"], ["You should rest [ю шуд рэст]", "тебе стоит отдохнуть"], ["I have to work tonight [ай хэв ту уёк туна́йт]", "мне приходится работать сегодня вечером"], ["You mustńt open this door [ю маснт о́упэн зис до]", "эту дверь открывать нельзя"]], "tip": "Нельзя — mustn't. Не обязан — don't have to. Это разные вещи."}, "ex": [{"k": "choice", "q": "«You ___ sleep more» (совет)", "options": ["should", "must", "have", "can't"]}, {"k": "choice", "q": "«I ___ to work on Sunday» (приходится)", "options": ["have", "must", "should", "am"]}, {"k": "choice", "q": "«You ___ smoke here» (нельзя)", "options": ["mustn't", "don't have to", "shouldn't", "can"]}, {"k": "choice", "q": "«He ___ to get up early»", "options": ["has", "have", "must", "should"], "explanation": "Он — has to."}, {"k": "choice", "q": "После какого слова глагол с to?", "options": ["have", "must", "should", "can"]}, {"k": "choice", "q": "Что значит don't have to?", "options": ["не обязан", "нельзя", "не умею", "не хочу"]}, {"k": "choice", "q": "Выбери перевод: «Мне нужно идти»", "options": ["I must go", "I must to go", "I should going", "I have go"]}, {"k": "input", "q": "Переведи: «Тебе стоит отдохнуть»", "a": ["You should rest"]}, {"k": "choice", "q": "Что значит advice [эдва'йс]?", "options": ["совет", "приказ", "правило", "ответ"]}, {"k": "order", "q": "Собери: «Мне приходится работать сегодня вечером»", "words": ["I", "have", "to", "work", "tonight"], "a": "I have to work tonight"}], "words": [["must", "маст", "должен"], ["mustn't", "маснт", "нельзя"], ["should", "шуд", "следует, стоит"], ["have to", "хэв ту", "приходится, вынужден"], ["has to", "хэз ту", "приходится (он, она)"], ["don't have to", "доунт хэв ту", "не обязан"], ["smoke", "смоук", "курить"], ["tonight", "туна́йт", "сегодня вечером"], ["careful", "кэ́эфул", "осторожный"], ["advice", "эдва́йс", "совет"]]},
      {"id": "e21", "t": "Предлоги in, on, at: место и время", "plan": "внутри — in, на поверхности — on, в точке — at; месяцы, дни, часы", "theory": {"rule": "**Место:** **in** — внутри (in the room, in Moscow, in the car), **on** — на поверхности (on the table, on the wall; и on the bus, on the train — «в автобусе, в поезде»), **at** — точка, «у», мероприятие (at the station, at work, at home, at school). **Время:** **in** — месяцы, годы, части дня (in May, in 2026, in the morning), **on** — дни и даты (on Monday, on 5 March), **at** — часы и точки (at 7 óclock, at night, at the weekend). Запомни: at night, но in the morning.", "ex": [["The keys are in the bag [зэ киз а ин зэ бэг]", "ключи в сумке"], ["The book is on the table [зэ бук из он зэ тэйбл]", "книга на столе"], ["I am at work [ай эм эт уёк]", "я на работе"], ["on Monday, in May, at 7 óclock [он ма́ндэй, ин мэй, эт сэвн окло́к]", "день — on, месяц — in, час — at"]], "tip": "Большое пространство — in, поверхность — on, точка на карте или на часах — at."}, "ex": [{"k": "choice", "q": "«The keys are ___ the bag»", "options": ["in", "on", "at", "under"]}, {"k": "choice", "q": "«The book is ___ the table»", "options": ["on", "in", "at", "behind"]}, {"k": "choice", "q": "«I am ___ work»", "options": ["at", "in", "on", "to"]}, {"k": "choice", "q": "«___ Monday»", "options": ["on", "in", "at", "by"], "explanation": "Дни — on."}, {"k": "choice", "q": "«___ May»", "options": ["in", "on", "at", "by"], "explanation": "Месяцы — in."}, {"k": "choice", "q": "«___ 7 o'clock»", "options": ["at", "in", "on", "to"], "explanation": "Часы — at."}, {"k": "choice", "q": "«___ the morning»", "options": ["in", "at", "on", "by"]}, {"k": "choice", "q": "«___ night»", "options": ["at", "in", "on", "by"], "explanation": "Исключение: at night."}, {"k": "input", "q": "Вставь предлог: «She is ___ the train» (едет в поезде)", "a": ["on"], "explanation": "В транспорте, где можно ходить, — on: on the train, on the bus."}, {"k": "choice", "q": "Что значит between [битуи'н]?", "options": ["между", "под", "за", "перед"]}], "words": [["at", "эт", "в, у, на (точка)"], ["inside", "инса́йд", "внутри"], ["under", "а́ндэ", "под"], ["behind", "биха́йнд", "за, позади"], ["between", "битуи́н", "между"], ["in front of", "ин франт ов", "перед"], ["in the morning", "ин зэ мо́нинг", "утром"], ["at night", "эт найт", "ночью"], ["at the weekend", "эт зэ уи́кэнд", "в выходные"], ["on Monday", "он ма́ндэй", "в понедельник"]]},
      {"id": "e22", "t": "Сравнение: bigger, the best", "plan": "-er / the -est, more / the most, better, worse, than", "theory": {"rule": "Короткие прилагательные: **-er** — сравнение, **the -est** — превосходная: big — bigger — the biggest, fast — faster — the fastest, easy — easier — the easiest. Длинные (от трёх слогов, и большинство из двух): **more / the most**: interesting — more interesting — the most interesting. Особые: good — **better** — **the best**, bad — **worse** — **the worst**, far — farther — the farthest. «Чем» — **than** [зэн]: My car is faster than yours. «Такой же, как» — **as … as**: as big as a house.", "ex": [["This train is faster than that one [зис трэйн из фа́стэ зэн зэт уан]", "этот поезд быстрее того"], ["It is the biggest station in the city [ит из зэ би́гист стэ́йшн ин зэ си́ти]", "это самый большой вокзал в городе"], ["English is more difficult than I thought [и́нглиш из мо ди́фикэлт зэн ай сот]", "английский труднее, чем я думал"], ["This is the best day [зис из зэ бэст дэй]", "это лучший день"]], "tip": "Один-два слога — -er / -est. Три и больше — more / most. good и bad — учить отдельно."}, "ex": [{"k": "input", "q": "Сравнительная от big", "a": ["bigger"], "explanation": "Удваиваем g."}, {"k": "input", "q": "Сравнительная от good", "a": ["better"]}, {"k": "input", "q": "Превосходная от fast (с the)", "a": ["the fastest", "fastest"]}, {"k": "choice", "q": "Сравнительная от interesting", "options": ["more interesting", "interestinger", "most interesting", "interestingest"]}, {"k": "choice", "q": "«My car is faster ___ yours»", "options": ["than", "then", "that", "as"]}, {"k": "choice", "q": "Превосходная от bad", "options": ["the worst", "the baddest", "the most bad", "the badest"]}, {"k": "choice", "q": "Выбери перевод: «Это самый лёгкий урок»", "options": ["This is the easiest lesson", "This is the most easy lesson", "This is easier lesson", "This is easiest lesson"]}, {"k": "input", "q": "Сравнительная от easy", "a": ["easier"], "explanation": "y → ier."}, {"k": "choice", "q": "Что значит than [зэн]?", "options": ["чем", "тогда", "что", "как"]}, {"k": "order", "q": "Собери: «Эта книга лучше, чем фильм»", "words": ["This", "book", "is", "better", "than", "the", "film"], "a": "This book is better than the film"}], "words": [["bigger", "би́гэ", "больше"], ["the biggest", "зэ би́гист", "самый большой"], ["better", "бэ́тэ", "лучше"], ["the best", "зэ бэст", "лучший"], ["worse", "уёс", "хуже"], ["the worst", "зэ уёст", "худший"], ["than", "зэн", "чем"], ["more", "мо", "более; больше"], ["the most", "зэ моуст", "самый"], ["as … as", "эз … эз", "такой же, как"]]},
      {"id": "e23", "t": "Вопросы в прошедшем и будущем", "plan": "вопросительное слово + did/will + подлежащее + глагол; короткие ответы", "theory": {"rule": "Схема: **вопросительное слово + вспомогательный глагол + подлежащее + глагол**. Прошедшее: **Did** you see him? **Where did** you go? **What did** she say? Будущее: **Will** you come? **When will** you call? С to be вспомогательный не нужен: **Were** you at home? **Was** it cold? Короткие ответы повторяют вспомогательный: Yes, I did / No, I wońt / Yes, I was.", "ex": [["Where did you go yesterday? [уэа дид ю гоу йе́стэдэй]", "куда ты ходил вчера?"], ["What did she say? [уот дид ши сэй]", "что она сказала?"], ["When will you call me? [уэн уил ю кол ми]", "когда ты мне позвонишь?"], ["Were you at work? — Yes, I was. [уё ю эт уёк — йес ай уоз]", "ты был на работе? — да"]], "tip": "Нашёл did или will — глагол после подлежащего ставь в начальную форму."}, "ex": [{"k": "order", "q": "Собери: «Куда ты ходил?»", "words": ["Where", "did", "you", "go?"], "a": "Where did you go?"}, {"k": "choice", "q": "«What ___ she say?»", "options": ["did", "do", "was", "will"]}, {"k": "choice", "q": "«When ___ you call me?» (будущее)", "options": ["will", "did", "do", "are"]}, {"k": "choice", "q": "«___ you at home yesterday?»", "options": ["Were", "Did", "Was", "Are"], "explanation": "С to be — were, без did."}, {"k": "choice", "q": "Как ответить «нет» на «Will you come?»", "options": ["No, I won't.", "No, I don't.", "No, I didn't.", "No, I'm not."]}, {"k": "choice", "q": "Выбери верное", "options": ["Did you like the film?", "Did you liked the film?", "Do you liked the film?", "Did you like the film yesterday did?"]}, {"k": "choice", "q": "Что значит how long [хау лонг]?", "options": ["как долго", "как далеко", "какой длины", "как часто"]}, {"k": "order", "q": "Собери: «Что ты будешь делать завтра?»", "words": ["What", "will", "you", "do", "tomorrow?"], "a": "What will you do tomorrow?"}, {"k": "choice", "q": "«___ it cold yesterday?»", "options": ["Was", "Were", "Did", "Is"]}, {"k": "input", "q": "Переведи: «Во сколько ты встал?» (What time …)", "a": ["What time did you get up?", "What time did you get up"]}], "words": [["why did", "уай дид", "почему (в прошлом)"], ["how long", "хау лонг", "как долго"], ["how often", "хау офн", "как часто"], ["what time", "уот тайм", "во сколько"], ["where did you go", "уэа дид ю гоу", "куда ты ходил"], ["did you like it", "дид ю лайк ит", "тебе понравилось"], ["what will you do", "уот уил ю ду", "что ты будешь делать"], ["trip", "трип", "поездка"], ["yesterday evening", "йе́стэдэй и́внинг", "вчера вечером"], ["last night", "ласт найт", "вчера вечером, прошлой ночью"]]},
      {"id": "e24", "t": "Диалог с Claude на 20 сообщений", "plan": "применить всё из уроков 13–23 в живом разговоре", "theory": {"rule": "Итог блока: разговор с Claude на **20 сообщений** только по-английски. Используй всё: there is, множественное число, артикли, am doing, did/went, will, must/should, in/on/at, better than. Схема сообщения: 1–2 простых предложения + один вопрос Claude. Не знаешь слово — спроси: How do you say … in English? Ошибся — попроси: Correct my mistakes. План: сначала расскажи про вчерашний день, потом про планы на завтра, потом сравни две вещи.", "ex": [["Yesterday I went to work. I drove a freight train. What did you do? [йе́стэдэй ай уэнт ту уёк. ай дроув э фрэйт трэйн. уот дид ю ду]", "вчера я ходил на работу, вёл грузовой поезд. А ты что делал?"], ["Tomorrow I am going to rest. I will write a song. [тумо́роу ай эм го́уин ту рэст. ай уил райт э сонг]", "завтра собираюсь отдыхать, напишу песню"], ["Winter is colder than autumn, but I like it more. [уи́нтэ из ко́улдэ зэн о́тэм бат ай лайк ит мо]", "зима холоднее осени, но мне она нравится больше"], ["There are a lot of books in my room. Do you like reading? [зэа а э лот ов букс ин май рум. ду ю лайк ри́дин]", "в моей комнате много книг. Ты любишь читать?"]], "tip": "Критерий: 20 сообщений, в каждом хотя бы одна форма из уроков 13–23, и ты понял ответы Claude без переводчика."}, "ex": [{"k": "choice", "q": "«Yesterday I ___ to work»", "options": ["went", "go", "will go", "am going"]}, {"k": "choice", "q": "«Tomorrow I ___ rest»", "options": ["will", "did", "am", "was"]}, {"k": "choice", "q": "«There ___ a lot of books in my room»", "options": ["are", "is", "am", "be"]}, {"k": "choice", "q": "«Winter is ___ than autumn»", "options": ["colder", "more cold", "coldest", "cold"]}, {"k": "choice", "q": "«I ___ a letter now»", "options": ["am writing", "write", "wrote", "will write"]}, {"k": "choice", "q": "«You ___ sleep more» (совет)", "options": ["should", "must to", "have", "will to"]}, {"k": "choice", "q": "«I was ___ work ___ Monday»", "options": ["at, on", "in, in", "on, at", "at, in"]}, {"k": "choice", "q": "Как спросить Claude, как сказать слово по-английски?", "options": ["How do you say … in English?", "How say … English?", "What is … English say?", "Say … in English how?"]}, {"k": "choice", "q": "Что значит favourite [фэ'йвэрит]?", "options": ["любимый", "известный", "первый", "странный"]}, {"k": "order", "q": "Собери: «Что ты делал вчера?»", "words": ["What", "did", "you", "do", "yesterday?"], "a": "What did you do yesterday?"}], "words": [["conversation", "конвэсэ́йшн", "разговор"], ["message", "мэ́сидж", "сообщение"], ["story", "сто́ри", "история, рассказ"], ["weekend plans", "уи́кэнд плэнз", "планы на выходные"], ["favourite", "фэ́йвэрит", "любимый"], ["hobby", "хо́би", "хобби"], ["opinion", "эпи́ньэн", "мнение"], ["in my opinion", "ин май эпи́ньэн", "по-моему"], ["That's interesting", "зэтс и́нтрэстинг", "Это интересно"], ["by the way", "бай зэ уэй", "кстати"]]},
      {"id": "eng-x4", "exam": true, "t": "Экзамен: уроки 19–24", "covers": ["e19", "e20", "e21", "e22", "e23", "e24"], "pass": 0.8, "q": [{"k": "choice", "q": "«I ___ help you» (решил сейчас)", "options": ["will", "am going to", "did", "am"], "s": "e19"}, {"k": "choice", "q": "Сокращение «will not»", "options": ["won't", "willn't", "wo'nt", "not'll"], "s": "e19"}, {"k": "input", "q": "Переведи: «Я позвоню тебе»", "a": ["I will call you", "I'll call you"], "s": "e19"}, {"k": "choice", "q": "Что значит probably [про́бэбли]?", "options": ["вероятно", "точно", "никогда", "быстро"], "s": "e19"}, {"k": "choice", "q": "«You ___ be careful» (следует)", "options": ["should", "must to", "have", "will to"], "s": "e20"}, {"k": "choice", "q": "«I ___ to get up at 5» (приходится)", "options": ["have", "must", "should", "am"], "s": "e20"}, {"k": "choice", "q": "«You ___ smoke in the depot» (нельзя)", "options": ["mustn't", "don't have to", "shouldn't", "can"], "s": "e20"}, {"k": "choice", "q": "«The cat is ___ the sofa» (на диване)", "options": ["on", "in", "at", "under"], "s": "e21"}, {"k": "choice", "q": "«I was born ___ 1987»", "options": ["in", "on", "at", "by"], "s": "e21"}, {"k": "choice", "q": "«See you ___ Friday»", "options": ["on", "in", "at", "by"], "s": "e21"}, {"k": "input", "q": "Сравнительная от bad", "a": ["worse"], "s": "e22"}, {"k": "choice", "q": "«This is ___ station in Russia» (самый большой)", "options": ["the biggest", "the bigger", "biggest", "most big"], "s": "e22"}, {"k": "choice", "q": "«Tea is ___ than coffee» (дешевле)", "options": ["cheaper", "more cheap", "cheapest", "the cheaper"], "s": "e22"}, {"k": "order", "q": "Собери: «Что ты видел?»", "words": ["What", "did", "you", "see?"], "a": "What did you see?", "s": "e23"}, {"k": "choice", "q": "«___ you at the station yesterday?»", "options": ["Were", "Did", "Was", "Are"], "s": "e23"}, {"k": "choice", "q": "«When ___ you come?» (будущее)", "options": ["will", "did", "do", "were"], "s": "e23"}, {"k": "choice", "q": "«Yesterday I ___ a film»", "options": ["saw", "see", "will see", "am seeing"], "s": "e24"}, {"k": "choice", "q": "«There ___ five trains at the depot»", "options": ["are", "is", "am", "be"], "s": "e24"}, {"k": "choice", "q": "«I ___ going to write a song tomorrow»", "options": ["am", "will", "is", "do"], "s": "e24"}, {"k": "choice", "q": "«Moscow is ___ than Saint Petersburg»", "options": ["bigger", "more big", "the biggest", "big"], "s": "e24"}]}
    ]
  },
  {
    id: 'rus', cat: 'rus', name: 'Основы русского языка', type: 'path',
    goal: 'Грамотная речь и письмо', unit: 'правило',
    resources: [{ href: 'https://github.com/talkstream/ru-text', label: 'Правила 11–20 опираются на ru-text (лицензия MIT)' }, { href: 'https://github.com/kakaxy4-wq/umedu', label: 'Часть заданий и правила 21–30 — из umedu (CC BY-SA 4.0), адаптированы' }],
    prompt: 'Проведи урок русского языка №{n}: «{t}». Объясни правило простыми словами: {plan}. Дай 5 примеров, потом 5 упражнений и проверь мои ответы. Отмечай мои ошибки и в моих обычных сообщениях.',
    steps: [
      { id: 'r1', t: '-тся и -ться', plan: 'вопрос «что делает?» → -тся, «что делать?» → -ться', theory: {"rule": "Задай вопрос к глаголу. **Что делает? Что сделает?** — пиши **-тся**. **Что делать? Что сделать?** — пиши **-ться**.", "ex": [["Он учится", "что делает?"], ["Нужно учиться", "что делать?"]], "tip": "В глаголе в форме «он, она, они …» всегда -тся. В неопределённой форме (что делать?) всегда -ться, с мягким знаком."}, ex: [{"k": "choice", "q": "«Урок начина__ в девять»", "options": ["начинается", "начинаться"]}, {"k": "choice", "q": "«Я люблю купа__ в реке»", "options": ["купаться", "купается"]}, {"k": "choice", "q": "«Поезд приближа__ к станции»", "options": ["приближается", "приближаться"]}, {"k": "choice", "q": "«Пора собира__ в дорогу»", "options": ["собираться", "собирается"]}, {"k": "choice", "q": "«Дверь быстро закрыва__»", "options": ["закрывается", "закрываться"]}, {"k": "choice", "q": "Вставь: «Он хорошо учи_.»", "options": ["тся", "ться"]}, {"k": "choice", "q": "Вставь: «Надо больше учи_.»", "options": ["ться", "тся"]}, {"k": "choice", "q": "Вставь: «Мне хочется научи_ плавать.»", "options": ["ться", "тся"], "explanation": "Что сделать? — научиться."}, {"k": "choice", "q": "Вставь: «Мальчик старается не боя_ темноты.»", "options": ["ться", "тся"], "explanation": "Не бояться — что делать? С мягким знаком."}, {"k": "choice", "q": "Вставь: «Вода в чайнике быстро нагревае_.»", "options": ["тся", "ться"], "explanation": "Вода что делает? — нагревается."}] },
      { id: 'r2', t: 'Запятые при однородных членах', plan: 'перечисление, союзы и / но / а, повторяющиеся союзы', theory: {"rule": "Между однородными членами **без союза** ставь запятую. Перед **а, но, зато, однако** — запятая. Перед одиночным **и, или** — **без** запятой.", "ex": [["Купил хлеб, молоко, сыр", "без союза: запятые"], ["Купил хлеб и молоко", "одиночное «и»: без запятой"], ["Он устал, но доволен", "перед «но» запятая"]], "tip": "Если союз повторяется (и … и, ни … ни), запятая стоит между однородными членами: «И дождь, и ветер»."}, ex: [{"k": "choice", "q": "Где поставлена запятая верно?", "options": ["Он устал, но доволен.", "Он устал но доволен."]}, {"k": "choice", "q": "Где поставлена запятая верно?", "options": ["В сумке лежали яблоки и груши.", "В сумке лежали яблоки, и груши."]}, {"k": "choice", "q": "Где поставлена запятая верно?", "options": ["И дождь, и ветер мешали идти.", "И дождь и ветер мешали идти."]}, {"k": "choice", "q": "Где поставлена запятая верно?", "options": ["На столе лежали книги, ручки, тетради.", "На столе лежали книги ручки, тетради."]}, {"k": "choice", "q": "Где поставлена запятая верно?", "options": ["Не только холодно, но и сыро.", "Не только холодно но и сыро."]}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Брат любит не футбол, а баскетбол.", "Брат любит не футбол а баскетбол."], "explanation": "Перед «а» запятая всегда."}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Мы гуляли в парке и кормили уток.", "Мы гуляли в парке, и кормили уток."], "explanation": "Одиночный «и» запятой не отделяется."}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Ветер то стихал, то снова усиливался.", "Ветер то стихал то снова усиливался."], "explanation": "Повторяющийся союз то… то — запятая перед вторым."}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Ни снег, ни дождь не испугали туристов.", "Ни снег ни дождь не испугали туристов."], "explanation": "Ни… ни — запятая перед вторым союзом."}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Мы долго шли по лесу и наконец вышли к озеру.", "Мы долго шли по лесу, и наконец вышли к озеру."], "explanation": "Одиночный «и» между однородными сказуемыми — без запятой."}] },
      { id: 'r3', t: '«Не» и «ни»', plan: 'отрицание и усиление: ни разу, кто бы ни, не пришёл', theory: {"rule": "**Не** — отрицание: не пришёл, не знаю. **Ни** — усиление: ни разу, ни слова, ни души. И в сочетаниях **кто бы ни, что бы ни, как ни** — тоже **ни**.", "ex": [["Он ни разу не опоздал", "ни — усиление, не — отрицание"], ["Кто бы ни позвонил, я занят", "«кто бы ни» = «любой, кто»"]], "tip": "Проверка: если можно заменить на «любой, всякий» (кто бы ни позвонил = любой, кто позвонит), пиши ни."}, ex: [{"k": "choice", "q": "«Он __ разу не опоздал»", "options": ["ни", "не"]}, {"k": "choice", "q": "«Кто бы __ позвонил, скажи, что меня нет»", "options": ["ни", "не"]}, {"k": "choice", "q": "«Я __ знаю этого человека»", "options": ["не", "ни"]}, {"k": "choice", "q": "«В комнате __ души»", "options": ["ни", "не"]}, {"k": "choice", "q": "«Как он __ старался, получилось плохо»", "options": ["ни", "не"]}, {"k": "choice", "q": "«Я __ мог ни есть, ни спать»", "options": ["не", "ни"], "explanation": "Отрицание при глаголе — не. «Ни есть, ни спать» — усиление."}, {"k": "choice", "q": "«На полке __ одной свободной книги»", "options": ["ни", "не"], "explanation": "Усиление отрицания: ни одной."}, {"k": "choice", "q": "«Что бы он __ говорил, не верь»", "options": ["ни", "не"], "explanation": "Что бы ни = что угодно."}, {"k": "choice", "q": "«Он __ только устал, но и замёрз»", "options": ["не", "ни"], "explanation": "«Не только…, но и…» — союз с не."}, {"k": "choice", "q": "«На небе __ облачка»", "options": ["ни", "не"], "explanation": "Ни облачка — усиление, «нет ни одного»."}] },
      { id: 'r4', t: '«Н» и «нн» в прилагательных', plan: 'суффиксы -ан-, -ян-, -ин-, -енн-, -онн-, исключения', theory: {"rule": "**Одна н** в суффиксах **-ан-, -ян-, -ин-**: кожаный, серебряный, голубиный. **Две нн** в суффиксах **-онн-, -енн-**: станционный, соломенный.", "ex": [["кожаный, песчаный", "одна н"], ["станционный, соломенный", "две нн"]], "tip": "Три исключения с -ян- и двумя нн: стеклянный, оловянный, деревянный. Это базовое правило, не все случаи."}, ex: [{"k": "choice", "q": "Как пишется?", "options": ["кожаный", "кожанный"]}, {"k": "choice", "q": "Как пишется?", "options": ["серебряный", "серебрянный"]}, {"k": "choice", "q": "Как пишется?", "options": ["деревянный", "деревяный"]}, {"k": "choice", "q": "Как пишется?", "options": ["станционный", "станционый"]}, {"k": "choice", "q": "Как пишется?", "options": ["соломенный", "соломеный"]}, {"k": "choice", "q": "Вставь: «лимо_ый сок»", "options": ["нн", "н"], "explanation": "Лимон + н → лимонный: на стыке корня и суффикса две н."}, {"k": "choice", "q": "Вставь: «карма_ый фонарик»", "options": ["нн", "н"], "explanation": "Карман + н → карманный."}, {"k": "choice", "q": "Вставь: «искусстве_ый цветок»", "options": ["нн", "н"], "explanation": "-енн- — две н."}, {"k": "choice", "q": "Вставь: «песча_ый берег»", "options": ["н", "нн"], "explanation": "-ан- — одна н."}, {"k": "choice", "q": "Вставь: «журавли_ый клин»", "options": ["н", "нн"], "explanation": "-ин- — одна н."}] },
      { id: 'r5', t: 'Запятые в сложных предложениях', plan: 'перед что, который, потому что, когда', theory: {"rule": "Придаточную часть отделяй запятой: перед **что, который, потому что, когда**. Если придаточное стоит внутри предложения, запятая нужна и **до него, и после**.", "ex": [["Я знаю, что он придёт", "перед «что»"], ["Книга, которую я читаю, интересная", "внутри: две запятые"]], "tip": "Найди в предложении две части со своими глаголами. Между ними почти всегда нужна запятая."}, ex: [{"k": "choice", "q": "Где поставлена запятая верно?", "options": ["Я знаю, что он придёт.", "Я знаю что он придёт."]}, {"k": "choice", "q": "Где поставлена запятая верно?", "options": ["Он опоздал, потому что проспал.", "Он опоздал потому что проспал."]}, {"k": "choice", "q": "Где поставлена запятая верно?", "options": ["Книга, которую я читаю, интересная.", "Книга, которую я читаю интересная."]}, {"k": "choice", "q": "Где поставлена запятая верно?", "options": ["Когда я пришёл, все уже ушли.", "Когда я пришёл все уже ушли."]}, {"k": "choice", "q": "Где поставлена запятая верно?", "options": ["Мы вышли, когда стемнело.", "Мы вышли когда стемнело."]}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Наступила осень, и птицы улетели на юг.", "Наступила осень и птицы улетели на юг."], "explanation": "Два подлежащих и два сказуемых — сложное предложение, перед «и» запятая."}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Солнце село, стало прохладно.", "Солнце село стало прохладно."], "explanation": "Две части без союза — запятая."}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Мы вышли из дома, когда уже стемнело.", "Мы вышли из дома когда уже стемнело."]}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Я не пошёл гулять, потому что шёл дождь.", "Я не пошёл гулять потому что шёл дождь."]}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Дул ветер, и шумели деревья.", "Дул ветер и шумели деревья."], "explanation": "Дул ветер — шумели деревья: две основы, запятая перед «и»."}] },
      { id: 'rus-x1', exam: true, t: 'Экзамен: правила 1–5', covers: ['r1', 'r2', 'r3', 'r4', 'r5'], pass: 0.8,
        q: [
          { k: 'choice', s: 'r1', q: '«Он хорошо учи__»', options: ['учится', 'учиться'] },
          { k: 'choice', s: 'r1', q: '«Мне нужно учи__»', options: ['учиться', 'учится'] },
          { k: 'choice', s: 'r1', q: '«Поезд должен отправи__ в 18:40»', options: ['отправиться', 'отправится'] },
          { k: 'choice', s: 'r1', q: '«Смена начинает__ в восемь»', options: ['начинается', 'начинаеться'] },
          { k: 'choice', s: 'r2', q: 'Где запятые стоят правильно?', options: ['Я купил хлеб, молоко и сыр.', 'Я купил хлеб, молоко, и сыр.', 'Я купил хлеб молоко и сыр.'] },
          { k: 'choice', s: 'r2', q: '«Он устал(?) но доволен». Нужна запятая?', options: ['Нужна', 'Не нужна'] },
          { k: 'choice', s: 'r2', q: '«Я учу английский(?) и русский». Нужна запятая?', options: ['Не нужна', 'Нужна'] },
          { k: 'choice', s: 'r2', q: 'Где запятые стоят правильно?', options: ['И утром, и вечером я занимаюсь.', 'И утром и вечером я занимаюсь.', 'И утром, и вечером, я занимаюсь.'] },
          { k: 'choice', s: 'r3', q: '«Я н_ разу не был в Москве»', options: ['ни', 'не'] },
          { k: 'choice', s: 'r3', q: '«Он н_ пришёл на смену»', options: ['не', 'ни'] },
          { k: 'choice', s: 'r3', q: '«Кто бы н_ звонил, отвечай»', options: ['ни', 'не'] },
          { k: 'choice', s: 'r3', q: '«Н_ один человек не знал ответа»', options: ['Ни', 'Не'] },
          { k: 'choice', s: 'r4', q: '«деревя__ый дом»', options: ['нн', 'н'] },
          { k: 'choice', s: 'r4', q: '«кожа__ая куртка»', options: ['н', 'нн'] },
          { k: 'choice', s: 'r4', q: '«осе__ий день»', options: ['нн', 'н'] },
          { k: 'choice', s: 'r4', q: '«ветре__ый день»', options: ['н', 'нн'] },
          { k: 'choice', s: 'r5', q: '«Я знаю(?) что ты прав». Нужна запятая?', options: ['Нужна', 'Не нужна'] },
          { k: 'choice', s: 'r5', q: '«Это книга(?) которую я читаю». Нужна запятая?', options: ['Нужна', 'Не нужна'] },
          { k: 'choice', s: 'r5', q: 'Где запятая стоит правильно?', options: ['Я опоздал, потому что поезд задержали.', 'Я опоздал потому что поезд задержали.', 'Я опоздал потому, что, поезд задержали.'] },
          { k: 'choice', s: 'r5', q: 'Где запятые стоят правильно?', options: ['Он сказал, что придёт, и ушёл.', 'Он сказал, что придёт и ушёл.', 'Он сказал что придёт, и ушёл.'] }
        ] },
      { id: 'r6', t: 'Одеть и надеть, оплатить и платить за', plan: 'похожие слова, которые часто путают', theory: {"rule": "**Одеть** — кого-то (одеть ребёнка). **Надеть** — что-то (надеть куртку, каску). **Оплатить** — что (оплатить проезд). **Заплатить, платить** — за что (заплатить за проезд).", "ex": [["Одеть ребёнка, надеть шапку", "одеваем кого, надеваем что"], ["Оплатить счёт, заплатить за счёт", "оплатить без «за», заплатить с «за»"]], "tip": "Запомни: одеваем Надежду, надеваем одежду. И «оплатить за» — ошибка: либо «оплатить проезд», либо «заплатить за проезд»."}, ex: [{"k": "choice", "q": "«Перед сменой нужно __ жилет»", "options": ["надеть", "одеть"]}, {"k": "choice", "q": "«Мама должна __ маленького сына»", "options": ["одеть", "надеть"]}, {"k": "choice", "q": "Как сказать правильно?", "options": ["Оплатить проезд", "Оплатить за проезд"]}, {"k": "choice", "q": "Как сказать правильно?", "options": ["Он заплатил за билет", "Он оплатил за билет"]}, {"k": "choice", "q": "«На улице холодно, __ тёплую куртку»", "options": ["надень", "одень"]}, {"k": "choice", "q": "Как правильно?", "options": ["оплатить счёт", "оплатить за счёт"], "explanation": "Оплатить — что."}, {"k": "choice", "q": "Как правильно?", "options": ["заплатить за квартиру", "оплатить за квартиру"], "explanation": "Заплатить — за что."}, {"k": "choice", "q": "«__ перчатки, на улице мороз»", "options": ["Надень", "Одень"], "explanation": "Надевают что-то на себя."}, {"k": "choice", "q": "«Надо __ куклу в новое платье»", "options": ["одеть", "надеть"], "explanation": "Одевают кого-то."}, {"k": "input", "q": "Вставь глагол без «за»: «Пассажир должен __ проезд»", "a": ["оплатить"], "explanation": "Оплатить проезд — без предлога."}] },
      { id: 'r7', t: 'Тире и двоеточие', plan: 'когда ставить тире между подлежащим и сказуемым, двоеточие перед перечислением', theory: {"rule": "**Тире** ставим между подлежащим и сказуемым, когда оба — существительные в именительном падеже: **Москва — столица России**. **Двоеточие** ставим после обобщающего слова перед перечислением: **В сумке было всё нужное: хлеб, вода, нож.**", "ex": [["Мой отец — машинист", "два существительных: тире"], ["Я взял с собой всё нужное: хлеб, воду, нож", "обобщающее слово «всё нужное»: двоеточие"]], "tip": "Если перед перечислением нет обобщающего слова, двоеточие не нужно: «Я купил хлеб, молоко и сыр»."}, ex: [{"k": "choice", "q": "Где знак стоит верно?", "options": ["Москва — столица России.", "Москва столица России."]}, {"k": "choice", "q": "Где знак стоит верно?", "options": ["Мой отец — машинист.", "Мой отец машинист."]}, {"k": "choice", "q": "Где знак стоит верно?", "options": ["В сумке было всё нужное: хлеб, вода, нож.", "В сумке было всё нужное, хлеб, вода, нож."]}, {"k": "choice", "q": "Где знак стоит верно?", "options": ["Я купил хлеб, молоко и сыр.", "Я купил: хлеб, молоко и сыр."]}, {"k": "choice", "q": "Где знак стоит верно?", "options": ["Дважды два — четыре.", "Дважды два четыре."]}, {"k": "choice", "q": "Где знак стоит верно?", "options": ["Петербург — город на Неве.", "Петербург город на Неве."], "explanation": "Подлежащее и сказуемое — существительные: тире."}, {"k": "choice", "q": "Где знак стоит верно?", "options": ["Мы взяли всё: палатку, спальники, еду.", "Мы взяли всё, палатку, спальники, еду."], "explanation": "После обобщающего слова «всё» — двоеточие."}, {"k": "choice", "q": "Где знак стоит верно?", "options": ["Три плюс два — пять.", "Три плюс два пять."], "explanation": "Между подлежащим и сказуемым-числительным — тире."}, {"k": "choice", "q": "Где знак стоит верно?", "options": ["Лучшее лекарство — сон.", "Лучшее лекарство сон."], "explanation": "Два существительных в именительном падеже — тире."}, {"k": "choice", "q": "Где знак стоит верно?", "options": ["Он принёс фрукты: яблоки и груши.", "Он принёс фрукты, яблоки и груши."], "explanation": "«Фрукты» — обобщающее слово, дальше перечисление."}] },
      { id: 'r8', t: 'Тоже / то же, также / так же, чтобы / что бы', plan: 'слитно или раздельно, как проверить', theory: {"rule": "**Тоже** = «и, также»: я тоже еду (и я еду). **То же** = «то же самое»: он сказал то же. **Также** = «и, а ещё»: учусь, а также работаю. **Так же** = «так же, как»: работает так же, как отец. **Чтобы** — цель: пришёл, чтобы помочь.", "ex": [["Я тоже еду", "можно заменить на «и я еду»"], ["Он сказал то же самое", "можно добавить «самое»"], ["Я пришёл, чтобы помочь", "цель: «для того чтобы»"]], "tip": "Проверка для «то же»: добавь «самое». Для «также»: замени на «и». Для «чтобы»: подставь «для того чтобы». Если подходит, пиши слитно."}, ex: [{"k": "choice", "q": "«Я __ еду в Москву»", "options": ["тоже", "то же"]}, {"k": "choice", "q": "«Он сказал __ самое»", "options": ["то же", "тоже"]}, {"k": "choice", "q": "«Я учусь, а __ работаю»", "options": ["также", "так же"]}, {"k": "choice", "q": "«Он водит поезд __, как отец»", "options": ["так же", "также"]}, {"k": "choice", "q": "«Я пришёл, __ помочь»", "options": ["чтобы", "что бы"]}, {"k": "choice", "q": "«Мы __ не остались»", "options": ["тоже", "то же"], "explanation": "Тоже = и: и мы не остались."}, {"k": "choice", "q": "«Делай __, как я»", "options": ["так же", "также"], "explanation": "Так же, как — сравнение, раздельно."}, {"k": "choice", "q": "«__ ни случилось, звони»", "options": ["Что бы", "Чтобы"], "explanation": "Что бы ни — «бы» можно убрать: что ни случилось."}, {"k": "choice", "q": "«Я пришёл пораньше, __ ты не скучал»", "options": ["чтобы", "что бы"], "explanation": "Цель — чтобы."}, {"k": "choice", "q": "«Он сказал __, что и вчера»", "options": ["то же", "тоже"], "explanation": "То же самое, что и вчера."}] },
      { id: 'r9', t: 'Ударения: звонит, торты, договор', plan: 'частые ошибки в ударениях', theory: {"rule": "В русском ударение свободное, поэтому его **учат на память**. Вот слова, в которых чаще всего ошибаются: **звонИт, тОрты, договОр, квартАл, каталОг, включИт, красИвее**.", "ex": [["звонИт, включИт", "ударение на конце"], ["тОрты, бАнты, шАрфы", "ударение на первом слоге"]], "tip": "Сомневаешься — смотри в словаре (gramota.ru). Выучи по 3–5 слов в день, остальное само запомнится."}, ex: [{"k": "choice", "q": "Как правильно?", "options": ["звонИт", "звОнит"]}, {"k": "choice", "q": "Как правильно?", "options": ["тОрты", "тортЫ"]}, {"k": "choice", "q": "Как правильно?", "options": ["договОр", "дОговор"]}, {"k": "choice", "q": "Как правильно?", "options": ["квартАл", "квАртал"]}, {"k": "choice", "q": "Как правильно?", "options": ["каталОг", "катАлог"]}, {"k": "choice", "q": "Как правильно?", "options": ["щавЕль", "щАвель"]}, {"k": "choice", "q": "Как правильно?", "options": ["досУг", "дОсуг"]}, {"k": "choice", "q": "Как правильно?", "options": ["красИвее", "красивЕе"]}, {"k": "choice", "q": "Как правильно?", "options": ["жалюзИ", "жАлюзи"]}, {"k": "choice", "q": "Как правильно?", "options": ["облегчИть", "облЕгчить"]}] },
      { id: 'r10', t: 'В течение, вследствие, по приезде', plan: 'трудные предлоги и обороты', theory: {"rule": "**В течение** (чего) и **вследствие** (чего) — предлоги, пишутся с «е» на конце и слитно (вследствие). После **по** пишем **-е**: по приезде, по окончании, по прибытии. После **согласно, благодаря** — дательный падеж: согласно приказу, благодаря помощи.", "ex": [["в течение часа", "предлог: на конце -е"], ["по приезде, по окончании смены", "по + предложный падеж: -е"], ["согласно приказу", "согласно + дательный: -у"]], "tip": "«В течении реки» — другое дело: здесь существительное «течение», и пишем «в течении»."}, ex: [{"k": "choice", "q": "Как правильно?", "options": ["по приезде", "по приезду"]}, {"k": "choice", "q": "Как правильно?", "options": ["по окончании смены", "по окончанию смены"]}, {"k": "choice", "q": "Как правильно?", "options": ["в течение часа", "в течении часа"]}, {"k": "choice", "q": "«__ ошибки поезд задержали»", "options": ["Вследствие", "В следствие"]}, {"k": "choice", "q": "Как правильно?", "options": ["согласно приказу", "согласно приказа"]}, {"k": "choice", "q": "Как правильно?", "options": ["по прибытии", "по прибытию"]}, {"k": "choice", "q": "Как правильно?", "options": ["благодаря помощи", "благодаря помощь"]}, {"k": "choice", "q": "Как правильно?", "options": ["в продолжение часа", "в продолжении часа"], "explanation": "Предлог со значением времени — на -е."}, {"k": "choice", "q": "«__ дождя дорогу размыло»", "options": ["Вследствие", "В следствии"], "explanation": "Из-за дождя — предлог, слитно."}, {"k": "choice", "q": "Как правильно?", "options": ["по завершении работ", "по завершению работ"], "explanation": "«По» в значении «после» — предложный падеж."}] },
      { id: 'rus-x2', exam: true, t: 'Экзамен: правила 6–10', covers: ['r6', 'r7', 'r8', 'r9', 'r10'], pass: 0.8,
        q: [
          { k: 'choice', s: 'r6', q: '«Он быстро __ шапку и вышел»', options: ['надел', 'одел'] },
          { k: 'choice', s: 'r6', q: '«Бабушка __ внука и повела гулять»', options: ['одела', 'надела'] },
          { k: 'choice', s: 'r6', q: 'Как правильно?', options: ['Оплатить проезд', 'Оплатить за проезд'] },
          { k: 'choice', s: 'r6', q: 'Как правильно?', options: ['Заплатить за ремонт', 'Оплатить за ремонт'] },
          { k: 'choice', s: 'r7', q: 'Где знак стоит верно?', options: ['Волга — самая длинная река Европы.', 'Волга самая длинная река Европы.'] },
          { k: 'choice', s: 'r7', q: 'Где знак стоит верно?', options: ['Я взял в дорогу всё нужное: еду, воду, зарядку.', 'Я взял в дорогу всё нужное, еду, воду, зарядку.'] },
          { k: 'choice', s: 'r7', q: 'Где знак стоит верно?', options: ['Мы купили хлеб, воду и сыр.', 'Мы купили: хлеб, воду и сыр.'] },
          { k: 'choice', s: 'r7', q: 'Где знак стоит верно?', options: ['Мой брат — помощник машиниста.', 'Мой брат помощник машиниста.'] },
          { k: 'choice', s: 'r8', q: '«Ты едешь на смену, и я __ еду»', options: ['тоже', 'то же'] },
          { k: 'choice', s: 'r8', q: '«Он повторил __ самое»', options: ['то же', 'тоже'] },
          { k: 'choice', s: 'r8', q: '«Он читает, а __ пишет стихи»', options: ['также', 'так же'] },
          { k: 'choice', s: 'r8', q: '«Я встал рано, __ успеть на поезд»', options: ['чтобы', 'что бы'] },
          { k: 'choice', s: 'r9', q: 'Как правильно?', options: ['звонИт', 'звОнит'] },
          { k: 'choice', s: 'r9', q: 'Как правильно?', options: ['включИт', 'включЫт'] },
          { k: 'choice', s: 'r9', q: 'Как правильно?', options: ['тОрты', 'тортЫ'] },
          { k: 'choice', s: 'r9', q: 'Как правильно?', options: ['договОр', 'дОговор'] },
          { k: 'choice', s: 'r10', q: 'Как правильно?', options: ['в течение недели', 'в течении недели'] },
          { k: 'choice', s: 'r10', q: 'Как правильно?', options: ['по прибытии', 'по прибытию'] },
          { k: 'choice', s: 'r10', q: '«__ погоды рейс отменили»', options: ['Вследствие', 'В следствие'] },
          { k: 'choice', s: 'r10', q: 'Как правильно?', options: ['согласно графику', 'согласно графика'] }
        ] },
      {"id": "r11", "t": "Деепричастный оборот: кто действует", "plan": "деепричастие и главный глагол относятся к одному деятелю", "theory": {"rule": "**Деепричастие** (подъезжая, прочитав, сделав) называет добавочное действие того же, кто делает главное. Проверь двумя вопросами: кто делает то, что в деепричастии? кто делает главное? Ответы должны совпасть. Если деятели разные или главная часть безличная («стало ясно», «слетела шляпа»), предложение сломано. Лечение: дай обеим частям одного деятеля или замени оборот на «когда…», «после того как…». Сам оборот выделяется запятыми с двух сторон. Не деепричастия: слова, ставшие наречиями (молча, стоя, не спеша) и предлогами (несмотря на, судя по, начиная с) — запятых и деятеля не требуют.", "ex": [["Подъезжая к станции, у меня слетела шляпа", "ошибка: подъезжал я, а слетела шляпа. Верно: Когда я подъезжал к станции, у меня слетела шляпа"], ["Прочитав письмо, ему стало ясно", "ошибка: «стало ясно» — безличное, деятеля нет. Верно: Прочитав письмо, он всё понял"], ["Открыв файл, проверьте кодировку", "верно: и открывает, и проверяет один человек — ты"], ["Он отвечал не спеша. Судя по отчёту, план выполнен.", "не спеша — наречие, судя по — предлог: это не обороты"]], "tip": "Сомневаешься — перепиши через «когда»: «Когда я возвращался домой, начался дождь». Так ошибиться нельзя."}, "ex": [{"k": "choice", "q": "Где ошибка?", "options": ["Возвращаясь домой, начался дождь", "Возвращаясь домой, я попал под дождь", "Когда я возвращался домой, начался дождь", "Вернувшись домой, я снял куртку"], "explanation": "Возвращался я, а начался дождь — деятели разные."}, {"k": "choice", "q": "Как исправить «Прочитав инструкцию, ему стало понятно»?", "options": ["Прочитав инструкцию, он всё понял", "Прочитав инструкцию, стало понятно", "Прочитав инструкцию, понятно стало ему", "Оставить как есть"], "explanation": "Нужен деятель и у деепричастия, и у главного глагола: он прочитал — он понял."}, {"k": "choice", "q": "Нужны ли запятые: «Он отвечал не спеша и смотрел в окно»?", "options": ["Нет: «не спеша» — наречие", "Да: это деепричастный оборот", "Да, одна запятая перед «и»", "Нужно тире"], "explanation": "Не спеша, молча, стоя, сидя — наречия образа действия, оборотом не считаются."}, {"k": "choice", "q": "Выбери верное предложение", "options": ["Проверяя состав, помощник машиниста заметил утечку", "Проверяя состав, была замечена утечка", "Проверяя состав, утечка стала заметна", "Проверяя состав, помощнику заметилась утечка"], "explanation": "Проверял помощник — заметил помощник. В остальных деятеля нет или он другой."}, {"k": "order", "q": "Собери правильное предложение", "words": ["Сделав", "запись,", "машинист", "доложил", "диспетчеру"], "a": "Сделав запись, машинист доложил диспетчеру", "explanation": "Сделал запись машинист — доложил машинист. Оборот в начале, после него запятая."}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Закончив уроки, брат пошёл гулять.", "Закончив уроки брат пошёл гулять."], "explanation": "Оборот в начале — запятая после него."}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Кошка спала, свернувшись клубком.", "Кошка спала свернувшись клубком."], "explanation": "Оборот в конце — запятая перед ним."}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Мальчик, увидев собаку, остановился.", "Мальчик, увидев собаку остановился."], "explanation": "Оборот в середине — запятые с двух сторон."}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Улыбаясь, девочка протянула мне руку.", "Улыбаясь девочка протянула мне руку."]}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Прочитав письмо, мама улыбнулась.", "Прочитав письмо мама улыбнулась."]}]},
      {"id": "r12", "t": "Управление: благодаря поддержке, заведующий отделом", "plan": "какой падеж требует слово", "theory": {"rule": "**Управление** — какой падеж требует слово. Запомни пары, где ошибаются чаще всего. **Согласно, благодаря, вопреки, навстречу** — дательный: благодаря поддержке, вопреки ожиданиям, навстречу гостям. **Заведующий, командующий, управляющий** — творительный: заведующий складом. **Преимущество перед** конкурентами, не «над». **Уверенность в** победе, но **вера в** победу. **По окончании** смены, **по прибытии** — не «по окончанию». Если два глагола требуют разных падежей, не вешай на них одно слово: не «организовать и руководить работой», а «организовать работу и руководить ею».", "ex": [["Благодаря бригаде, вопреки прогнозу, навстречу поезду", "после этих предлогов — кому? чему?"], ["Заведующий депо, командующий округом, управляющий филиалом", "заведующий чем?"], ["Преимущество перед другими, уверенность в себе, вера в успех", "перед — не над; уверенность в ком/чём, вера во что"], ["Любить спорт и заниматься им", "«любить и заниматься спортом» — ошибка: любить что, заниматься чем — у каждого глагола своё слово"]], "tip": "Задай вопрос от слова: благодаря — чему? заведующий — чем? преимущество — перед кем? Вопрос подскажет падеж."}, "ex": [{"k": "choice", "q": "«Благодаря __ бригада успела»", "options": ["поддержке", "поддержки", "поддержкой"], "explanation": "Благодаря — чему? Дательный падеж."}, {"k": "choice", "q": "Как правильно?", "options": ["заведующий складом", "заведующий склада", "заведующий о складе"], "explanation": "Заведующий — чем? Творительный."}, {"k": "input", "q": "Вставь слово от «окончание»: «По __ смены сдай документы»", "a": ["окончании"], "explanation": "«По» в значении «после» — предложный падеж: по окончании, по прибытии."}, {"k": "choice", "q": "Как правильно?", "options": ["преимущество перед соперником", "преимущество над соперником", "преимущество против соперника"], "explanation": "Преимущество перед кем-то. «Над» здесь не используется."}, {"k": "choice", "q": "Исправь: «надеяться и верить в успех»", "options": ["надеяться на успех и верить в него", "надеяться в успех и верить в успех", "надеяться и верить на успех", "Ошибки нет, так и пишут"], "explanation": "Надеяться на что, верить во что. Первому глаголу — своё слово, второму — местоимение."}, {"k": "choice", "q": "Как правильно?", "options": ["вопреки прогнозу", "вопреки прогноза"]}, {"k": "choice", "q": "Как правильно?", "options": ["навстречу гостям", "навстречу гостей"]}, {"k": "choice", "q": "Как правильно?", "options": ["командующий армией", "командующий армии"]}, {"k": "choice", "q": "Как правильно?", "options": ["вера в победу", "вера в победе"]}, {"k": "input", "q": "Вставь слово от «поддержка»: «Благодаря __ мы успели»", "a": ["поддержке"], "explanation": "Благодаря — чему? Дательный."}]},
      {"id": "r13", "t": "Числительные: два вагона, пять вагонов", "plan": "форма существительного после числа и число сказуемого", "theory": {"rule": "После **1** (21, 31, 101…) — именительный единственного: 21 вагон. После **2, 3, 4** (22, 33, 44…) — родительный единственного: 2 вагона, 23 вагона. После **5–20** и дальше (25, 30, 100) — родительный множественного: 5 вагонов, 12 вагонов. **Полтора** часа, **полторы** минуты — родительный единственного. Со словами **большинство, ряд, часть, несколько** сказуемое в единственном числе, если речь о неодушевлённом или о целом (большинство зданий построено, прошло пять лет); во множественном — если о людях и их отдельных действиях (большинство рабочих ушли на обед, пять человек подали заявления).", "ex": [["1 вагон, 2 вагона, 5 вагонов, 21 вагон, 22 вагона, 25 вагонов", "форму задаёт последняя цифра числа"], ["полтора часа, полторы смены, полтора года", "не «полтора часов»"], ["Прошло пять лет. Пять человек подали заявления.", "срок как целое — единственное число; люди и их действия — множественное"], ["Большинство документов было утрачено. Большинство студентов сдали экзамен.", "неодушевлённое — ед. число, люди — мн. число"]], "tip": "Сомневаешься — подставь слово «штука»: 21 штука, 2 штуки, 5 штук."}, "ex": [{"k": "choice", "q": "«На путях стоят 23 __»", "options": ["вагона", "вагонов", "вагон"], "explanation": "Последняя цифра 3 — родительный единственного: вагона."}, {"k": "choice", "q": "«Прошло полтора __»", "options": ["часа", "часов", "час"], "explanation": "Полтора — родительный единственного."}, {"k": "input", "q": "Напиши слово «вагон» в нужной форме: «На станции стоит 31 __»", "a": ["вагон"], "explanation": "Последняя цифра 1 — именительный единственного: 31 вагон."}, {"k": "choice", "q": "«Большинство зданий __ построено до войны»", "options": ["было", "были"], "explanation": "Здания неодушевлённые, сказуемое-причастие — единственное число."}, {"k": "choice", "q": "«Через 2 __ прибудет смена»", "options": ["часа", "часов", "час"], "explanation": "После 2, 3, 4 — родительный единственного: часа."}, {"k": "choice", "q": "«В пути мы провели три __»", "options": ["часа", "часов", "час"], "explanation": "После 2, 3, 4 — родительный единственного."}, {"k": "choice", "q": "«На станции 25 __»", "options": ["вагонов", "вагона", "вагон"], "explanation": "После 5 и далее — родительный множественного."}, {"k": "input", "q": "Напиши слово «год» в нужной форме: «Прошло полтора __»", "a": ["года"], "explanation": "Полтора — родительный единственного: полтора года."}, {"k": "input", "q": "Напиши слово «вагон» в нужной форме: «Прицепили 41 __»", "a": ["вагон"], "explanation": "Последняя цифра 1 — именительный единственного."}, {"k": "choice", "q": "«Ряд предложений __ отклонён»", "options": ["был", "были"], "explanation": "Неодушевлённое, сказуемое-причастие — единственное число."}]},
      {"id": "r14", "t": "Плеоназмы и тавтология", "plan": "лишние слова и повтор однокоренных", "theory": {"rule": "**Плеоназм** — лишнее слово, смысл которого уже сидит в соседнем: свободная вакансия (вакансия и так свободна), период времени, прейскурант цен, ответная реакция, в январе месяце, подняться вверх, самый оптимальный, другая альтернатива. **Тавтология** — однокоренные слова рядом: спросить вопрос, проливной ливень, организовать организацию. Лишнее слово убери или замени: задать вопрос, проливной дождь. Проверка: убери слово — если смысл не изменился, оно было лишним. Но не руби механически: «экспонат выставки» против «экспоната постоянной экспозиции» — здесь слово различает два предмета.", "ex": [["свободная вакансия → вакансия; период времени → период; в январе месяце → в январе", "второе слово уже внутри первого"], ["самый оптимальный → оптимальный; другая альтернатива → альтернатива", "оптимальный — уже «самый лучший», альтернатива — уже «другой вариант»"], ["спросить вопрос → задать вопрос; проливной ливень → проливной дождь", "однокоренные рядом — тавтология"], ["Экспонат выставки уехал в фонд, а экспонат постоянной экспозиции остался", "не лишнее: «выставки» противопоставляет два экспоната. Убирай, только если смысл не меняется"]], "tip": "Самые частые: период времени, в месяце мае, прейскурант цен, памятный сувенир, первый дебют, свободная вакансия, ответная реакция."}, "ex": [{"k": "choice", "q": "Что лишнее в «период времени»?", "options": ["времени", "период", "ничего, так и говорят", "оба слова"], "explanation": "Период — это и есть отрезок времени."}, {"k": "choice", "q": "Исправь «спросить вопрос»", "options": ["задать вопрос", "спросить вопросом", "вопросить", "Ошибки нет"], "explanation": "Спросить и вопрос — однокоренные. Вопрос задают."}, {"k": "choice", "q": "Где нет плеоназма?", "options": ["проливной дождь", "проливной ливень", "ответная реакция", "самый оптимальный"], "explanation": "Ливень — уже проливной, реакция — уже ответная, оптимальный — уже самый."}, {"k": "input", "q": "Убери лишнее слово и напиши, что осталось: «памятный сувенир»", "a": ["сувенир"], "explanation": "Сувенир — вещь на память по определению."}, {"k": "choice", "q": "Когда слово «выставки» в «экспонат выставки» не лишнее?", "options": ["Когда оно отличает один экспонат от другого", "Никогда: экспонат — всегда выставки", "Всегда: так красивее", "Только в заголовке"], "explanation": "Проверка одна: убери слово. Если смысл изменился — оно нужно."}, {"k": "input", "q": "Выпиши лишнее слово: «ответная реакция»", "a": ["ответная"], "explanation": "Реакция — уже ответ."}, {"k": "input", "q": "Выпиши лишнее слово: «первый дебют»", "a": ["первый"], "explanation": "Дебют — уже первый."}, {"k": "input", "q": "Выпиши лишнее слово: «в мае месяце»", "a": ["месяце"]}, {"k": "choice", "q": "Где плеоназм?", "options": ["главный приоритет", "главная задача", "первый шаг", "лучший друг"], "explanation": "Приоритет — уже главное."}, {"k": "choice", "q": "Исправь «проливной ливень»", "options": ["проливной дождь", "ливневый ливень", "проливной дождик и ливень", "Ошибки нет"], "explanation": "Ливень и проливной — однокоренные."}]},
      {"id": "r15", "t": "Канцелярит: «произвести ремонт» → «отремонтировать»", "plan": "казённые обороты и живые замены", "theory": {"rule": "**Канцелярит** — казённый язык, который переползает из приказов в письма и заметки: «произвести ремонт» вместо «отремонтировать», «в настоящее время» вместо «сейчас», «осуществлять контроль» вместо «контролировать». Признаки: глагол заменён существительным (приняли решение → решили), цепочка «кого-чего» (план мероприятий по обеспечению выполнения решений), страдательный залог без нужды (доклад был заслушан → мы выслушали доклад). Правило: глагол вместо существительного, короткое предложение вместо длинного, конкретное слово вместо «в рамках», «в сфере», «в целях». Прочитай вслух: споткнулся — переписывай.", "ex": [["произвести ремонт → отремонтировать; оказать содействие → помочь; принять решение → решить", "глагол короче и живее"], ["в настоящее время → сейчас; на сегодняшний день → сегодня; в случае если → если; в целях обеспечения → чтобы", "штамп сжимается в одно слово"], ["Доклад был заслушан → Мы выслушали доклад", "страдательный залог прячет того, кто действует"], ["план мероприятий по обеспечению выполнения решений", "четыре «чего» подряд — перепиши: что сделать, чтобы выполнить решения"]], "tip": "В служебных документах канцелярит неизбежен — там его оставь. В письмах, заметках и стихах вычищай."}, "ex": [{"k": "choice", "q": "Замени «произвести оплату»", "options": ["оплатить", "осуществить оплату", "совершить оплату", "выполнить оплату"], "explanation": "Один глагол вместо связки «сделать что-то»."}, {"k": "choice", "q": "Где канцелярит?", "options": ["Нами было принято решение о проведении проверки", "Мы решили проверить", "Проверим завтра", "Решено: проверяем"], "explanation": "Страдательный залог и два существительных вместо глаголов."}, {"k": "input", "q": "Одно слово вместо «в настоящее время»", "a": ["сейчас", "теперь"], "explanation": "Сейчас или теперь — и всё."}, {"k": "choice", "q": "Как переписать «Доклад был заслушан комиссией»?", "options": ["Комиссия выслушала доклад", "Доклад заслушался комиссией", "Комиссией был заслушан доклад", "Заслушивание доклада комиссией состоялось"], "explanation": "Кто действует — тот и подлежащее."}, {"k": "choice", "q": "Признак канцелярита", "options": ["Существительное вместо глагола: «осуществлять контроль»", "Короткое предложение", "Глагол в начале фразы", "Разговорное слово"], "explanation": "Глагол спрятан в существительное — верный признак."}, {"k": "input", "q": "Одним словом: «осуществлять контроль»", "a": ["контролировать"]}, {"k": "input", "q": "Одним словом: «принимать участие»", "a": ["участвовать"]}, {"k": "choice", "q": "Живая замена «в случае если»", "options": ["если", "в случае", "при условии если", "когда если"]}, {"k": "choice", "q": "Где канцелярит?", "options": ["Просим оказать содействие в решении вопроса", "Помогите решить вопрос", "Помогите, пожалуйста", "Нужна помощь с вопросом"], "explanation": "Содействие в решении — два существительных вместо «помогите решить»."}, {"k": "input", "q": "Одним словом: «на постоянной основе»", "a": ["постоянно", "регулярно"]}]},
      {"id": "r16", "t": "Числа в тексте: словами или цифрами", "plan": "когда число пишут словами, порядковые, даты, разряды", "theory": {"rule": "В обычном тексте числа **от 1 до 9 — словами** (прошло три дня), **от 10 — цифрами** (участвовало 15 человек). В начале предложения — всегда словами. Крупные круглые — смешанно: 1,5 млн, 20 тыс. Порядковые с наращением через дефис: 1-й этаж, 2-я попытка, 5-го числа. Наращение — одна буква, если перед последней буквой слова гласная (первый → 1-й, вторая → 2-я), две — если согласная (второго → 2-го, пятому → 5-му). Даты в тексте: 15 марта 2026 года; десятилетия: 90-е годы; века — римскими: XXI век; время — через двоеточие: 14:30. Разряды отделяй пробелом: 25 400, не 25.400 и не 25,400; запятая — для десятичных: 1,5.", "ex": [["Прошло три дня. На собрание пришли 15 человек. Двадцать пять заявок поступило за день.", "до 9 — словами, от 10 — цифрами, в начале предложения — словами"], ["1-й этаж, 2-я смена, 3-е место, 5-го числа, 20-му году", "дефис, не точка; 1ый, 2-ая, 5ого — ошибки"], ["15 марта 2026 года; 90-е годы; XXI век; 14:30; 2020–2025 гг.", "дата, десятилетие, век, время, диапазон"], ["1 000 000; 25 400; 1,5 млн; 2,5 кг", "пробел между разрядами, запятая — десятичный знак"]], "tip": "Однотипные числа в одном абзаце пиши одинаково: либо «три и пять», либо «3 и 5»."}, "ex": [{"k": "choice", "q": "Как написать в обычном тексте?", "options": ["Прошло три дня", "Прошло 3 дня", "Прошло 3 (три) дня", "Прошло III дня"], "explanation": "До девяти в обычном тексте — словами."}, {"k": "choice", "q": "Предложение начинается с числа. Как?", "options": ["Двадцать пять человек вышли на смену", "25 человек вышли на смену", "25-ть человек вышли на смену", "Любой вариант"], "explanation": "В начале предложения число всегда словами."}, {"k": "input", "q": "Напиши «пятого» цифрой с наращением, как в «__ числа»", "a": ["5-го"], "explanation": "Перед последней буквой согласная (пято-го) — наращение из двух букв через дефис."}, {"k": "choice", "q": "Какой вариант верен?", "options": ["90-е годы", "90-ые годы", "90е годы", "90-тые годы"], "explanation": "Перед последней буквой «ы» — гласная, наращение одна буква: 90-е."}, {"k": "choice", "q": "Как записать время и век?", "options": ["14:30, XXI век", "14.30, 21 век", "14-30, XXI-й век", "14:30, 21-ый век"], "explanation": "Время через двоеточие, век римскими цифрами без наращения."}, {"k": "choice", "q": "В обычном тексте", "options": ["Прошло семь дней", "Прошло 7 дней"], "explanation": "До девяти — словами."}, {"k": "choice", "q": "Порядковое число", "options": ["3-й вагон", "3-ий вагон", "3ий вагон", "3-ый вагон"], "explanation": "Перед последней буквой «й» — гласная, наращение одна буква."}, {"k": "choice", "q": "Век", "options": ["XX век", "20-й век", "20 век", "ХХ-й век"], "explanation": "Века — римскими цифрами, без наращения."}, {"k": "input", "q": "Напиши «первая» цифрой с наращением (как «__ смена»)", "a": ["1-я"], "explanation": "Перед последней буквой «я» — гласная: 1-я."}, {"k": "choice", "q": "Большое число", "options": ["1 500 000", "1.500.000", "1,500,000", "1500000"], "explanation": "Разряды через пробел; точка и запятая — не разделители."}]},
      {"id": "r17", "t": "Заглавные буквы: должности, названия, заголовки", "plan": "где прописная, а где строчная", "theory": {"rule": "После **двоеточия** — строчная, если дальше перечисление (Привезли: молоток, пилу); прописная — если прямая речь (Он ответил: «Согласен»). В **заголовках** с большой буквы только первое слово и имена собственные: «Краткий курс механики», а не «Краткий Курс Механики». **Должности** в обычном тексте — строчными: генеральный директор, начальник депо; с прописной — только высшие государственные в официальных документах. **Географические названия**: все слова с большой (Нижний Тагил), родовое слово — с маленькой (город Москва, озеро Байкал), но Белое море — там оно часть имени. В **кавычках** первое слово с прописной: роман «Война и мир», ООО «Ромашка». Степени и звания — строчными: доктор наук, профессор.", "ex": [["Привезли: молоток, пилу, рубанок. Он ответил: «Согласен».", "перечисление — строчная, прямая речь — прописная"], ["Правила технической эксплуатации железных дорог", "в названии документа прописная только у первого слова"], ["начальник депо, машинист-инструктор, профессор; но в указе: Президент Российской Федерации", "должности строчными, кроме высших государственных в официальных бумагах"], ["город Санкт-Петербург, река Нева, Белое море, Нижний Тагил", "родовое слово строчными, если оно не часть имени"]], "tip": "Хочется написать должность с большой «из уважения» — не надо: уважение правилом не считается."}, "ex": [{"k": "choice", "q": "После двоеточия идёт перечисление. Какая буква?", "options": ["строчная: «Взял: ключ, фонарь»", "прописная: «Взял: Ключ, фонарь»", "как захочется", "зависит от длины списка"], "explanation": "Перечисление после двоеточия — строчная. Прописная — только для прямой речи."}, {"k": "choice", "q": "Как оформить заголовок?", "options": ["Инструкция по охране труда", "Инструкция По Охране Труда", "ИНСТРУКЦИЯ по Охране труда", "инструкция по охране Труда"], "explanation": "В русском заголовке прописная только у первого слова и имён собственных."}, {"k": "choice", "q": "В письме коллеге", "options": ["начальник депо попросил", "Начальник Депо попросил", "Начальник депо попросил", "начальник Депо попросил"], "explanation": "Должность в обычном тексте — строчными."}, {"k": "choice", "q": "Как правильно?", "options": ["озеро Байкал, Белое море", "Озеро Байкал, Белое Море", "озеро байкал, белое море", "Озеро байкал, белое Море"], "explanation": "Родовое слово «озеро» строчными; в «Белое море» слово «Белое» — часть имени."}, {"k": "choice", "q": "Название в кавычках", "options": ["роман «Война и мир»", "роман «война и мир»", "роман «Война И Мир»", "Роман «Война и Мир»"], "explanation": "Первое слово в кавычках — с прописной, остальные — по общим правилам."}, {"k": "choice", "q": "Прямая речь после двоеточия", "options": ["Он спросил: «Ты готов?»", "Он спросил: «ты готов?»"], "explanation": "Прямая речь начинается с прописной."}, {"k": "choice", "q": "В обычном тексте", "options": ["директор завода", "Директор завода", "Директор Завода", "директор Завода"]}, {"k": "choice", "q": "Как правильно?", "options": ["река Волга, Чёрное море", "Река Волга, чёрное море", "река волга, Чёрное море", "Река Волга, Чёрное Море"], "explanation": "Родовое слово строчными; «Чёрное» — часть имени."}, {"k": "choice", "q": "Как правильно?", "options": ["доктор наук, профессор Иванов", "Доктор наук, Профессор Иванов", "доктор Наук, профессор Иванов", "Доктор Наук, Профессор Иванов"], "explanation": "Степени и звания — строчными."}, {"k": "choice", "q": "Перечисление после двоеточия", "options": ["Купи: хлеб, молоко, масло.", "Купи: Хлеб, молоко, масло."], "explanation": "Перечисление — строчная."}]},
      {"id": "r18", "t": "Кавычки, тире, дефис и пробелы", "plan": "какие знаки и где ставить пробелы", "theory": {"rule": "Русские кавычки — **«ёлочки»**, внутри них — „лапки“: «Роман „Онегин“». Прямые \" — только в коде. **Длинное тире (—)** с пробелами по сторонам: Москва — столица; между подлежащим и сказуемым, при паузе, в прямой речи. **Короткое тире (–)** без пробелов — в диапазонах: 2020–2025, 10:00–18:00, Москва–Петербург. **Дефис (-)** — только внутри слова: по-русски, кое-что, из-за, Ростов-на-Дону. Перед точкой, запятой, двоеточием, восклицательным и вопросительным знаками пробела нет, после них — есть. Внутри скобок и кавычек пробелов нет. Между числом и единицей — пробел: 5 кг, 20 °C; процент — слитно: 100%.", "ex": [["«Война и мир»; Он сказал: «Идём»; «Роман „Онегин“»", "основные — ёлочки, вложенные — лапки"], ["Москва — столица. Он пришёл — и все замолчали.", "длинное тире с пробелами"], ["2020–2025, 10:00–18:00, Москва–Петербург; по-русски, из-за, кое-кто", "диапазон — короткое тире без пробелов; внутри слова — дефис"], ["Привет! Как дела? 5 кг, 20 °C, 100%, (в скобках)", "перед знаком пробела нет, после — есть; единица через пробел, процент слитно"]], "tip": "На iPhone удержи клавишу дефиса — появятся тире; удержи клавишу кавычки — появятся «ёлочки»."}, "ex": [{"k": "choice", "q": "Русские кавычки", "options": ["«ёлочки»", "\"прямые\"", "'одинарные'", "“английские”"], "explanation": "Ёлочки. Прямые — только в коде."}, {"k": "choice", "q": "Между подлежащим и сказуемым", "options": ["Жизнь — борьба (длинное тире с пробелами)", "Жизнь-борьба (дефис)", "Жизнь - борьба (дефис с пробелами)", "Жизнь—борьба (тире без пробелов)"], "explanation": "Длинное тире, с пробелами с обеих сторон."}, {"k": "choice", "q": "Диапазон лет", "options": ["2020–2025 (короткое тире без пробелов)", "2020 — 2025 (длинное тире с пробелами)", "2020-2025 (дефис)", "2020 -- 2025 (два дефиса)"], "explanation": "Диапазоны — короткое тире без пробелов."}, {"k": "choice", "q": "Где всё верно?", "options": ["Привет! Как дела? Вес 5 кг.", "Привет !Как дела ?Вес 5кг.", "Привет ! Как дела ? Вес 5 кг .", "Привет!Как дела?Вес 5кг"], "explanation": "Пробел после знака, не перед; число и единица через пробел."}, {"k": "choice", "q": "Дефис уместен в", "options": ["по-русски, из-за", "Москва-столица", "2020-2025", "Он пришёл-и все замолчали"], "explanation": "Дефис живёт только внутри слова."}, {"k": "choice", "q": "Кавычки в русском тексте", "options": ["Он сказал: «Пора»", "Он сказал: \"Пора\"", "Он сказал: 'Пора'", "Он сказал: “Пора”"]}, {"k": "choice", "q": "Диапазон веков", "options": ["XI–XIII века (короткое тире)", "XI-XIII века (дефис)", "XI — XIII века (длинное тире с пробелами)"], "explanation": "Диапазон — короткое тире без пробелов."}, {"k": "choice", "q": "Где всё верно?", "options": ["(в скобках) и «в кавычках»", "( в скобках ) и « в кавычках »", "(в скобках ) и «в кавычках »"], "explanation": "Внутри скобок и кавычек пробелов нет."}, {"k": "choice", "q": "Маршрут", "options": ["Поезд Москва–Петербург", "Поезд Москва-Петербург", "Поезд Москва — Петербург"], "explanation": "Маршрут — короткое тире без пробелов."}, {"k": "choice", "q": "Дефис внутри слова", "options": ["кое-что, из-за, по-прежнему", "кое что, из за, по прежнему", "кое–что, из–за, по–прежнему"], "explanation": "Дефис — короткая чёрточка без пробелов."}]},
      {"id": "r19", "t": "Ввиду и в виду, несмотря на и не смотря", "plan": "слитно или раздельно — проверка заменой", "theory": {"rule": "**Ввиду** (слитно) = из-за: ввиду плохой погоды. **В виду** (раздельно) — в устойчивом «иметь в виду» и в значении «в пределах видимости»: судно шло в виду берега. **Несмотря на** (слитно) = хотя: несмотря на дождь, вышли. **Не смотря** (раздельно) = не глядя: шёл, не смотря под ноги. Проверка: заменяется на «из-за» или «хотя» — слитно; рядом глагол «смотреть» или слово «иметь» — раздельно. Так же **вследствие** = из-за (вследствие ошибки), а «в следствии по делу» — существительное «следствие».", "ex": [["Ввиду ремонта путь закрыт. Имей в виду: смена с восьми.", "ввиду = из-за; «иметь в виду» — всегда раздельно"], ["Несмотря на мороз, поезд ушёл вовремя. Он шёл, не смотря по сторонам.", "несмотря = хотя; не смотря = не глядя"], ["Вследствие задержки опоздали. В следствии по делу новые данные.", "предлог «из-за» — слитно; существительное «следствие» — раздельно"]], "tip": "Подставь «из-за» или «хотя»: подходит — пиши слитно."}, "ex": [{"k": "choice", "q": "«__ погоды рейс отменён»", "options": ["Ввиду", "В виду"], "explanation": "Ввиду = из-за — слитно."}, {"k": "choice", "q": "«Имей __: смена с восьми»", "options": ["в виду", "ввиду"], "explanation": "«Иметь в виду» — всегда раздельно."}, {"k": "choice", "q": "«__ усталость, он закончил работу»", "options": ["Несмотря на", "Не смотря на"], "explanation": "Несмотря = хотя — слитно."}, {"k": "choice", "q": "«Он шёл, __ под ноги»", "options": ["не смотря", "несмотря"], "explanation": "Не глядел под ноги — глагол «смотреть», раздельно."}, {"k": "input", "q": "Замени «из-за» одним словом с корнем «вид»: «__ ремонта путь закрыт»", "a": ["ввиду"], "explanation": "Ввиду — слитно, потому что заменяется на «из-за»."}, {"k": "choice", "q": "«__ на возражения, план приняли»", "options": ["Несмотря", "Не смотря"], "explanation": "Хотя были возражения — несмотря, слитно."}, {"k": "choice", "q": "«Суда шли __ берега»", "options": ["в виду", "ввиду"], "explanation": "В пределах видимости — раздельно."}, {"k": "choice", "q": "«__ ремонта движение изменено»", "options": ["Ввиду", "В виду"], "explanation": "Из-за ремонта — слитно."}, {"k": "choice", "q": "«В __ по делу появились новые факты»", "options": ["следствии", "следствие"], "explanation": "Существительное «следствие» в предложном падеже — раздельно, на -и."}, {"k": "input", "q": "Напиши целиком: «Он ушёл, (не)смотря на уговоры»", "a": ["несмотря"], "explanation": "Хотя уговаривали — несмотря на, слитно."}]},
      {"id": "r20", "t": "Списки и сокращения: т. д., кг, г. Москва", "plan": "оформление пунктов и где ставить точку в сокращении", "theory": {"rule": "В списке все пункты одной формы: либо все глаголы, либо все существительные. Пункт после **1.** (цифра с точкой) — с прописной, в конце точка. После **1)**, **а)** или **—** — со строчной, в конце точка с запятой, у последнего — точка. Сокращения **т. д., т. п., т. е., т. к., и др.** — с точками и пробелом между частями. Единицы измерения — без точки: 5 кг, 10 км, 30 мин, 2 ч (точка в конце предложения — не часть сокращения). Адресные — с точкой: г. Москва, ул. Ленина, д. 5, кв. 12. Звания и степени: проф., канд., доц., но д-р. В заголовках сокращения раскрывай полностью.", "ex": [["1. Проверить тормоза.\n2. Доложить диспетчеру.", "после «1.» — прописная, в конце точка"], ["а) проверить тормоза;\nб) доложить диспетчеру.", "после «а)» — строчная, точка с запятой, у последнего — точка"], ["и т. д., т. е., т. к., и др.", "точка и пробел между частями; «и т.д.» — ошибка"], ["5 кг, 10 км, 30 мин; г. Санкт-Петербург, ул. Ленина, д. 5", "единицы без точки, адресные сокращения с точкой"]], "tip": "Смешал в одном списке «проверка тормозов» и «доложить диспетчеру» — переделай всё в одну форму."}, "ex": [{"k": "choice", "q": "Пункт списка после «1.»", "options": ["С прописной и с точкой: «1. Проверить тормоза.»", "Со строчной и точкой с запятой: «1. проверить тормоза;»", "С прописной без знака: «1. Проверить тормоза»", "Как угодно"], "explanation": "После цифры с точкой — прописная и точка в конце."}, {"k": "choice", "q": "Как верно?", "options": ["и т. д.", "и т.д.", "и т д", "итд."], "explanation": "Точки и пробел между частями."}, {"k": "choice", "q": "Единицы измерения", "options": ["5 кг, 10 км", "5 кг., 10 км.", "5кг, 10км", "5 кг, 10 км."], "explanation": "Без точки и через пробел от числа."}, {"k": "choice", "q": "Какой список однородный?", "options": ["1. Проверить тормоза. 2. Доложить диспетчеру.", "1. Проверка тормозов. 2. Доложить диспетчеру.", "1. Тормоза. 2. Доложить.", "1. Проверить тормоза. 2. Диспетчер."], "explanation": "Оба пункта — глаголы. Смесь существительных и глаголов — ошибка."}, {"k": "input", "q": "Сократи «то есть» так, как принято", "a": ["т. е.", "т.е."], "explanation": "т. е. — с точками и пробелом."}, {"k": "choice", "q": "Как верно?", "options": ["и т. п.", "и т.п.", "и тп", "итп"]}, {"k": "choice", "q": "Адрес", "options": ["ул. Ленина, д. 5, кв. 12", "ул Ленина, д 5, кв 12", "ул. Ленина д.5 кв.12"], "explanation": "Адресные сокращения с точкой и пробелом."}, {"k": "choice", "q": "Пункт списка после тире", "options": ["— проверить тормоза;", "— Проверить тормоза.", "— проверить тормоза,"], "explanation": "После тире — строчная и точка с запятой."}, {"k": "choice", "q": "Единицы времени", "options": ["30 мин, 2 ч", "30 мин., 2 ч.", "30мин, 2ч"], "explanation": "Единицы без точки, через пробел."}, {"k": "input", "q": "Сократи «и так далее»", "a": ["и т. д.", "и т.д."], "explanation": "и т. д. — с точками и пробелом."}]},
      {"id": "rus-x3", "exam": true, "t": "Экзамен: правила 11–20", "covers": ["r11", "r12", "r13", "r14", "r15", "r16", "r17", "r18", "r19", "r20"], "pass": 0.8, "q": [{"k": "choice", "s": "r11", "q": "Где ошибка в деепричастном обороте?", "options": ["Подходя к станции, у меня зазвонил телефон", "Подходя к станции, я услышал звонок", "Когда я подходил к станции, зазвонил телефон", "Подойдя к станции, проверьте расписание"]}, {"k": "choice", "s": "r11", "q": "«Закончив смену, __»", "options": ["машинист сдал документы", "документы были сданы", "у машиниста закончились силы", "стало легче"]}, {"k": "input", "s": "r12", "q": "Вставь слово от «прогноз»: «Вопреки __ поезд пришёл вовремя»", "a": ["прогнозу"]}, {"k": "choice", "s": "r12", "q": "Как правильно?", "options": ["уверенность в победе", "уверенность в победу", "уверенность победы", "уверенность на победу"]}, {"k": "choice", "s": "r13", "q": "«Прибыли 22 __»", "options": ["вагона", "вагонов", "вагон"]}, {"k": "choice", "s": "r13", "q": "«Часть документов __ утрачена»", "options": ["была", "были"]}, {"k": "choice", "s": "r14", "q": "Где плеоназм?", "options": ["прейскурант цен", "прейскурант", "список цен", "цены на услуги"]}, {"k": "input", "s": "r14", "q": "Исправь «самый оптимальный» — оставь одно слово", "a": ["оптимальный"]}, {"k": "choice", "s": "r15", "q": "Живая замена «оказать содействие»", "options": ["помочь", "посодействовать в оказании", "произвести содействие", "осуществить помощь"]}, {"k": "choice", "s": "r15", "q": "Что из этого канцелярит?", "options": ["В целях обеспечения безопасности", "Чтобы было безопасно", "Для безопасности", "Ради безопасности"]}, {"k": "choice", "s": "r16", "q": "Дата в обычном тексте", "options": ["15 марта 2026 года", "15.03.2026 года", "15-ое марта 2026 года", "15 Марта 2026 года"]}, {"k": "choice", "s": "r16", "q": "Порядковое число", "options": ["2-го числа", "2ого числа", "2-ого числа", "2го числа"]}, {"k": "choice", "s": "r17", "q": "Должность в обычном тексте", "options": ["генеральный директор", "Генеральный Директор", "Генеральный директор", "генеральный Директор"]}, {"k": "choice", "s": "r17", "q": "Географические названия", "options": ["Нижний Тагил, город Москва", "Нижний тагил, Город Москва", "нижний Тагил, город москва", "Нижний Тагил, Город Москва"]}, {"k": "choice", "s": "r18", "q": "Прямая речь", "options": ["— Добрый день! — сказал он", "- Добрый день! - сказал он", "– Добрый день! – сказал он", "\"Добрый день!\"- сказал он"]}, {"k": "choice", "s": "r18", "q": "Процент и единица измерения", "options": ["100%, 5 кг", "100 %, 5кг", "100%, 5кг", "100 %, 5 кг."]}, {"k": "choice", "s": "r19", "q": "«__ плохой видимости скорость снижена»", "options": ["Ввиду", "В виду"]}, {"k": "choice", "s": "r19", "q": "«__ на усталость, бригада доехала»", "options": ["Несмотря", "Не смотря"]}, {"k": "choice", "s": "r20", "q": "Как верно?", "options": ["г. Москва, ул. Ленина, д. 5", "г Москва, ул Ленина, д 5", "г. Москва, ул. Ленина, д 5.", "г.Москва, ул.Ленина, д.5"]}, {"k": "choice", "s": "r20", "q": "Первый пункт списка после «а)»", "options": ["а) проверить тормоза;", "а) Проверить тормоза.", "а) Проверить тормоза;", "а) проверить тормоза,"]}]},
      {"id": "r21", "t": "Обращение, вводные слова, междометия", "plan": "запятые при обращении, вводных словах и междометиях", "theory": {"rule": "**Обращение** — слово, которым называют того, к кому обращаются; выделяется запятыми с обеих сторон: «Саша, подожди», «Скажи, Петя, ты готов?», «Привет, мама». **Вводные слова** выражают отношение говорящего (наверное, конечно, к счастью, по-моему, кажется, во-первых, пожалуйста) — их можно убрать без потери смысла, выделяются запятыми. **Не вводные** и запятыми не выделяются: вдруг, обязательно, даже, будто, вряд ли, всё-таки, якобы, именно. **Междометия** (ах, ой, эх) и слова **да, нет** в начале ответа отделяются запятой: «Ах, какой вечер!», «Да, я приду».", "ex": [["Саша, подожди меня. Скажи, Петя, ты готов? Привет, мама.", "обращение в начале, в середине и в конце — всегда запятые"], ["Наверное, завтра будет дождь. Он, конечно, придёт. К счастью, успели.", "вводное слово убирается без потери смысла"], ["Он вдруг остановился. Я обязательно приду. Вряд ли он успеет.", "вдруг, обязательно, вряд ли — не вводные, запятых нет"], ["Да, я приду. Нет, не согласен. Ой, забыл ключи!", "да, нет и междометия в начале — запятая"]], "tip": "В сообщениях самая частая ошибка — «Привет Саша» без запятой. Обращение всегда отделяется."}, "ex": [{"k": "choice", "q": "Где запятые стоят верно?", "options": ["Саша, подожди меня у входа.", "Саша подожди меня у входа."], "explanation": "Обращение в начале — запятая после него."}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Скажи, Петя, ты сделал уроки?", "Скажи, Петя ты сделал уроки?"], "explanation": "Обращение в середине — с двух сторон."}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Я тебя давно жду, дружище.", "Я тебя давно жду дружище."], "explanation": "Обращение в конце — запятая перед ним."}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Наверное, завтра будет дождь.", "Наверное завтра будет дождь."], "explanation": "Наверное — вводное, запятая."}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Он, конечно, придёт вовремя.", "Он, конечно придёт вовремя."], "explanation": "Конечно в середине — две запятые."}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Он вдруг остановился у двери.", "Он, вдруг, остановился у двери."], "explanation": "Вдруг — не вводное слово."}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Я обязательно приду на твой день рождения.", "Я, обязательно, приду на твой день рождения."], "explanation": "Обязательно — не вводное."}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Конечно, Маша, я тебе помогу.", "Конечно, Маша я тебе помогу."], "explanation": "И вводное, и обращение — три запятые."}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Вряд ли он успеет к обеду.", "Вряд ли, он успеет к обеду."], "explanation": "Вряд ли — не вводное, запятой нет."}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Да, я обязательно приду.", "Да я обязательно приду."], "explanation": "«Да» в начале ответа — запятая."}]},
      {"id": "r22", "t": "Причастный оборот: запятые", "plan": "оборот после определяемого слова выделяется, перед ним — нет", "theory": {"rule": "**Причастие** — признак по действию (читающий, прочитанный). **Причастный оборот** — причастие с зависимыми словами. Он выделяется запятыми, если стоит **после** слова, к которому относится: «мальчик, сидящий у окна, читал». Если стоит **перед** ним — запятых нет: «сидящий у окна мальчик читал». Оборот в середине предложения — запятые с обеих сторон, в конце — одна запятая перед ним. Исключение: оборот перед личным местоимением выделяется всегда: «Уставший за день, он уснул».", "ex": [["Мальчик, сидящий у окна, читал книгу.", "оборот после слова «мальчик» — выделен с двух сторон"], ["Сидящий у окна мальчик читал книгу.", "оборот перед словом — без запятых"], ["Мы шли по дороге, ведущей к реке.", "оборот в конце — одна запятая"], ["Уставший за день, он сразу уснул.", "перед местоимением выделяется всегда"]], "tip": "Найди причастие (-ущ/-ющ, -ащ/-ящ, -вш, -нн/-т), потом слово, к которому оно относится. Оборот после него — запятые."}, "ex": [{"k": "choice", "q": "Где запятые стоят верно?", "options": ["Мальчик, сидящий у окна, читал книгу.", "Мальчик, сидящий у окна читал книгу."]}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Мы шли по дороге, ведущей к реке.", "Мы шли по дороге ведущей к реке."]}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Сидящий у окна мальчик читал книгу.", "Сидящий у окна, мальчик читал книгу."], "explanation": "Оборот перед определяемым словом не выделяется."}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Листья, сорванные ветром, летели по улице.", "Листья, сорванные ветром летели по улице."]}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Опавшие с деревьев листья шуршали под ногами.", "Опавшие с деревьев, листья шуршали под ногами."], "explanation": "Оборот перед словом «листья» — без запятых."}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["На столе лежала книга, подаренная мне бабушкой.", "На столе лежала книга подаренная мне бабушкой."]}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Подаренная мне бабушкой книга лежала на столе.", "Подаренная мне бабушкой, книга лежала на столе."], "explanation": "Оборот перед словом — без запятых."}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Ребята, участвовавшие в конкурсе, получили грамоты.", "Ребята, участвовавшие в конкурсе получили грамоты."]}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Уставший за день, он сразу уснул.", "Уставший за день он сразу уснул."], "explanation": "Перед личным местоимением оборот выделяется всегда."}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Состав, прибывший на станцию, осмотрели.", "Состав прибывший на станцию осмотрели."], "explanation": "Оборот после слова «состав» — с двух сторон."}]},
      {"id": "r23", "t": "Сравнительный оборот и приложение", "plan": "запятые при как, словно, будто и при приложении", "theory": {"rule": "**Сравнительный оборот** со словами как, словно, будто, точно, что выделяется запятыми: «снег блестел, как серебро». **Не выделяется**, если это устойчивое выражение (лил как из ведра, бледный как смерть, работает как вол) или «как» значит «в качестве» (он известен как мастер). **Приложение** — другое название предмета. Распространённое приложение после главного слова выделяется запятыми: «Мой брат, ученик девятого класса, играет в шахматы». Одиночное приложение-имя не выделяется: «наш кот Барсик».", "ex": [["Снег блестел на солнце, как серебро.", "сравнение — запятая перед «как»"], ["Дождь лил как из ведра. Он известен как хороший мастер.", "устойчивое выражение и «как» = «в качестве» — без запятой"], ["Мой брат, ученик девятого класса, увлекается шахматами.", "распространённое приложение — с двух сторон"], ["Наш кот Барсик любит спать на подоконнике.", "одиночное имя-приложение — без запятых"]], "tip": "Перед «как» спроси: это сравнение с чем-то? Да — запятая. «В качестве» или поговорка — нет."}, "ex": [{"k": "choice", "q": "Где запятые стоят верно?", "options": ["Снег блестел на солнце, как серебро.", "Снег блестел на солнце как серебро."]}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Вода в озере была прозрачной, словно стекло.", "Вода в озере была прозрачной словно стекло."]}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Глаза у кота горели, как два огонька.", "Глаза у кота горели как два огонька."]}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Дождь лил как из ведра.", "Дождь лил, как из ведра."], "explanation": "Устойчивое выражение — без запятой."}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Облака плыли по небу, будто корабли.", "Облака плыли по небу будто корабли."]}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Мой брат, ученик девятого класса, увлекается шахматами.", "Мой брат, ученик девятого класса увлекается шахматами."]}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Москва, столица России, стоит на Москве-реке.", "Москва, столица России стоит на Москве-реке."]}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Ко мне подошла соседка, весёлая старушка.", "Ко мне подошла соседка весёлая старушка."]}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Наш кот Барсик любит спать на подоконнике.", "Наш кот, Барсик, любит спать на подоконнике."], "explanation": "Одиночное имя — без запятых."}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Он известен как опытный машинист.", "Он известен, как опытный машинист."], "explanation": "«Как» = «в качестве» — без запятой."}]},
      {"id": "r24", "t": "Н и НН в причастиях", "plan": "приставка, зависимое слово, -ова-/-ева- дают нн", "theory": {"rule": "В причастиях и отглагольных прилагательных **нн** пишется, если есть **приставка** (зажаренная, прочитанная, сломанная), **зависимое слово** (раненный в руку, жаренная на масле) или суффикс **-ова-/-ева-** (маринованный, рискованный). Иначе одна **н**: жареная картошка, кошеный луг, раненый боец. Приставка **не-** ничего не меняет: некрашеный пол. Исключения с одной н: кованый, жёваный. Краткие причастия всегда с одной н: книга прочитана, задача решена.", "ex": [["жареная картошка — зажаренная картошка — жаренная на масле картошка", "приставка или зависимое слово — нн"], ["маринованные огурцы, рискованный шаг", "-ова-/-ева- — нн"], ["некрашеный пол, кованый сундук", "не- не считается приставкой для этого правила; кованый — исключение"], ["книга прочитана, задача решена", "краткие причастия — одна н"]], "tip": "Три вопроса: приставка (кроме не-)? зависимое слово? -ова-/-ева-? Хоть один «да» — нн."}, "ex": [{"k": "choice", "q": "Вставь: «жаре_ая картошка»", "options": ["н", "нн"], "explanation": "Нет приставки и зависимых слов — одна н."}, {"k": "choice", "q": "Вставь: «зажаре_ая картошка»", "options": ["нн", "н"], "explanation": "Приставка за- — нн."}, {"k": "choice", "q": "Вставь: «прочита_ая книга»", "options": ["нн", "н"], "explanation": "Приставка про- — нн."}, {"k": "choice", "q": "Вставь: «маринова_ые огурцы»", "options": ["нн", "н"], "explanation": "-ова- — нн."}, {"k": "choice", "q": "Вставь: «слома_ая ветка»", "options": ["нн", "н"], "explanation": "Приставка с- — нн."}, {"k": "choice", "q": "Вставь: «ране_ый в руку боец»", "options": ["нн", "н"], "explanation": "Зависимое слово «в руку» — нн."}, {"k": "choice", "q": "Вставь: «некраше_ый пол»", "options": ["н", "нн"], "explanation": "Не- не считается — одна н."}, {"k": "choice", "q": "Вставь: «кова_ый сундук»", "options": ["н", "нн"], "explanation": "Исключение: кованый."}, {"k": "input", "q": "Напиши слово целиком: «Книга прочита_а»", "a": ["прочитана"], "explanation": "Краткое причастие — одна н."}, {"k": "input", "q": "Напиши слово целиком: «жаре_ая на масле рыба»", "a": ["жаренная"], "explanation": "Зависимое слово «на масле» — нн."}]},
      {"id": "r25", "t": "НЕ с разными частями речи", "plan": "слитно или раздельно по части речи и контексту", "theory": {"rule": "С **глаголами и деепричастиями** — раздельно: не знал, не читая. **Слитно**, если без не слово не употребляется (ненавидеть, негодовать, нелепый) или его можно заменить синонимом без не (невысокий = низкий, неправда = ложь). **Раздельно** при противопоставлении с союзом а (не правда, а ложь) и после слов далеко, вовсе, отнюдь, ничуть (вовсе не трудный). **Причастие:** одиночное — слитно (непрочитанная книга), с зависимым словом — раздельно (не прочитанная мной книга); краткое — всегда раздельно (не прочитана).", "ex": [["не знал, не читая, не было", "глаголы и деепричастия — раздельно"], ["ненавидеть, негодовать; невысокий (= низкий), неправда (= ложь)", "не употребляется без не или есть синоним — слитно"], ["не правда, а ложь; вовсе не трудный", "противопоставление с «а» и усилители — раздельно"], ["непрочитанная книга — не прочитанная мной книга — книга не прочитана", "причастие: одиночное слитно, с зависимым и краткое — раздельно"]], "tip": "Сначала определи часть речи: с глаголом — почти всегда раздельно, дальше смотри на синоним, «а» и зависимые слова."}, "ex": [{"k": "choice", "q": "Вставь: «(не)навидеть ложь»", "options": ["слитно", "раздельно"], "explanation": "Без не не употребляется."}, {"k": "choice", "q": "Вставь: «(не)правда, а ложь»", "options": ["раздельно", "слитно"], "explanation": "Противопоставление с «а»."}, {"k": "choice", "q": "Вставь: «(не)высокий дом»", "options": ["слитно", "раздельно"], "explanation": "Невысокий = низкий."}, {"k": "choice", "q": "Вставь: «(не)прочитанная мной книга»", "options": ["раздельно", "слитно"], "explanation": "Зависимое слово «мной»."}, {"k": "choice", "q": "Вставь: «(не)прочитанная книга»", "options": ["слитно", "раздельно"], "explanation": "Одиночное причастие — слитно."}, {"k": "choice", "q": "Вставь: «(не)знал ответа»", "options": ["раздельно", "слитно"], "explanation": "Глагол — раздельно."}, {"k": "choice", "q": "Вставь: «(не)годовать от обиды»", "options": ["слитно", "раздельно"], "explanation": "Негодовать без не не употребляется."}, {"k": "choice", "q": "Вставь: «(не)смотря под ноги»", "options": ["раздельно", "слитно"], "explanation": "Деепричастие — раздельно."}, {"k": "input", "q": "Напиши целиком: «вовсе (не)трудная задача»", "a": ["вовсе не трудная"], "explanation": "После «вовсе» — раздельно."}, {"k": "input", "q": "Напиши целиком: «письмо (не)отправлено»", "a": ["не отправлено"], "explanation": "Краткое причастие — раздельно."}]},
      {"id": "r26", "t": "Приставки пре-/при-, з/с на конце приставок", "plan": "значение приставки и следующий согласный", "theory": {"rule": "**При-** — приближение, присоединение, близость, неполнота действия: приехать, пришить, привокзальный, приоткрыть. **Пре-** — значение «очень» или «пере-»: прекрасный, преодолеть, преградить. Слова, которые надо запомнить: пренебрегать, преграда, привередливый, привилегия, президент. **Приставки на з/с** (без-/бес-, раз-/рас-, из-/ис-, воз-/вос-): перед звонким согласным и гласным — з (раздать, безоблачный, безвкусный), перед глухим — с (бесполезный, исписать, рассказать). Приставка с- одна и всегда с: сделать, сбежать.", "ex": [["приехать, пришить, привокзальный, приоткрыть", "при-: ближе, вместе, рядом, чуть-чуть"], ["прекрасный, преодолеть, преградить, пренебрегать", "пре-: очень или пере-; пренебрегать — запомнить"], ["раздать, безоблачный, безвкусный — бесполезный, исписать, рассказать", "з перед звонким, с перед глухим"], ["сделать, сбежать, сжечь", "с- не меняется никогда"]], "tip": "Глухие согласные запоминают фразой «Степка, хочешь щец? — Фи!»: перед ними — с."}, "ex": [{"k": "choice", "q": "Вставь: «пр_ехать в город»", "options": ["и", "е"], "explanation": "Приближение — при-."}, {"k": "choice", "q": "Вставь: «пр_красный день»", "options": ["е", "и"], "explanation": "Очень красивый — пре-."}, {"k": "choice", "q": "Вставь: «пр_вокзальная площадь»", "options": ["и", "е"], "explanation": "Рядом с вокзалом — при-."}, {"k": "choice", "q": "Вставь: «пр_одолеть трудности»", "options": ["е", "и"], "explanation": "Пере- — пре-."}, {"k": "choice", "q": "Вставь: «пр_шить пуговицу»", "options": ["и", "е"], "explanation": "Присоединение — при-."}, {"k": "choice", "q": "Вставь: «пр_небрегать советом»", "options": ["е", "и"], "explanation": "Запомнить: пренебрегать."}, {"k": "choice", "q": "Вставь: «пр_открыть дверь»", "options": ["и", "е"], "explanation": "Неполнота действия — при-."}, {"k": "choice", "q": "Вставь: «пр_града на пути»", "options": ["е", "и"], "explanation": "Запомнить: преграда."}, {"k": "choice", "q": "Вставь: «бе_полезный совет»", "options": ["с", "з"], "explanation": "Перед глухим п — с."}, {"k": "choice", "q": "Вставь: «ра_дать тетради»", "options": ["з", "с"], "explanation": "Перед звонким д — з."}]},
      {"id": "r27", "t": "Корни с чередованием", "plan": "лаг/лож, раст/рос, кас/кос, гар/гор, зар/зор, бер/бир", "theory": {"rule": "Эти корни ударением не проверяют — у каждого своё правило. **Лаг/лож:** перед г — а, перед ж — о: предлагать, положить. **Раст/ращ/рос:** перед ст и щ — а (растение, выращенный), иначе о (вырос); исключения: росток, ростовщик, отрасль, Ростов. **Кас/кос:** есть суффикс -а- после корня — а (касаться), нет — о (коснуться). **Гар/гор:** без ударения о (загорать, горелый), под ударением как слышим (загар). **Зар/зор:** без ударения а (заря, озарять), под ударением как слышим (зорька). **Бер/бир, мер/мир, тер/тир, блест/блист:** есть суффикс -а- — и (собирать, блистать, замирать), нет — е (соберу, блестеть, замереть).", "ex": [["предлагать — положить; растение, выращенный — вырос; росток", "буква после корня решает; росток — исключение"], ["касаться — коснуться; собирать — соберу; блистать — блестеть", "суффикс -а- после корня — а или и"], ["загорать, горелый — загар; заря, озарять — зорька", "гар/гор и зар/зор — по ударению, в разные стороны"], ["пловец, пловчиха — но плавать, плавучий", "корень плав- всегда с а, кроме пловец и пловчиха"]], "tip": "Увидел корень из списка — забудь про проверочные слова и применяй его правило."}, "ex": [{"k": "choice", "q": "Вставь: «р_стение»", "options": ["а", "о"], "explanation": "Перед ст — а."}, {"k": "choice", "q": "Вставь: «р_сток»", "options": ["о", "а"], "explanation": "Исключение: росток."}, {"k": "choice", "q": "Вставь: «пол_жить»", "options": ["о", "а"], "explanation": "Перед ж — о."}, {"k": "choice", "q": "Вставь: «предл_гать»", "options": ["а", "о"], "explanation": "Перед г — а."}, {"k": "choice", "q": "Вставь: «заг_рать на пляже»", "options": ["о", "а"], "explanation": "Без ударения — о."}, {"k": "choice", "q": "Вставь: «з_ря»", "options": ["а", "о"], "explanation": "Без ударения — а."}, {"k": "choice", "q": "Вставь: «к_саться рукой»", "options": ["а", "о"], "explanation": "Есть -а- — касаться."}, {"k": "choice", "q": "Вставь: «к_снуться рукой»", "options": ["о", "а"], "explanation": "Нет -а- — коснуться."}, {"k": "choice", "q": "Вставь: «бл_стать на солнце»", "options": ["и", "е"], "explanation": "Есть -а- — и."}, {"k": "choice", "q": "Вставь: «зам_рать от страха»", "options": ["и", "е"], "explanation": "Есть -а- — и."}]},
      {"id": "r28", "t": "О и Ё после шипящих, Ы и И после Ц", "plan": "проверка родственным словом и место в слове", "theory": {"rule": "**После шипящих (ж, ш, ч, щ) в корне** под ударением пишется **ё**, если есть родственное слово с е: жёлтый — желтеть, шёпот — шептать, чёрный — чернеть. Нет такой проверки — **о**: шорох, шоколад, шов, капюшон, крыжовник. **В суффиксах и окончаниях** существительных и прилагательных под ударением — о (речонка, бочок, большого), но в словах от глаголов — ё (тушёнка, сгущёнка, печёный). **После ц:** в корне — и (цирк, цифра, станция), в окончаниях и суффиксах — ы (огурцы, птицы, сестрицын). Исключения: цыган, цыплёнок, на цыпочках, цыц.", "ex": [["жёлтый — желтеть; шёпот — шептать; чёрный — чернеть", "есть слово с е — пиши ё"], ["шорох, шоколад, шов, капюшон, крыжовник", "проверки нет — о"], ["речонка, бочок — тушёнка, печёный", "в суффиксе о, но от глагола — ё"], ["цирк, цифра, станция — огурцы, птицы; цыган, цыплёнок", "корень — и, окончание — ы, четыре исключения"]], "tip": "Для шипящих ищи «брата» с е: нашёл — ё. Для ц смотри, где буква стоит: корень или окончание."}, "ex": [{"k": "choice", "q": "Вставь: «ж_лтый лист»", "options": ["ё", "о"], "explanation": "Желтеть — есть е, значит ё."}, {"k": "choice", "q": "Вставь: «ш_рох листьев»", "options": ["о", "ё"], "explanation": "Проверки нет — о."}, {"k": "choice", "q": "Вставь: «реч_нка в лесу»", "options": ["о", "ё"], "explanation": "Суффикс существительного под ударением — о."}, {"k": "choice", "q": "Вставь: «банка туш_нки»", "options": ["ё", "о"], "explanation": "От глагола «тушить» — ё."}, {"k": "choice", "q": "Вставь: «ш_пот в темноте»", "options": ["ё", "о"], "explanation": "Шептать — ё."}, {"k": "choice", "q": "Вставь: «ц_рк»", "options": ["и", "ы"], "explanation": "В корне — и."}, {"k": "choice", "q": "Вставь: «солёные огурц_»", "options": ["ы", "и"], "explanation": "В окончании — ы."}, {"k": "choice", "q": "Вставь: «ц_плёнок»", "options": ["ы", "и"], "explanation": "Исключение: цыплёнок."}, {"k": "choice", "q": "Вставь: «станц_я метро»", "options": ["и", "ы"], "explanation": "В корне (-ция) — и."}, {"k": "choice", "q": "Вставь: «ц_фра»", "options": ["и", "ы"], "explanation": "В корне — и."}]},
      {"id": "r29", "t": "Ь после шипящих, наречия на -о/-а", "plan": "род существительного, наречия, приставки из-/до-/с-", "theory": {"rule": "**Ь после шипящих** на конце слова: у существительных женского рода — пишется (ночь, рожь, мышь), мужского — нет (мяч, камыш, врач). В глаголах — всегда (пишешь, беречь, плачь, режьте). В наречиях — пишется (настежь, вскачь, прочь, наотмашь), кроме уж, замуж, невтерпёж. В кратких прилагательных — нет (хорош, свеж, могуч). **О и А на конце наречий:** приставки **из-, до-, с-** дают -а (издалека, досуха, слева, добела); приставки **в-, на-, за-** дают -о (вправо, насухо, засветло).", "ex": [["ночь, рожь, мышь — мяч, камыш, врач", "женский род — ь, мужской — без"], ["пишешь, беречь, не плачь, режьте", "глаголы — всегда ь"], ["настежь, вскачь, прочь — уж, замуж, невтерпёж", "наречия — ь, три исключения"], ["издалека, досуха, слева — вправо, насухо, засветло", "из/до/с — а; в/на/за — о"]], "tip": "Для наречий подставь окно: из окна, до окна, с окна — но в окно, на окно, за окно. Окончание «окна» подскажет букву."}, "ex": [{"k": "choice", "q": "Вставь: «тёмная ноч_»", "options": ["ь", "без ь"], "explanation": "Ночь — женский род."}, {"k": "choice", "q": "Вставь: «новый мяч_»", "options": ["без ь", "ь"], "explanation": "Мяч — мужской род."}, {"k": "choice", "q": "Вставь: «поле, где растёт рож_»", "options": ["ь", "без ь"], "explanation": "Рожь — женский род."}, {"k": "choice", "q": "Вставь: «высокий камыш_»", "options": ["без ь", "ь"], "explanation": "Камыш — мужской род."}, {"k": "choice", "q": "Вставь: «Не плач_!»", "options": ["ь", "без ь"], "explanation": "Глагол повелительного наклонения — ь."}, {"k": "choice", "q": "Вставь: «распахнуть дверь настеж_»", "options": ["ь", "без ь"], "explanation": "Наречие — ь."}, {"k": "choice", "q": "Вставь: «выйти замуж_»", "options": ["без ь", "ь"], "explanation": "Исключение: замуж."}, {"k": "choice", "q": "Вставь: «обойти лужу слев_»", "options": ["а", "о"], "explanation": "С- → -а."}, {"k": "choice", "q": "Вставь: «повернуть вправ_»", "options": ["о", "а"], "explanation": "В- → -о."}, {"k": "choice", "q": "Вставь: «вернуться засветл_»", "options": ["о", "а"], "explanation": "За- → -о."}]},
      {"id": "r30", "t": "Суффиксы -чик/-щик, -ек/-ик; не и ни в местоимениях", "plan": "выбор суффикса и ударение в отрицательных местоимениях", "theory": {"rule": "**-Чик-/-щик-:** после д, т, з, с, ж пишется -чик (разведчик, переводчик, перебежчик, резчик), после остальных согласных — -щик (каменщик, сварщик, барабанщик). **-Ек-/-ик-:** измени слово; гласная выпадает — пиши -ек (замочек — замочка, горошек — горошка), остаётся — -ик (ключик — ключика, карандашик — карандашика). **Не и ни в отрицательных местоимениях и наречиях:** под ударением — не (нЕкого спросить, нЕчем заняться, нЕкогда отдохнуть), без ударения — ни (никогО не видел, ничЕм не занят, никогдА не сдавался). Подсказка: «ни» почти всегда стоит рядом с другим отрицанием «не».", "ex": [["разведчик, переводчик, перебежчик — каменщик, сварщик, барабанщик", "д, т, з, с, ж — чик; остальные — щик"], ["замочек — замочка; ключик — ключика", "выпадает гласная — ек"], ["нЕкого спросить — никогО не встретил; нЕчем заняться — ничЕм не могу помочь", "ударение решает: не — ударное, ни — безударное"], ["нЕкогда отдохнуть — никогдА не сдавался", "рядом с «не сдавался» — ни"]], "tip": "Для -чик- запомни пять букв: д, т, з, с, ж — «ДеТи ЗаСЖали». Для не/ни произнеси слово вслух и послушай ударение."}, "ex": [{"k": "choice", "q": "Вставь: «развед_ик»", "options": ["ч", "щ"], "explanation": "После д — чик."}, {"k": "choice", "q": "Вставь: «камен_ик»", "options": ["щ", "ч"], "explanation": "После н — щик."}, {"k": "choice", "q": "Вставь: «свар_ик»", "options": ["щ", "ч"], "explanation": "После р — щик."}, {"k": "choice", "q": "Вставь: «замоч_к»", "options": ["е", "и"], "explanation": "Замочка — гласная выпала: ек."}, {"k": "choice", "q": "Вставь: «ключ_к»", "options": ["и", "е"], "explanation": "Ключика — гласная осталась: ик."}, {"k": "choice", "q": "Вставь: «горош_к»", "options": ["е", "и"], "explanation": "Горошка — ек."}, {"k": "choice", "q": "Вставь: «н_кого спросить»", "options": ["е", "и"], "explanation": "Ударение на не: нЕкого."}, {"k": "choice", "q": "Вставь: «н_кого не встретил»", "options": ["и", "е"], "explanation": "Безударное — ни, рядом «не встретил»."}, {"k": "choice", "q": "Вставь: «н_когда отдохнуть»", "options": ["е", "и"], "explanation": "НЕкогда — под ударением."}, {"k": "choice", "q": "Вставь: «н_когда не сдавался»", "options": ["и", "е"], "explanation": "НикогдА — без ударения."}]},
      {"id": "rus-x4", "exam": true, "t": "Экзамен: правила 21–30", "covers": ["r21", "r22", "r23", "r24", "r25", "r26", "r27", "r28", "r29", "r30"], "pass": 0.8, "q": [{"k": "choice", "q": "Где запятые стоят верно?", "options": ["Ребята, завтра мы едем на экскурсию.", "Ребята завтра мы едем на экскурсию."], "s": "r21"}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Он, видимо, забыл про встречу.", "Он, видимо забыл про встречу."], "s": "r21"}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Мальчик, сидящий у окна, читал книгу.", "Мальчик сидящий у окна читал книгу."], "s": "r22"}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Листья, сорванные ветром, летели по улице.", "Листья сорванные ветром, летели по улице."], "s": "r22"}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Облака плыли по небу, будто корабли.", "Облака плыли по небу будто корабли."], "s": "r23"}, {"k": "choice", "q": "Где запятые стоят верно?", "options": ["Москва, столица России, стоит на Москве-реке.", "Москва, столица России стоит на Москве-реке."], "s": "r23"}, {"k": "choice", "q": "Вставь: «зажаре_ая картошка»", "options": ["нн", "н"], "s": "r24"}, {"k": "choice", "q": "Вставь: «маринова_ые огурцы»", "options": ["нн", "н"], "s": "r24"}, {"k": "choice", "q": "Вставь: «(не)правда, а ложь»", "options": ["раздельно", "слитно"], "s": "r25"}, {"k": "choice", "q": "Вставь: «(не)прочитанная книга»", "options": ["слитно", "раздельно"], "s": "r25"}, {"k": "choice", "q": "Вставь: «пр_одолеть трудности»", "options": ["е", "и"], "s": "r26"}, {"k": "choice", "q": "Вставь: «бе_вкусный суп»", "options": ["з", "с"], "s": "r26"}, {"k": "choice", "q": "Вставь: «р_стение»", "options": ["а", "о"], "s": "r27"}, {"k": "choice", "q": "Вставь: «к_снуться рукой»", "options": ["о", "а"], "s": "r27"}, {"k": "choice", "q": "Вставь: «ш_рох листьев»", "options": ["о", "ё"], "s": "r28"}, {"k": "choice", "q": "Вставь: «перелётные птиц_»", "options": ["ы", "и"], "s": "r28"}, {"k": "choice", "q": "Вставь: «уйти проч_»", "options": ["ь", "без ь"], "s": "r29"}, {"k": "choice", "q": "Вставь: «приехать издалек_»", "options": ["а", "о"], "s": "r29"}, {"k": "choice", "q": "Вставь: «перевод_ик»", "options": ["ч", "щ"], "s": "r30"}, {"k": "choice", "q": "Вставь: «н_чем не могу помочь»", "options": ["и", "е"], "s": "r30"}]}
    ]
  },
  {
  "id": "rus-ege",
  "cat": "rus",
  "name": "ЕГЭ по русскому языку",
  "type": "path",
  "unit": "задание",
  "goal": "Задания в формате ЕГЭ-2026 с разбором ловушек и пробными блоками. Блок 1 — задания 4–15 (нормы и орфография); дальше пунктуация (16–21), работа с текстом (1–3, 22–26) и сочинение (27).",
  "prompt": "Разбери со мной задание ЕГЭ по русскому языку «{t}». Что оно проверяет: {plan}. Дай 5 заданий в формате экзамена, проверь мои ответы, объясни каждую ошибку правилом и дай ещё 3 похожих задания на то, где я ошибся.",
  "resources": [
    {
      "href": "https://fipi.ru/ege/demoversii-specifikacii-kodifikatory",
      "label": "Демоверсия и кодификатор ФИПИ"
    }
  ],
  "steps": [
    {
      "id": "ege-04",
      "t": "Задание 4. Ударение",
      "plan": "найти слово, где ударение поставлено неверно",
      "theory": {
        "rule": "В задании 4 даны пять слов с выделенным ударным гласным; одно из них ударено неверно — его и выписывают. Слова берутся из орфоэпического словника ФИПИ, поэтому учить надо список, а не правило. Опоры: глаголы на -ить чаще с ударением на окончании (звонИт, включИт, вручИт, сверлИт); в прошедшем времени женского рода ударение уходит на -а (бралА, ждалА, понялА, началА), кроме клАла, крАла, слАла; существительные с -провод — на О (нефтепровОд, мусоропровОд); -лог — чаще на О (каталОг, диалОг, некролОг), но анАлог; прилагательные на -ый: красИвее, слИвовый, кУхонный, оптОвый, украИнский. Запоминай ошибкоопасные пары: тОрты, бАнты, шАрфы, пОрты (ударение на корне во всех формах).",
        "ex": [
          [
            "звонИт, включИт, облегчИт, вручИт, сверлИт",
            "глаголы на -ить — на окончание"
          ],
          [
            "бралА, ждалА, понялА, началА, но: клАла, крАла, слАла",
            "женский род прошедшего времени — на -а, три исключения"
          ],
          [
            "тОрты, бАнты, шАрфы, крАны, срЕдства, Иксы, лЕкторы",
            "ударение не сдвигается во множественном числе"
          ],
          [
            "каталОг, квартАл, досУг, щавЕль, жалюзИ, диспансЕр, дефИс, столЯр",
            "частые ошибки на первом слоге — здесь он безударный"
          ]
        ],
        "tip": "Для этого задания работает только словник ФИПИ: распечатай его и отмечай слова, где ошибся дважды."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Где ударение поставлено НЕВЕРНО?",
          "options": [
            "тортЫ",
            "бАнты",
            "звонИт",
            "красИвее"
          ],
          "explanation": "тОрты — ударение на корне во всех формах."
        },
        {
          "k": "choice",
          "q": "Где ударение поставлено НЕВЕРНО?",
          "options": [
            "катАлог",
            "квартАл",
            "досУг",
            "щавЕль"
          ],
          "explanation": "каталОг — на последний слог, как диалОг."
        },
        {
          "k": "choice",
          "q": "Где ударение поставлено НЕВЕРНО?",
          "options": [
            "клалА",
            "бралА",
            "понялА",
            "началА"
          ],
          "explanation": "клАла — одно из трёх исключений: клАла, крАла, слАла."
        },
        {
          "k": "input",
          "q": "Напиши слово «нефтепровод» заглавной буквой на ударной гласной, как в словнике (например: звонИт)",
          "a": [
            "нефтепровОд"
          ],
          "explanation": "Все слова на -провод (труба) — ударение на О: нефтепровОд, газопровОд, мусоропровОд."
        },
        {
          "k": "choice",
          "q": "Где ударение поставлено ВЕРНО?",
          "options": [
            "облегчИть",
            "облЕгчить",
            "обеспечЕние",
            "срЕдствА"
          ],
          "explanation": "облегчИть — на окончание, как у большинства глаголов на -ить; обеспЕчение; срЕдства."
        }
      ]
    },
    {
      "id": "ege-05",
      "t": "Задание 5. Паронимы",
      "plan": "заменить неверно употреблённый пароним",
      "theory": {
        "rule": "**Паронимы** — похожие по звучанию слова с разным значением: эффектный (яркий) и эффективный (действенный). В задании 5 в одном из пяти предложений выделенное слово употреблено неверно — надо выписать правильный пароним. Решают по значению: **абонент** — человек, **абонемент** — документ; **адресат** — получатель, **адресант** — отправитель; **дипломат** — чиновник, **дипломант** — победитель конкурса; **ветреный** — день, человек; **ветряной** — двигатель, мельница; **искусный** — умелый, **искусственный** — ненастоящий; **сытый** — человек, **сытный** — обед; **практичный** — удобный, **практический** — связанный с практикой; **дружеский** — между друзьями, **дружественный** — между странами; **годовой** — за год, **годовалый** — возрастом в год; **представить** — показать, подать (отчёт, к награде), **предоставить** — дать в пользование (отпуск, слово).",
        "ex": [
          [
            "Абонент не отвечает. Абонемент в бассейн.",
            "человек — абонент, документ — абонемент"
          ],
          [
            "Ветреный день, ветряная мельница",
            "ветреный — с ветром; ветряной — работающий от ветра"
          ],
          [
            "Эффективное лекарство, эффектный наряд",
            "действенное — эффективное; яркое — эффектное"
          ],
          [
            "Представить отчёт, предоставить отпуск",
            "подать, показать — представить; дать — предоставить"
          ]
        ],
        "tip": "Перед тем как выписать ответ, подставь оба паронима в предложение и проверь смысл: неверное слово обычно «не держит» контекст."
      },
      "ex": [
        {
          "k": "input",
          "q": "Замени неверно употреблённое слово: «Врач назначил ЭФФЕКТНЫЙ способ лечения»",
          "a": [
            "эффективный"
          ],
          "explanation": "Действенный — эффективный. Эффектный — яркий, производящий впечатление."
        },
        {
          "k": "input",
          "q": "Замени неверно употреблённое слово: «АБОНЕМЕНТ временно недоступен»",
          "a": [
            "абонент"
          ],
          "explanation": "Недоступен человек — абонент. Абонемент — документ на посещение."
        },
        {
          "k": "choice",
          "q": "В каком предложении слово употреблено ВЕРНО?",
          "options": [
            "На столе стоял СЫТНЫЙ обед",
            "Он вернулся СЫТНЫМ и довольным",
            "Нас встретил ДИПЛОМАТ конкурса",
            "В ДРУЖЕСКИХ отношениях между странами наметился перелом"
          ],
          "explanation": "Сытный — обед; сытый — человек; дипломант — победитель; дружественные — между странами."
        },
        {
          "k": "input",
          "q": "Замени неверно употреблённое слово: «Шуба из ИСКУСНОГО меха»",
          "a": [
            "искусственного"
          ],
          "explanation": "Ненастоящий — искусственный. Искусный — умелый."
        },
        {
          "k": "input",
          "q": "Замени неверно употреблённое слово: «Начальник ПРЕДСТАВИЛ мне отпуск»",
          "a": [
            "предоставил"
          ],
          "explanation": "Дать в пользование — предоставить. Представить — показать, подать: представить отчёт, представить к награде."
        }
      ]
    },
    {
      "id": "ege-06",
      "t": "Задание 6. Лексические нормы: лишнее слово",
      "plan": "исключить лишнее слово или заменить неверное",
      "theory": {
        "rule": "Задание 6 бывает в двух видах. **Первый:** исключи лишнее слово — плеоназм: «в марте месяце», «впервые дебютировал», «свободная вакансия», «подняться наверх», «главная суть», «ландшафт местности», «памятный сувенир», «молодой юноша». Выписываешь именно лишнее слово. **Второй:** замени неверно употреблённое слово в устойчивом сочетании: «играть значение» → роль, «иметь роль» → значение, «одержать первенство» → победу, «повысить кругозор» → расширить, «оказать вред» → нанести, «уделять заботу» → внимание. Выписываешь слово-замену. Проверка на лишнее слово: убери его — смысл не изменился.",
        "ex": [
          [
            "В марте месяце; впервые дебютировал; свободная вакансия",
            "лишние: месяце, впервые, свободная"
          ],
          [
            "играть роль, иметь значение, одержать победу, расширить кругозор",
            "устойчивые сочетания — слова в них не меняют местами"
          ],
          [
            "Он вернулся обратно домой",
            "лишнее «обратно»: вернуться — уже назад"
          ],
          [
            "Это очень большое и огромное здание",
            "«большое и огромное» — одно из слов лишнее"
          ]
        ],
        "tip": "Если в задании написано «исключив лишнее слово» — выписывай лишнее; если «заменив неверно употреблённое» — выписывай новое слово. Перепутать — потерять балл."
      },
      "ex": [
        {
          "k": "input",
          "q": "Выпиши лишнее слово: «Ремонт путей начнётся в апреле месяце»",
          "a": [
            "месяце"
          ],
          "explanation": "Апрель и так месяц."
        },
        {
          "k": "input",
          "q": "Выпиши лишнее слово: «Молодой певец впервые дебютировал на этой сцене»",
          "a": [
            "впервые"
          ],
          "explanation": "Дебют — всегда первое выступление."
        },
        {
          "k": "input",
          "q": "Замени неверно употреблённое слово: «Это обстоятельство играет большое значение»",
          "a": [
            "роль"
          ],
          "explanation": "Играть роль, иметь значение."
        },
        {
          "k": "input",
          "q": "Выпиши лишнее слово: «Мы поднялись наверх по лестнице»",
          "a": [
            "наверх"
          ],
          "explanation": "Подняться — уже наверх."
        },
        {
          "k": "input",
          "q": "Замени неверно употреблённое слово: «Команда одержала первенство в турнире»",
          "a": [
            "победу"
          ],
          "explanation": "Одержать победу; первенство завоёвывают."
        }
      ]
    },
    {
      "id": "ege-07",
      "t": "Задание 7. Морфологические нормы: форма слова",
      "plan": "найти ошибку в образовании формы слова",
      "theory": {
        "rule": "В задании 7 из пяти словосочетаний одно содержит ошибку в форме слова; записывают исправленное слово. Самые частые ловушки. **Сравнительная степень:** нельзя «более красивее», «самый красивейший» — только «более красивый» или «красивее». **Глаголы:** поезжай (не «ехай», «едь»), ляг, лягте (не «ляжь»), клади (не «ложи»), жжёт, печёт, хотят (не «хочут»). **Родительный множественного:** килограмм помидоров, апельсинов, носков; но чулок, сапог, ботинок, туфель, яблок, грузин, солдат, партизан. **Числительные:** обеих сестёр (ж. р.), обоих братьев; двумястами, пятьюстами; трое мужчин, но три девушки (собирательные не с женским родом); в две тысячи пятом году (склоняется только последнее слово). **Множественное число:** торты, договоры, инженеры, бухгалтеры, шофёры; но директора, профессора, доктора. **Местоимения:** их, а не «ихний»; у неё, а не «у ней».",
        "ex": [
          [
            "более красивый / красивее — не «более красивее»",
            "или «более», или суффикс -ее; вместе — ошибка"
          ],
          [
            "поезжай, ляг, клади, положи, жжёт, печёт, хотят",
            "правильные формы глаголов, где ошибаются чаще всего"
          ],
          [
            "килограмм помидоров, пара носков; но пара чулок, сапог, туфель, яблок",
            "окончание -ов есть не у всех"
          ],
          [
            "обеих сестёр, обоих братьев; двумястами рублями; трое мальчиков, три девочки",
            "оба — для мужского и среднего, обе — для женского"
          ]
        ],
        "tip": "Сомневаешься в родительном множественного — спроси «нет кого/чего?» и проверь по словарю: чулок, но носков."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Где ошибка в образовании формы слова?",
          "options": [
            "более красивее",
            "пять килограммов",
            "ляг на пол",
            "их дети"
          ],
          "explanation": "Сравнительная степень образуется одним способом: более красивый или красивее."
        },
        {
          "k": "choice",
          "q": "Где ошибка в образовании формы слова?",
          "options": [
            "ехай быстрее",
            "пара носков",
            "обеих сестёр",
            "в две тысячи пятом году"
          ],
          "explanation": "Повелительное наклонение от «ехать» — поезжай."
        },
        {
          "k": "input",
          "q": "Исправь ошибку и напиши слово верно: «килограмм помидор»",
          "a": [
            "помидоров"
          ],
          "explanation": "Помидоров, апельсинов, мандаринов — с окончанием -ов. Без окончания: яблок, чулок, сапог."
        },
        {
          "k": "input",
          "q": "Исправь ошибку и напиши слово верно: «с двухстами рублями»",
          "a": [
            "двумястами"
          ],
          "explanation": "В сложных числительных склоняются обе части: двумястами, тремястами, пятьюстами."
        },
        {
          "k": "choice",
          "q": "Где ошибка в образовании формы слова?",
          "options": [
            "трое подруг",
            "трое друзей",
            "пара туфель",
            "опытные бухгалтеры"
          ],
          "explanation": "Собирательные числительные (двое, трое) не сочетаются с существительными женского рода: три подруги."
        }
      ]
    },
    {
      "id": "ege-08",
      "t": "Задание 8. Синтаксические нормы: грамматические ошибки",
      "plan": "узнать тип грамматической ошибки в предложении",
      "theory": {
        "rule": "Задание 8 даёт 2 балла: нужно соотнести пять предложений с ошибками и типы ошибок. Основные типы. **Деепричастный оборот:** действие деепричастия и сказуемого должно совершать одно лицо («Подъезжая к станции, слетела шляпа» — ошибка). **Причастный оборот:** причастие согласуется с определяемым словом и не разрывает его («Книга, прочитанной мной» — ошибка). **Подлежащее и сказуемое:** «Все, кто пришёл, были рады» — «кто» с единственным числом, «все» со множественным; «Те, кто опоздал, не попал» — ошибка. **Предлог и падеж:** согласно приказу, благодаря помощи, по окончании, по приезде. **Косвенная речь:** нельзя смешивать прямую и косвенную: «Он сказал, что я устал» (если устал он — «что он устал»). **Однородные члены:** не ставить рядом родовое и видовое («фрукты и яблоки»), не соединять разные части речи («любит читать и музыку»), двойные союзы — на своих местах («не только…, но и…»). **Несогласованное приложение:** в газете «Известия» — название в кавычках не склоняется, если есть родовое слово; без родового слова склоняется: в «Известиях». **Числительное:** «обоим девочкам» — обеим.",
        "ex": [
          [
            "Все, кто пришли, были довольны",
            "ошибка: «кто» требует единственного числа — все, кто пришёл"
          ],
          [
            "Он сказал, что я приду завтра (сказал о себе)",
            "ошибка в косвенной речи: он сказал, что придёт завтра"
          ],
          [
            "Я читал в газете «Известиях» / читал в «Известиях»",
            "с родовым словом название не склоняется: в газете «Известия»"
          ],
          [
            "Он любит и увлекается спортом",
            "разное управление: любит спорт и увлекается им"
          ]
        ],
        "tip": "Ищи в предложении маркеры: деепричастие на -я/-в, причастие на -ущ/-ющ/-вш/-нн, «кто» после «все/те», предлоги согласно/благодаря/по, кавычки с родовым словом, союзы «не только… но и»."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Где ошибка в употреблении деепричастного оборота?",
          "options": [
            "Проверяя тормоза, у меня закончилось время",
            "Проверяя тормоза, я нашёл неисправность",
            "Проверив тормоза, бригада доложила диспетчеру",
            "Проверяя тормоза, не торопитесь"
          ],
          "explanation": "Проверял я, а закончилось время — разные деятели."
        },
        {
          "k": "choice",
          "q": "Где ошибка в связи подлежащего и сказуемого?",
          "options": [
            "Те, кто опоздали, не попали на инструктаж",
            "Те, кто опоздал, не попали на инструктаж",
            "Все, кто пришёл, расписались",
            "Каждый, кто был на смене, знает это"
          ],
          "explanation": "«Кто» — единственное число: те, кто опоздал."
        },
        {
          "k": "choice",
          "q": "Где ошибка в построении предложения с косвенной речью?",
          "options": [
            "Машинист сказал, что я готов к отправлению",
            "Машинист сказал, что он готов к отправлению",
            "Машинист сказал: «Я готов к отправлению»",
            "Машинист сообщил о готовности к отправлению"
          ],
          "explanation": "Смешаны прямая и косвенная речь: сказал, что он готов."
        },
        {
          "k": "choice",
          "q": "Где ошибка с несогласованным приложением?",
          "options": [
            "Я прочитал об этом в журнале «Локомотиве»",
            "Я прочитал об этом в журнале «Локомотив»",
            "Я прочитал об этом в «Локомотиве»",
            "Журнал «Локомотив» пишет об этом"
          ],
          "explanation": "При родовом слове «журнал» название не склоняется."
        },
        {
          "k": "choice",
          "q": "Где ошибка с однородными членами?",
          "options": [
            "Он не только читал книги, а также писал стихи",
            "Он не только читал книги, но и писал стихи",
            "Он читал книги и писал стихи",
            "Он читал и перечитывал книги"
          ],
          "explanation": "Двойной союз «не только…, но и…» — вторая часть именно «но и»."
        }
      ]
    },
    {
      "id": "ege-09",
      "t": "Задание 9. Гласные и согласные в корне",
      "plan": "проверяемые, непроверяемые и чередующиеся корни",
      "theory": {
        "rule": "В задании 9 нужно найти ряды слов, где во всех словах пропущена одна и та же буква. Три вида корней. **Проверяемые** — подбери однокоренное с ударением: уплатить — плата, посветить — свет, чистота — чистый. **Непроверяемые** — только словарь: вокзал, вагон, винегрет, палисадник. **Чередующиеся** — свои правила: **-лаг-/-лож-** (перед г — а: предлагать, перед ж — о: предложить); **-раст-/-ращ-/-рос-** (перед ст, щ — а: расти, выращенный; иначе о: вырос; исключения: росток, Ростов, ростовщик, отрасль); **-кас-/-кос-** (есть суффикс -а- — кас: касаться; нет — кос: коснуться); **-бер-/-бир-, -мер-/-мир-, -тер-/-тир-, -блест-/-блист-** (суффикс -а- — и: собирать, замирать, блистать; иначе — е: соберу, замереть, блестеть); **-гар-/-гор-** (под ударением а: загар, без — о: загорать); **-зар-/-зор-** (без ударения а: заря); **-плав-** (всегда а, кроме пловец, пловчиха); **-скак-/-скоч-** (перед к — а: скакать, перед ч — о: вскочить). Проверять чередующийся корень ударением нельзя.",
        "ex": [
          [
            "предлагать — предложить; расти — вырос — росток",
            "лаг/лож по следующей букве; раст/рос — по ст, исключение росток"
          ],
          [
            "собирать — соберу; касаться — коснуться; блистать — блестеть",
            "есть -а- после корня — пиши и (или а в кас-)"
          ],
          [
            "загорать — загар; заря — зорька; пловец — плавать",
            "гар/гор и зар/зор зависят от ударения; плав — всегда а, кроме пловец"
          ],
          [
            "посветить фонарём — свет; посвятить стихи — святость",
            "проверяемые: подбирай слово с ударным корнем по смыслу"
          ]
        ],
        "tip": "Сначала определи вид корня: чередующийся нельзя проверять ударением — «загорать» не проверяется словом «загар» по смыслу, а подчиняется правилу."
      },
      "ex": [
        {
          "k": "input",
          "q": "Напиши слово целиком: «предл_гать помощь»",
          "a": [
            "предлагать"
          ],
          "explanation": "Перед г — а: предлагать. Перед ж — о: предложить."
        },
        {
          "k": "input",
          "q": "Напиши слово целиком: «р_сток»",
          "a": [
            "росток"
          ],
          "explanation": "Исключение из правила раст/рос: росток, Ростов, ростовщик, отрасль."
        },
        {
          "k": "choice",
          "q": "В каком слове на месте пропуска пишется И?",
          "options": [
            "соб_рать",
            "соб_рёт",
            "зам_реть",
            "бл_стеть"
          ],
          "explanation": "Есть суффикс -а- после корня — пиши и: собирать. Без него — е: соберёт, замереть, блестеть."
        },
        {
          "k": "input",
          "q": "Напиши слово целиком: «прик_снуться»",
          "a": [
            "прикоснуться"
          ],
          "explanation": "Нет суффикса -а- — пиши о: прикоснуться. Есть -а- — касаться."
        },
        {
          "k": "choice",
          "q": "Какое слово с проверяемой гласной в корне?",
          "options": [
            "упл_тить долг (плата)",
            "заг_рать",
            "выр_щенный",
            "ск_кать"
          ],
          "explanation": "Уплатить проверяется словом «плата». Остальные — чередующиеся корни, их ударением не проверяют."
        }
      ]
    },
    {
      "id": "ege-10",
      "t": "Задание 10. Приставки, Ъ и Ь, Ы и И после приставок",
      "plan": "пре-/при-, з/с, разделительные знаки",
      "theory": {
        "rule": "**Пре-/при-.** При- = приближение, присоединение, близость, неполнота действия: прибыть, приклеить, приморский, приоткрыть. Пре- = очень или значение «пере-»: премудрый, прервать, преградить. Смысловые пары: прибывать (на станцию) — пребывать (находиться), приступить (к работе) — преступить (закон), придать (вид) — предать (друга), приклонить (ветку) — преклонить (колени). Словарные: привилегия, приоритет, президент, претензия. **Приставки на з/с** (без-/бес-, раз-/рас-, из-/ис-, воз-/вос-, низ-/нис-, чрез-/чрес-): перед звонким согласным — з, перед глухим — с: разбег, расписание, бесполезный, безвредный, исчезнуть, чересчур. Приставка с- всегда с: сделать, сбежать. **Ъ** — после приставки на согласный перед е, ё, ю, я: подъезд, объект, съёмка, предъюбилейный; **Ь** — в корне перед е, ё, ю, я, и: вьюга, интерьер, пьедестал. **Ы после приставки** на согласный: безынтересный, подытожить, сыграть; но после сверх-, меж- и иноязычных (дез-, контр-, пан-) — и: сверхинтересный, межинститутский, дезинформация, а также в сложносокращённых: спортинвентарь.",
        "ex": [
          [
            "прибыть, приклеить, приоткрыть, приморский — премудрый, прервать, преградить",
            "при-: близость, присоединение, чуть-чуть; пре-: очень, пере-"
          ],
          [
            "разбег — расписание; безвредный — бесполезный; сделать",
            "з перед звонким, с перед глухим; с- всегда одна"
          ],
          [
            "подъезд, объект, съёмка — вьюга, интерьер, пьедестал",
            "ъ после приставки, ь в корне"
          ],
          [
            "безынтересный, подытожить — сверхинтересный, межинститутский, дезинформация",
            "ы после русской приставки на согласный; и после сверх-, меж- и иностранных"
          ]
        ],
        "tip": "Для пре-/при- спрашивай «что значит?»: приблизиться — при-, очень — пре-. Если значение не видно — это словарное слово, учи."
      },
      "ex": [
        {
          "k": "input",
          "q": "Напиши слово целиком: «пр_бывать в городе (находиться)»",
          "a": [
            "пребывать"
          ],
          "explanation": "Находиться — пребывать. Прибывать — приезжать."
        },
        {
          "k": "input",
          "q": "Напиши слово целиком: «бе_полезный»",
          "a": [
            "бесполезный"
          ],
          "explanation": "Перед глухим п — с."
        },
        {
          "k": "choice",
          "q": "В каком слове пишется Ъ?",
          "options": [
            "под_езд",
            "в_юга",
            "интер_ер",
            "п_едестал"
          ],
          "explanation": "Ъ — после приставки на согласный перед е: подъезд. В корне — ь."
        },
        {
          "k": "input",
          "q": "Напиши слово целиком: «без_нтересный»",
          "a": [
            "безынтересный"
          ],
          "explanation": "После русской приставки на согласный и переходит в ы."
        },
        {
          "k": "choice",
          "q": "В каком слове после приставки пишется И?",
          "options": [
            "сверх_нтересный",
            "под_тожить",
            "без_дейный",
            "с_грать"
          ],
          "explanation": "После сверх- и меж- сохраняется и."
        }
      ]
    },
    {
      "id": "ege-11",
      "t": "Задание 11. Суффиксы",
      "plan": "-ива/-ыва и -ова/-ева, -чив/-лив, -ев/-ив, е/и в суффиксах существительных",
      "theory": {
        "rule": "**Глаголы:** поставь в форму «я»: если -ую/-юю — пиши -ова-/-ева- (командую — командовать, ночую — ночевать); если -ываю/-иваю — пиши -ыва-/-ива- (рассчитываю — рассчитывать). Глаголы на -ять/-ить перед -ть: таять, лаять, лелеять, сеять, веять, чуять, но клеить, строить. **Прилагательные:** -чив-, -лив- всегда с и: доверчивый, заботливый; -ев- без ударения, -ив- под ударением: ключевой, сиреневый, замшевый, но красивый, игривый; исключения: милостивый, юродивый. **Существительные:** -ец- в мужском роде (красавец), -иц- в женском (красавица); -ек-, если при склонении гласный выпадает (замочек — замочка), -ик-, если не выпадает (ключик — ключика); -инк- от слов на -ина (горошина — горошинка), -енк- от других (вишня — вишенка).",
        "ex": [
          [
            "командую — командовать; ночую — ночевать; рассчитываю — рассчитывать",
            "форма «я» подсказывает суффикс"
          ],
          [
            "таять, сеять, лелеять, чуять; клеить, строить",
            "глаголы на -ять надо помнить списком"
          ],
          [
            "доверчивый, заботливый; ключевой, замшевый, но красивый",
            "-чив/-лив с и; -ев без ударения"
          ],
          [
            "замочек — замочка; ключик — ключика; горошинка, вишенка",
            "-ек, если гласный выпадает; -инк от слов на -ина"
          ]
        ],
        "tip": "Два вопроса для глаголов: какая форма у «я»? и как звучит неопределённая форма? Их хватает на большую часть задания."
      },
      "ex": [
        {
          "k": "input",
          "q": "Напиши слово целиком: «команд_вать»",
          "a": [
            "командовать"
          ],
          "explanation": "Я командую — суффикс -ова-."
        },
        {
          "k": "input",
          "q": "Напиши слово целиком: «рассчит_вать»",
          "a": [
            "рассчитывать"
          ],
          "explanation": "Я рассчитываю — суффикс -ыва-."
        },
        {
          "k": "choice",
          "q": "В каком слове пишется И?",
          "options": [
            "доверч_вый",
            "ключ_вой",
            "сирен_вый",
            "ноч_вать"
          ],
          "explanation": "-чив- всегда с и. Ключевой, сиреневый — безударный -ев-; ночую — ночевать."
        },
        {
          "k": "input",
          "q": "Напиши слово целиком: «та_ть (о снеге)»",
          "a": [
            "таять"
          ],
          "explanation": "Таять — на -ять, как сеять, лаять, лелеять."
        },
        {
          "k": "choice",
          "q": "В каком слове пишется -ЕК-?",
          "options": [
            "замоч_к",
            "ключ_к",
            "дожд_к",
            "кирпич_к"
          ],
          "explanation": "Замочек — замочка: гласный выпадает. Ключик — ключика: не выпадает."
        }
      ]
    },
    {
      "id": "ege-12",
      "t": "Задание 12. Окончания глаголов и суффиксы причастий",
      "plan": "спряжение и суффиксы причастий",
      "theory": {
        "rule": "Всё решает **спряжение**. **II спряжение**: глаголы на -ить (кроме брить, стелить), 4 на -ать (гнать, держать, дышать, слышать) и 7 на -еть (смотреть, видеть, ненавидеть, терпеть, обидеть, зависеть, вертеть). Остальные — **I**. Окончания I: -ешь, -ет, -ем, -ете, -ут/-ют; II: -ишь, -ит, -им, -ите, -ат/-ят. **Причастия настоящего времени** берут суффикс от спряжения: I — -ущ-/-ющ-, -ем-/-ом- (тающий, колеблемый); II — -ащ-/-ящ-, -им- (дышащий, видимый). Исключение: движимый. **Причастия прошедшего времени** сохраняют гласную неопределённой формы: растаять — растаявший, обидеть — обидевший, клеить — клеивший, увидеть — увидевший. Ударное окончание проверять не надо: оно слышится (идёшь).",
        "ex": [
          [
            "стелешь, бреешь — I; дышишь, слышишь, видишь — II",
            "исключения в обе стороны"
          ],
          [
            "тающий, колеблемый (I); дышащий, строящий, видимый (II)",
            "суффикс причастия настоящего времени — по спряжению"
          ],
          [
            "растаять — растаявший; обидеть — обидевший; клеить — клеивший",
            "прошедшее время — гласная неопределённой формы"
          ],
          [
            "движимый — исключение",
            "от глагола I спряжения «двигать», но суффикс -им-"
          ]
        ],
        "tip": "Поставь глагол в неопределённую форму и проверь: на -ить? в списке исключений? Это и есть всё задание."
      },
      "ex": [
        {
          "k": "input",
          "q": "Напиши слово целиком: «стел_шь постель»",
          "a": [
            "стелешь"
          ],
          "explanation": "Стелить — исключение, I спряжение: стелешь."
        },
        {
          "k": "input",
          "q": "Напиши слово целиком: «дыш_щий»",
          "a": [
            "дышащий"
          ],
          "explanation": "Дышать — II спряжение (исключение на -ать): -ащ-."
        },
        {
          "k": "choice",
          "q": "В каком слове пишется Ю?",
          "options": [
            "бор_щийся",
            "стро_щий",
            "кле_щий",
            "держ_щий"
          ],
          "explanation": "Бороться — I спряжение: борющийся. Строить, клеить, держать — II."
        },
        {
          "k": "input",
          "q": "Напиши слово целиком: «раста_вший снег»",
          "a": [
            "растаявший"
          ],
          "explanation": "Растаять — в причастии прошедшего времени гласная неопределённой формы: растаявший."
        },
        {
          "k": "choice",
          "q": "В каком слове пишется И?",
          "options": [
            "вид_мый",
            "колебл_мый",
            "обид_вший",
            "та_щий"
          ],
          "explanation": "Видеть — II спряжение: видимый. Колеблемый — I. Обидевший — от обидеть."
        }
      ]
    },
    {
      "id": "ege-13",
      "t": "Задание 13. НЕ слитно и раздельно",
      "plan": "когда НЕ — часть слова, а когда отрицание",
      "theory": {
        "rule": "**Слитно:** слово без не не употребляется (невежда, нелепый, негодовать, ненавидеть, недоумевать); есть синоним без не (небольшой = маленький, неправда = ложь); полное причастие без зависимых слов (непрочитанная книга); с приставкой недо- в значении «не хватает» (недоедать, недосыпать); отрицательные местоимения без предлога (некого, нечего). **Раздельно:** с глаголами и деепричастиями (не был, не читая); с краткими причастиями (не прочитана); с полным причастием при зависимых словах (не прочитанная мною книга); при противопоставлении с союзом а (не глубокая, а мелкая); после слов далеко, вовсе, отнюдь, ничуть, нисколько (вовсе не готов); с числительными, сравнительной степенью, наречиями не на -о (не два, не лучше, не вчера); с местоимениями при предлоге (не у кого). Отличай «не высокий, но крепкий» (слитно — нет противопоставления, союз но) от «не высокий, а низкий».",
        "ex": [
          [
            "невежда, ненавидеть, недоумевая, нелепый",
            "без не не существуют — слитно"
          ],
          [
            "непрочитанная книга — не прочитанная мной книга — книга не прочитана",
            "полное без зависимых — слитно; с зависимыми и краткое — раздельно"
          ],
          [
            "не глубокая, а мелкая — неглубокая, но холодная",
            "противопоставление с «а» — раздельно; с «но» — слитно"
          ],
          [
            "далеко не лёгкий, вовсе не готов, ничуть не интересный",
            "усилители отрицания требуют раздельного написания"
          ]
        ],
        "tip": "Порядок проверки: часть речи → употребляется ли без не → есть ли зависимые слова, «а» или усилители."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Где НЕ пишется СЛИТНО?",
          "options": [
            "(не)лепый поступок",
            "ещё (не)решённая задача",
            "далеко (не)лёгкий путь",
            "(не)у кого спросить"
          ],
          "explanation": "Нелепый без не не употребляется. Остальные — раздельно: зависимое слово, усилитель, предлог."
        },
        {
          "k": "choice",
          "q": "Где НЕ пишется РАЗДЕЛЬНО?",
          "options": [
            "река (не)глубокая, а мелкая",
            "(не)глубокая, но холодная река",
            "(не)большая станция",
            "(не)прочитанное письмо"
          ],
          "explanation": "Противопоставление с «а» — раздельно."
        },
        {
          "k": "input",
          "q": "Напиши слово целиком, слитно или раздельно: «он (не)доумевал»",
          "a": [
            "недоумевал"
          ],
          "explanation": "Недоумевать без не не употребляется."
        },
        {
          "k": "input",
          "q": "Напиши целиком, слитно или раздельно: «письмо (не)дописано»",
          "a": [
            "не дописано"
          ],
          "explanation": "Краткое причастие — раздельно."
        },
        {
          "k": "choice",
          "q": "Где НЕ пишется СЛИТНО?",
          "options": [
            "(не)смотря на мороз",
            "(не)смотря под ноги",
            "(не)был дома",
            "вовсе (не)интересно"
          ],
          "explanation": "«Несмотря на» — предлог со значением «хотя», слитно. «Не смотря под ноги» — деепричастие, раздельно."
        }
      ]
    },
    {
      "id": "ege-14",
      "t": "Задание 14. Слитно, раздельно, через дефис",
      "plan": "предлоги, союзы, наречия и местоимения",
      "theory": {
        "rule": "**Союзы слитно**, если нельзя убрать или переставить «же», «бы»: тоже, также (= и), чтобы (= для того чтобы), зато (= но), причём, поэтому. Раздельно, если это местоимение с частицей: то же самое, так же как, что бы ни случилось, за то дерево, по этому мосту. **Производные предлоги:** в течение, в продолжение, в заключение, вследствие (= из-за), ввиду, наподобие, несмотря на, навстречу — слитно или с е на конце; существительные с предлогом — раздельно: в течении реки, в следствии по делу, иметь в виду. **Наречия через дефис:** по- + -ому/-ему/-и (по-новому, по-русски), -то, -либо, -нибудь, кое- (кое-где, где-то), повторы (чуть-чуть, еле-еле), во-первых. **Наречия слитно:** вдвоём, втрое, поодиночке, вдали, наконец, впоследствии, отчасти, поначалу, вдвое. **Раздельно:** в открытую, в обнимку, без умолку, на ходу, с разбегу, по двое, по трое, в обрез.",
        "ex": [
          [
            "Он тоже устал. — Он сделал то же самое.",
            "тоже = и; то же — можно сказать «то же самое»"
          ],
          [
            "Чтобы успеть, вышли рано. — Что бы ни случилось, звони.",
            "чтобы = для того чтобы; что бы — «бы» можно убрать"
          ],
          [
            "в течение часа, вследствие аварии, несмотря на дождь — в течении реки, в следствии по делу",
            "предлог — одно значение (время, причина); существительное — конкретный предмет"
          ],
          [
            "по-новому, по-русски, кое-где, когда-нибудь, еле-еле; вдвоём, впоследствии, поодиночке; в открытую, без умолку",
            "дефис, слитно, раздельно — три списка"
          ]
        ],
        "tip": "Для союзов — подмена: тоже → и, чтобы → для того чтобы, зато → но. Подмена сработала — пиши слитно."
      },
      "ex": [
        {
          "k": "input",
          "q": "Напиши целиком: «Он (то)же устал»",
          "a": [
            "тоже"
          ],
          "explanation": "Тоже = и: и он устал. Слитно."
        },
        {
          "k": "input",
          "q": "Напиши целиком: «Он повторил (то)же самое»",
          "a": [
            "то же"
          ],
          "explanation": "То же самое — местоимение с частицей, раздельно."
        },
        {
          "k": "choice",
          "q": "Где пишется СЛИТНО?",
          "options": [
            "(в)течение смены",
            "(в)течении реки",
            "(в)следствии по делу",
            "иметь (в)виду"
          ],
          "explanation": "Предлог со значением времени — в течение. Остальные — существительные с предлогом."
        },
        {
          "k": "choice",
          "q": "Где нужен дефис?",
          "options": [
            "(по)прежнему",
            "(по)двое",
            "(в)двоём",
            "(в)открытую"
          ],
          "explanation": "По-прежнему: по- + -ему. Вдвоём слитно, по двое и в открытую раздельно."
        },
        {
          "k": "input",
          "q": "Напиши целиком: «(по)этому мосту ехать нельзя»",
          "a": [
            "по этому"
          ],
          "explanation": "По этому мосту — указательное местоимение с предлогом. Союз «поэтому» = по этой причине."
        }
      ]
    },
    {
      "id": "ege-15",
      "t": "Задание 15. Н и НН",
      "plan": "в прилагательных, причастиях, наречиях и существительных",
      "theory": {
        "rule": "**Прилагательные от существительных:** -ан-, -ян-, -ин- — одна н (кожаный, серебряный, гусиный), исключения стеклянный, оловянный, деревянный; -онн-, -енн- — две (станционный, утренний), исключение ветреный (но безветренный); основа на н + суффикс -н- — две (лунный, старинный). Первообразные с одной н: юный, румяный, багряный, свиной, пряный, зелёный. **Причастия и отглагольные прилагательные:** нн, если есть приставка (кроме не-), зависимое слово, суффикс -ова-/-ева- или глагол совершенного вида: скошенный, кошенный утром, рискованный, решённый. Иначе одна н: кошеный, жареный, раненый (но раненный в руку). Исключения с одной н: кованый, жёваный, названый брат, посажёный отец, смышлёный, приданое; с двумя: нежданный, негаданный, неслыханный, невиданный, нечаянный, священный, желанный. **Краткие причастия** — одна н (задача решена); **краткие прилагательные** — как полные (девочка воспитанна). **Наречия на -о** — столько же н, сколько в прилагательном: путаный — путано, рассеянный — рассеянно. **Существительные** запомни: труженик, путаница, гостиная, масленица — одна н; именинник, подлинник, мошенник, племянник — две.",
        "ex": [
          [
            "кожаный, серебряный, гусиный — стеклянный, оловянный, деревянный",
            "-ан/-ян/-ин с одной н, три исключения"
          ],
          [
            "станционный, утренний, лунный — ветреный, безветренный",
            "-онн/-енн и н+н с двумя; ветреный — исключение, с приставкой — снова нн"
          ],
          [
            "кошеный луг — скошенный луг — кошенный утром луг",
            "приставка или зависимое слово дают нн"
          ],
          [
            "задача решена (краткое причастие); девочка воспитанна (краткое прилагательное)",
            "краткое причастие — н; краткое прилагательное — как полное"
          ]
        ],
        "tip": "Для отглагольных слов четыре вопроса: приставка? зависимое слово? -ова-/-ева-? совершенный вид? Хоть один «да» — нн."
      },
      "ex": [
        {
          "k": "input",
          "q": "Напиши слово целиком: «стекля_ый»",
          "a": [
            "стеклянный"
          ],
          "explanation": "Стеклянный, оловянный, деревянный — исключения с нн."
        },
        {
          "k": "input",
          "q": "Напиши слово целиком: «ветре_ый день»",
          "a": [
            "ветреный"
          ],
          "explanation": "Ветреный — исключение с одной н; безветренный — с двумя."
        },
        {
          "k": "choice",
          "q": "Где пишется НН?",
          "options": [
            "скоше_ый луг",
            "коше_ый луг",
            "жаре_ая рыба",
            "ране_ый боец"
          ],
          "explanation": "Приставка с- даёт нн: скошенный. Без приставки и зависимых слов — одна н."
        },
        {
          "k": "input",
          "q": "Напиши слово целиком: «кова_ый сундук»",
          "a": [
            "кованый"
          ],
          "explanation": "Кованый, жёваный — исключения с одной н, хотя есть -ова-."
        },
        {
          "k": "choice",
          "q": "Где пишется одна Н?",
          "options": [
            "задача реше_а",
            "рискова_ый шаг",
            "стари_ый дом",
            "нежда_ый гость"
          ],
          "explanation": "Краткое причастие «решена» — одна н. Остальные — нн."
        }
      ]
    },
    {
      "id": "ege-x1",
      "exam": true,
      "t": "Пробный блок 1: задания 4–15",
      "covers": [
        "ege-04",
        "ege-05",
        "ege-06",
        "ege-07",
        "ege-08",
        "ege-09",
        "ege-10",
        "ege-11",
        "ege-12",
        "ege-13",
        "ege-14",
        "ege-15"
      ],
      "pass": 0.8,
      "q": [
        {
          "k": "choice",
          "s": "ege-04",
          "q": "Где ударение поставлено НЕВЕРНО?",
          "options": [
            "шарфЫ",
            "бАнты",
            "крАны",
            "срЕдства"
          ]
        },
        {
          "k": "choice",
          "s": "ege-04",
          "q": "Где ударение поставлено НЕВЕРНО?",
          "options": [
            "дОсуг",
            "квартАл",
            "жалюзИ",
            "дефИс"
          ]
        },
        {
          "k": "input",
          "s": "ege-05",
          "q": "Замени неверно употреблённое слово: «Сегодня ВЕТРЯНАЯ погода»",
          "a": [
            "ветреная"
          ]
        },
        {
          "k": "input",
          "s": "ege-05",
          "q": "Замени неверно употреблённое слово: «Нам нужна ПРАКТИЧЕСКАЯ обувь для похода»",
          "a": [
            "практичная"
          ]
        },
        {
          "k": "input",
          "s": "ege-06",
          "q": "Выпиши лишнее слово: «На собрании обсудили главную суть вопроса»",
          "a": [
            "главную"
          ]
        },
        {
          "k": "input",
          "s": "ege-06",
          "q": "Замени неверно употреблённое слово: «Чтение помогает повысить кругозор»",
          "a": [
            "расширить"
          ]
        },
        {
          "k": "choice",
          "s": "ege-07",
          "q": "Где ошибка в образовании формы слова?",
          "options": [
            "ложи на место",
            "нет чулок",
            "красивее всех",
            "обоих братьев"
          ]
        },
        {
          "k": "input",
          "s": "ege-07",
          "q": "Исправь и напиши верно: «опытные шофера»",
          "a": [
            "шофёры",
            "шоферы"
          ]
        },
        {
          "k": "choice",
          "s": "ege-08",
          "q": "Где ошибка в употреблении падежной формы с предлогом?",
          "options": [
            "Согласно графика поезд отправится в семь",
            "Согласно графику поезд отправится в семь",
            "По окончании смены сдай журнал",
            "Благодаря помощи успели"
          ]
        },
        {
          "k": "choice",
          "s": "ege-08",
          "q": "Где ошибка в построении предложения с причастным оборотом?",
          "options": [
            "Прочитанная книга мною лежала на столе",
            "Прочитанная мною книга лежала на столе",
            "Книга, прочитанная мною, лежала на столе",
            "Я убрал прочитанную книгу"
          ]
        },
        {
          "k": "input",
          "s": "ege-09",
          "q": "Напиши слово целиком: «выр_щенный»",
          "a": [
            "выращенный"
          ]
        },
        {
          "k": "choice",
          "s": "ege-09",
          "q": "В каком слове пишется О?",
          "options": [
            "заг_рать",
            "з_ря",
            "к_саться",
            "изл_гать"
          ]
        },
        {
          "k": "input",
          "s": "ege-10",
          "q": "Напиши слово целиком: «пр_ступить к работе»",
          "a": [
            "приступить"
          ]
        },
        {
          "k": "choice",
          "s": "ege-10",
          "q": "В каком слове пишется С?",
          "options": [
            "ра_писание",
            "ра_бег",
            "бе_вредный",
            "и_бежать"
          ]
        },
        {
          "k": "input",
          "s": "ege-11",
          "q": "Напиши слово целиком: «ноч_вать»",
          "a": [
            "ночевать"
          ]
        },
        {
          "k": "choice",
          "s": "ege-11",
          "q": "В каком слове пишется Е?",
          "options": [
            "ключ_вой",
            "заботл_вый",
            "крас_вый",
            "горош_нка"
          ]
        },
        {
          "k": "input",
          "s": "ege-12",
          "q": "Напиши слово целиком: «бре_шься»",
          "a": [
            "бреешься"
          ]
        },
        {
          "k": "choice",
          "s": "ege-12",
          "q": "В каком слове пишется Я?",
          "options": [
            "стро_щий",
            "та_щий",
            "дремл_щий",
            "колебл_щийся"
          ]
        },
        {
          "k": "choice",
          "s": "ege-13",
          "q": "Где НЕ пишется РАЗДЕЛЬНО?",
          "options": [
            "(не)прочитанная мною книга",
            "(не)прочитанная книга",
            "(не)вежда",
            "(не)большой, но уютный дом"
          ]
        },
        {
          "k": "input",
          "s": "ege-13",
          "q": "Напиши целиком, слитно или раздельно: «(не)годуя на себя»",
          "a": [
            "негодуя"
          ]
        },
        {
          "k": "input",
          "s": "ege-14",
          "q": "Напиши целиком: «Вышел рано, (что)бы успеть»",
          "a": [
            "чтобы"
          ]
        },
        {
          "k": "choice",
          "s": "ege-14",
          "q": "Где пишется РАЗДЕЛЬНО?",
          "options": [
            "(так)же как и вчера",
            "(так)же устал",
            "(в)последствии",
            "(по)одиночке"
          ]
        },
        {
          "k": "input",
          "s": "ege-15",
          "q": "Напиши слово целиком: «безветре_ый день»",
          "a": [
            "безветренный"
          ]
        },
        {
          "k": "choice",
          "s": "ege-15",
          "q": "Где пишется одна Н?",
          "options": [
            "серебря_ый",
            "стари_ый",
            "решё_ый",
            "станцио_ый"
          ]
        }
      ]
    }
  ]
},
  {
    id: 'code', cat: 'code', name: 'Программирование', type: 'path',
    goal: 'Самому понимать и править код своих сайтов', unit: 'урок',
    prompt: 'Проведи урок программирования №{n}: «{t}». Я не программист, учусь с нуля. Объясняй простым языком, каждый термин одной фразой. План: {plan}. Покажи маленький пример кода и дай одно практическое задание, потом проверь его.',
    steps: [
      { id: 'c1', t: 'Как устроен сайт: HTML, CSS, JavaScript', plan: 'что за что отвечает, как браузер показывает страницу', theory: {"rule": "**HTML** — содержимое и структура страницы: заголовки, текст, ссылки. **CSS** — внешний вид: цвета, шрифты, отступы. **JavaScript** — поведение: что происходит при нажатии. Браузер читает эти файлы и собирает из них страницу.", "ex": [["<h1>Тяга</h1>", "HTML: заголовок"], ["color: red;", "CSS: красный цвет"], ["alert('Привет')", "JavaScript: окно с сообщением"]], "tip": "Сайт как дом: HTML — стены и комнаты, CSS — отделка, JavaScript — электричество: свет включается по кнопке."}, ex: [{"k": "choice", "q": "За что отвечает CSS?", "options": ["Внешний вид: цвета, шрифты, отступы", "Текст страницы", "Действия по нажатию", "Адрес сайта"]}, {"k": "choice", "q": "Какой файл в проекте отвечает за структуру страницы?", "options": ["index.html", "app.js", "manifest.webmanifest", "sw.js"]}, {"k": "choice", "q": "Что делает браузер?", "options": ["Читает файлы сайта и показывает страницу", "Пишет код за тебя", "Хранит сайт на сервере", "Проверяет орфографию"]}, {"k": "choice", "q": "Нужно изменить цвет фона. Что править?", "options": ["CSS", "JavaScript-функцию", "Адрес сайта", "Иконку"]}, {"k": "choice", "q": "Что из этого относится к JavaScript?", "options": ["Проверить ответ при нажатии на кнопку", "Сделать фон синим", "Написать заголовок", "Вставить картинку"]}] },
      { id: 'c2', t: 'HTML: теги и структура страницы', plan: 'заголовки, абзацы, ссылки, картинки', theory: {"rule": "HTML строится из **тегов** — меток в угловых скобках. Обычно тег парный: открывающий `<p>` и закрывающий `</p>`, текст между ними. **h1** — главный заголовок, **p** — абзац, **a** — ссылка, **img** — картинка (закрывающего тега нет). **Атрибут** — настройка внутри тега: href (адрес ссылки), src (файл картинки).", "ex": [["<h1>Заголовок</h1>", "главный заголовок"], ["<a href=\"https://example.com\">Ссылка</a>", "ссылка: адрес в href"], ["<img src=\"icon.png\">", "картинка, закрывающего тега нет"]], "tip": "Страница состоит из <head> (служебное, например название вкладки) и <body> (то, что видно на экране)."}, ex: [{"k": "choice", "q": "Какой тег делает абзац?", "options": ["<p>", "<h1>", "<a>", "<img>"]}, {"k": "choice", "q": "Как закрывается тег <h1>?", "options": ["</h1>", "<h1/>", "<end h1>", "<//h1>"]}, {"k": "choice", "q": "В каком атрибуте у ссылки указан адрес?", "options": ["href", "src", "alt", "id"]}, {"k": "choice", "q": "Что лежит в <body>?", "options": ["Видимое содержимое страницы", "Название вкладки и служебное", "Только стили CSS", "Адрес сервера"]}, {"k": "choice", "q": "Какой тег вставляет картинку?", "options": ["<img>", "<pic>", "<image-link>", "<a>"]}] },
      { id: 'c3', t: 'CSS: цвета, шрифты, отступы', plan: 'селекторы, color, padding, margin', theory: {"rule": "CSS пишут правилами: **селектор** (кого красим) и в скобках { } свойства. **.card** — все элементы с class=\"card\", **#menu** — элемент с id=\"menu\", **p** — все абзацы. Свойства: **color** — цвет текста, **background** — фон, **padding** — отступ внутри, **margin** — отступ снаружи.", "ex": [[".card { color: red; }", "элементы class=card получат красный текст"], ["p { margin: 10px; }", "у каждого абзаца отступ снаружи 10 пикселей"], ["#menu { padding: 8px; }", "у элемента id=menu отступ внутри 8 пикселей"]], "tip": "Padding — воздух внутри коробки, margin — воздух вокруг коробки."}, ex: [{"k": "choice", "q": "Какое свойство меняет цвет текста?", "options": ["color", "background", "padding", "margin"]}, {"k": "choice", "q": "Как выбрать все элементы с class=\"card\"?", "options": [".card", "#card", "card", "*card"]}, {"k": "choice", "q": "Что такое padding?", "options": ["Отступ внутри элемента, от рамки до содержимого", "Отступ снаружи", "Цвет рамки", "Размер шрифта"]}, {"k": "choice", "q": "Как выбрать элемент с id=\"menu\"?", "options": ["#menu", ".menu", "menu", "@menu"]}, {"k": "choice", "q": "Какое свойство задаёт цвет фона?", "options": ["background", "color", "padding", "font"]}] },
      { id: 'c4', t: 'CSS: раскладка через flex', plan: 'display: flex, gap, flex-direction', theory: {"rule": "**display: flex** на родительском элементе выстраивает вложенные элементы в ряд. **gap** — расстояние между ними. **flex-direction: column** — расположить столбиком. **justify-content: space-between** — первый элемент слева, последний справа, остальные поровну между ними.", "ex": [[".row { display: flex; gap: 8px; }", "элементы в ряд с промежутком 8 пикселей"], [".col { display: flex; flex-direction: column; }", "элементы столбиком"], ["justify-content: space-between;", "раздвинуть по краям"]], "tip": "Flex включают на «родителе» (контейнере), а раскладываются его «дети»."}, ex: [{"k": "choice", "q": "Что делает display: flex?", "options": ["Выстраивает вложенные элементы в ряд и даёт управлять ими", "Прячет элемент", "Делает текст жирным", "Растягивает картинку"]}, {"k": "choice", "q": "Как задать промежуток между элементами во flex?", "options": ["gap", "color", "flex-size", "font-gap"]}, {"k": "choice", "q": "Как поставить элементы столбиком?", "options": ["flex-direction: column", "flex-direction: row", "display: column", "align: stack"]}, {"k": "choice", "q": "На каком элементе пишут display: flex?", "options": ["На родителе, внутри которого лежат элементы", "На каждом дочернем элементе отдельно", "В теге <head>", "Нигде, это пишут в index.html без селектора"]}, {"k": "choice", "q": "Что делает justify-content: space-between?", "options": ["Первый элемент слева, последний справа, остальные поровну между ними", "Ставит все элементы по центру", "Прижимает все элементы влево без промежутков", "Скрывает элементы"]}] },
      { id: 'c5', t: 'JavaScript: переменные и типы', plan: 'let, const, числа, строки, true/false', theory: {"rule": "**Переменная** — коробка с именем, в которой лежит значение. **let** — создать переменную, значение можно менять. **const** — создать постоянную, менять нельзя. Типы значений: **число** (5), **строка** (\"привет\", в кавычках), **логическое** (true или false).", "ex": [["let score = 0;", "создаём переменную score, в ней 0"], ["const name = \"Александр\";", "строка, менять нельзя"], ["let done = true;", "логическое значение"]], "tip": "\"2\" в кавычках — строка, а 2 без кавычек — число. Поэтому 2 + \"2\" даёт \"22\", а не 4."}, ex: [{"k": "choice", "q": "Как правильно создать переменную?", "options": ["let score = 0;", "variable score = 0;", "score := 0;", "new score = 0;"]}, {"k": "choice", "q": "Чем const отличается от let?", "options": ["const менять нельзя, let можно", "const для чисел, let для строк", "const работает быстрее", "Ничем"]}, {"k": "choice", "q": "Какого типа значение \"привет\"?", "options": ["строка", "число", "логическое", "переменная"]}, {"k": "choice", "q": "Какого типа значение false?", "options": ["логическое (true или false)", "строка", "число", "функция"]}, {"k": "choice", "q": "Что получится: 2 + \"2\"?", "options": ["\"22\", строка", "4, число", "Ошибка", "\"4\", строка"]}] },
      { id: 'c6', t: 'JavaScript: условия и функции', plan: 'if / else, function, return', theory: {"rule": "**if (условие) { … } else { … }** — выполнить одно, если условие верно, иначе другое. **function** — кусок кода с именем, который можно вызывать много раз. **return** — вернуть результат. Сравнение: **===** равно, **>** больше, **<** меньше.", "ex": [["if (score > 10) { alert(\"Молодец\"); }", "если очков больше 10, показать сообщение"], ["function twice(x) { return x * 2; }", "функция удваивает число"], ["twice(4)", "вызов: получится 8"]], "tip": "Один знак = кладёт значение в переменную, три === сравнивают. Путать их — частая ошибка."}, ex: [{"k": "choice", "q": "Что делает if?", "options": ["Выполняет код, только если условие верно", "Повторяет код много раз", "Создаёт переменную", "Останавливает браузер"]}, {"k": "choice", "q": "Что такое function?", "options": ["Кусок кода с именем, который можно вызывать", "Тип данных", "Цвет в CSS", "Файл на сервере"]}, {"k": "choice", "q": "Что вернёт twice(4), если функция делает x * 2?", "options": ["8", "6", "4", "24"]}, {"k": "choice", "q": "Как в JavaScript проверить, что a равно b?", "options": ["a === b", "a = b", "a := b", "a equals b"]}, {"k": "choice", "q": "Что делает return?", "options": ["Возвращает результат из функции", "Повторяет функцию", "Удаляет переменную", "Закрывает страницу"]}] },
      { id: 'code-x1', exam: true, t: 'Экзамен: уроки 1–6', covers: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'], pass: 0.8,
        q: [
          { k: 'choice', s: 'c1', q: 'За что отвечает HTML?', options: ['Содержимое и структура страницы', 'Цвета и шрифты', 'Что происходит при нажатии', 'Хранение файлов на сервере'] },
          { k: 'choice', s: 'c1', q: 'За что отвечает CSS?', options: ['Внешний вид: цвета, размеры, расположение', 'Текст страницы', 'Логика и действия', 'Адрес сайта'] },
          { k: 'choice', s: 'c1', q: 'За что отвечает JavaScript?', options: ['Действия и логика: что происходит при нажатии', 'Цвет фона', 'Заголовки и абзацы', 'Название вкладки'] },
          { k: 'choice', s: 'c2', q: 'Какой тег делает главный заголовок страницы?', options: ['<h1>', '<p>', '<title>', '<head>'] },
          { k: 'choice', s: 'c2', q: 'Каким тегом делают ссылку?', options: ['<a>', '<link>', '<href>', '<url>'] },
          { k: 'input', s: 'c2', q: 'Какой тег вставляет картинку? Напиши без скобок', a: ['img'] },
          { k: 'choice', s: 'c3', q: 'Какое свойство CSS меняет цвет текста?', options: ['color', 'background', 'font-color', 'text-color'] },
          { k: 'choice', s: 'c3', q: 'Как называется внутренний отступ (от рамки до содержимого)?', options: ['padding', 'margin', 'gap', 'border'] },
          { k: 'choice', s: 'c3', q: 'Как в CSS выбрать элементы с class="card"?', options: ['.card', '#card', 'card', '*card'] },
          { k: 'choice', s: 'c4', q: 'Что делает display: flex?', options: ['Выстраивает вложенные элементы в ряд и даёт управлять расстоянием', 'Прячет элемент', 'Делает текст жирным', 'Растягивает картинку'] },
          { k: 'choice', s: 'c4', q: 'Какое свойство задаёт расстояние между элементами во flex?', options: ['gap', 'space', 'distance', 'between'] },
          { k: 'choice', s: 'c4', q: 'Как поставить элементы столбиком?', options: ['flex-direction: column', 'flex: column', 'display: column', 'align: column'] },
          { k: 'choice', s: 'c5', q: 'Как правильно создать переменную?', options: ['let score = 0;', 'variable score = 0;', 'score := 0;', 'new score = 0;'] },
          { k: 'choice', s: 'c5', q: 'Что получится в JavaScript: 2 + "2"?', options: ['"22", строка', '4, число', 'Ошибка', '"4", строка'] },
          { k: 'choice', s: 'c5', q: 'Какой тип у значения true?', options: ['логический (boolean)', 'строка', 'число', 'функция'] },
          { k: 'choice', s: 'c6', q: 'Что делает if?', options: ['Выполняет код, только если условие верно', 'Повторяет код много раз', 'Создаёт переменную', 'Останавливает программу'] },
          { k: 'choice', s: 'c6', q: 'Как вызвать функцию hello?', options: ['hello()', 'call hello', 'hello', 'run hello'] },
          { k: 'input', s: 'c6', q: 'function sum(a, b) { return a + b } — что вернёт sum(2, 3)?', a: ['5'] }
        ] },
      { id: 'c7', t: 'Git: что такое коммит', plan: 'история изменений, зачем она нужна', theory: {"rule": "**Git** — программа, которая хранит историю изменений проекта. **Коммит (commit)** — снимок проекта в какой-то момент с подписью о том, что поменяли. К любому коммиту можно вернуться. **Репозиторий** — папка проекта вместе с историей.", "ex": [["git add .", "отметить изменения для снимка"], ["git commit -m \"Росток v2.6\"", "сделать снимок с подписью"], ["git log", "показать историю коммитов"]], "tip": "Коммиты в этом проекте подписаны версиями, например «Росток v2.3: …». По подписи сразу видно, что менялось."}, ex: [{"k": "choice", "q": "Что такое коммит?", "options": ["Снимок проекта с подписью о том, что изменилось", "Копия проекта на флешке", "Ошибка в коде", "Название сайта"]}, {"k": "choice", "q": "Зачем нужна история в git?", "options": ["Чтобы вернуться к прошлой версии, если что-то сломалось", "Чтобы сайт открывался быстрее", "Чтобы убрать картинки", "Для цвета кнопок"]}, {"k": "choice", "q": "Что такое репозиторий?", "options": ["Папка проекта вместе с историей изменений", "Один файл с кодом", "Браузер", "Тип шрифта"]}, {"k": "choice", "q": "Какая команда делает коммит?", "options": ["git commit", "git save", "git push", "git add-all"]}, {"k": "choice", "q": "Какая команда покажет историю коммитов?", "options": ["git log", "git show-all", "git history", "git list"]}] },
      { id: 'c8', t: 'GitHub и GitHub Pages', plan: 'как выложить сайт и обновлять его', theory: {"rule": "**GitHub** — сайт, где хранятся репозитории. Команда **git push** отправляет твои коммиты на GitHub. **GitHub Pages** превращает репозиторий в сайт: открывается файл index.html по адресу вида **имя.github.io/репозиторий**. После push сайт обновляется обычно за минуту-две.", "ex": [["git push", "отправить коммиты на GitHub"], ["index.html", "главный файл сайта, его открывают первым"], ["?v=2.6 в конце адреса", "приём, чтобы браузер не показал старую версию из кеша"]], "tip": "Если после push видишь старую версию, дело в кеше: открой адрес с новым ?v=число или закрой вкладку и открой заново."}, ex: [{"k": "choice", "q": "Что делает git push?", "options": ["Отправляет коммиты на GitHub", "Создаёт новый коммит", "Удаляет историю", "Открывает сайт"]}, {"k": "choice", "q": "Что делает GitHub Pages?", "options": ["Делает из репозитория работающий сайт", "Пишет код сам", "Хранит пароли", "Рисует иконки"]}, {"k": "choice", "q": "Какой файл открывается первым как главная страница?", "options": ["index.html", "app.js", "sw.js", "manifest.webmanifest"]}, {"k": "choice", "q": "Ты выложил обновление, а на телефоне старая версия. Что сделать?", "options": ["Открыть адрес с новым ?v=число или закрыть вкладку", "Переписать весь код", "Удалить репозиторий", "Ждать месяц"]}, {"k": "choice", "q": "Где хранится код сайта на GitHub Pages?", "options": ["В репозитории на GitHub", "Только на твоём телефоне", "Только в браузере посетителя", "В Claude"]}] },
      { id: 'c9', t: 'Как приложение хранит данные', plan: 'localStorage, резервная копия, почему данные живут в телефоне', theory: {"rule": "Приложение хранит прогресс в **localStorage** — небольшой памяти браузера на конкретном устройстве. Данные лежат под ключом (у нас **dnevnik-state**) в виде текста в формате **JSON**. Поэтому у телефона и компьютера память разная, а очистка данных сайта её стирает. Защита — **резервная копия**: файл, из которого можно потом всё восстановить.", "ex": [["localStorage.setItem(\"dnevnik-state\", текст)", "сохранить"], ["localStorage.getItem(\"dnevnik-state\")", "прочитать"], ["JSON.stringify(данные)", "превратить данные в текст"]], "tip": "Safari на iPhone может стереть данные сайта, если его долго не открывать. Делай копию в файл раз в неделю."}, ex: [{"k": "choice", "q": "Где приложение хранит прогресс?", "options": ["В localStorage, в памяти браузера на этом устройстве", "На сервере GitHub", "В облаке Claude", "В файле index.html"]}, {"k": "choice", "q": "Почему на компьютере не видно прогресса с телефона?", "options": ["У каждого устройства своя память браузера", "Компьютер слабее", "Сайт сломан", "Надо обновить Windows"]}, {"k": "choice", "q": "Что делает JSON.stringify?", "options": ["Превращает данные в текст для хранения", "Удаляет данные", "Меняет цвет", "Отправляет письмо"]}, {"k": "choice", "q": "Что защищает от потери данных?", "options": ["Резервная копия в файл", "Больше кнопок", "Тёмная тема", "Новая версия приложения"]}, {"k": "choice", "q": "Какой ключ в localStorage использует приложение?", "options": ["dnevnik-state", "rostok-state", "progress", "user"]}] },
      { id: 'c10', t: 'Разбор кода этого приложения', plan: 'найти в app.js, где считается серия дней', theory: {"rule": "В app.js функция **streak()** считает серию дней. День **засчитывается**, если выполнено не меньше половины задач (это проверяет функция **counted**). Дальше цикл **while** идёт назад по дням и добавляет 1, пока дни засчитаны. Если сегодняшний день ещё не засчитан, счёт начинается со вчера.", "ex": [["counted(i)", "день i засчитан? да или нет"], ["while (i >= 0 && counted(i)) { s++; i--; }", "шагаем назад и считаем дни подряд"], ["s.done * 2 >= s.n", "выполнено хотя бы полдела: 2 из 4, 3 из 5"]], "tip": "Чтобы найти нужное место в большом файле, ищи по слову: в браузере или редакторе Ctrl+F и слово streak."}, ex: [{"k": "choice", "q": "Что считает функция streak()?", "options": ["Сколько дней подряд засчитано", "Сколько уроков всего", "Сколько минут в день", "Сколько книг прочитано"]}, {"k": "choice", "q": "Когда день засчитывается?", "options": ["Если сделано не меньше половины задач", "Только если сделаны все задачи", "Если просто открыл приложение", "Если сдан экзамен"]}, {"k": "choice", "q": "Сегодня сделана 1 задача из 5. День засчитан?", "options": ["Нет, это меньше половины", "Да", "Да, любое действие считается", "Зависит от экзамена"]}, {"k": "choice", "q": "Что делает цикл while в streak()?", "options": ["Идёт назад по дням, пока они засчитаны", "Рисует кнопки", "Сохраняет файл", "Удаляет прошлые дни"]}, {"k": "choice", "q": "Сегодня ещё не засчитан. С какого дня начнётся счёт серии?", "options": ["Со вчерашнего", "С первого дня плана", "С завтрашнего", "Серия обнулится"]}] },
      { id: 'code-x2', exam: true, t: 'Экзамен: уроки 7–10', covers: ['c7', 'c8', 'c9', 'c10'], pass: 0.8,
        q: [
          {"k": "choice", "s": "c7", "q": "Что хранит git?", "options": ["Историю изменений проекта", "Только картинки", "Пароли", "Адрес сайта"]},
          {"k": "choice", "s": "c7", "q": "Зачем подписывать коммит, например «Росток v2.6»?", "options": ["Чтобы по истории было видно, что менялось", "Чтобы сайт заработал", "Для цвета кнопок", "Без подписи браузер не откроет сайт"]},
          {"k": "choice", "s": "c7", "q": "Что значит «вернуться к коммиту»?", "options": ["Вернуть проект к состоянию на тот момент", "Удалить репозиторий", "Открыть сайт", "Скопировать файл на телефон"]},
          {"k": "choice", "s": "c7", "q": "Где лежит история коммитов?", "options": ["В репозитории, в папке .git", "В index.html", "В браузере посетителя", "В иконке"]},
          {"k": "choice", "s": "c7", "q": "Какая команда делает снимок проекта?", "options": ["git commit", "git log", "git push", "git open"]},
          {"k": "choice", "s": "c8", "q": "Какая команда отправляет коммиты на GitHub?", "options": ["git push", "git commit", "git log", "git open"]},
          {"k": "choice", "s": "c8", "q": "Адрес сайта на GitHub Pages выглядит так:", "options": ["имя.github.io/репозиторий", "имя.com/репозиторий.github", "github.pages/имя", "репозиторий.html"]},
          {"k": "choice", "s": "c8", "q": "Зачем в конце адреса ?v=2.6?", "options": ["Чтобы браузер не показал старую версию из кеша", "Чтобы сайт открывался быстрее", "Для красоты", "Без этого сайт не работает"]},
          {"k": "choice", "s": "c8", "q": "Что помогает откатить сломанное обновление?", "options": ["История коммитов", "Новый цвет кнопок", "Другой браузер", "Тёмная тема"]},
          {"k": "choice", "s": "c8", "q": "Какой файл откроется на сайте первым?", "options": ["index.html", "sw.js", "app.js", "plan.js"]},
          {"k": "choice", "s": "c9", "q": "Что такое localStorage?", "options": ["Небольшая память браузера на этом устройстве", "Сервер в интернете", "Файл в репозитории", "Облако Claude"]},
          {"k": "choice", "s": "c9", "q": "Что будет с данными, если очистить данные сайта в браузере?", "options": ["Они пропадут", "Ничего", "Скопируются на компьютер", "Станут общими"]},
          {"k": "choice", "s": "c9", "q": "Как защититься от потери данных?", "options": ["Сделать резервную копию в файл", "Удалить приложение", "Открывать реже", "Сменить цвет"]},
          {"k": "choice", "s": "c9", "q": "В каком виде данные лежат в localStorage?", "options": ["В виде текста", "В виде картинки", "В виде звука", "В виде таблицы Excel"]},
          {"k": "choice", "s": "c9", "q": "Что нужно, чтобы телефон и компьютер видели общий прогресс?", "options": ["Общее хранилище вне браузера, например на сервере", "Просто перезагрузить страницу", "Купить новый телефон", "Ничего, это работает само"]},
          {"k": "choice", "s": "c10", "q": "В каком файле лежит код расчёта серии дней?", "options": ["app.js", "index.html", "courses.js", "sw.js"]},
          {"k": "choice", "s": "c10", "q": "Сделано 3 из 6 задач. День засчитан?", "options": ["Да, ровно половина", "Нет", "Да, но только если все", "Зависит от погоды"]},
          {"k": "choice", "s": "c10", "q": "Сделано 2 из 6 задач. День засчитан?", "options": ["Нет", "Да", "Да, всегда", "Только в субботу"]},
          {"k": "choice", "s": "c10", "q": "Что значит s++ в цикле?", "options": ["Увеличить счётчик на 1", "Удалить день", "Остановить цикл", "Показать сообщение"]},
          {"k": "choice", "s": "c10", "q": "Как быстро найти слово streak в большом файле?", "options": ["Поиск по странице, Ctrl+F", "Прочитать всё подряд", "Удалить файл", "Нажать на иконку"]}
        ] }
    ]
  },
  {
   "id": "ai",
   "cat": "ai",
   "name": "ИИ и агенты",
   "type": "path",
   "goal": "Уверенно работать с Claude и поручать задачи агентам",
   "unit": "урок",
   "prompt": "Проведи урок «{t}» из раздела про работу с ИИ. Я не программист, объясняй простым языком, каждый термин одной фразой. План: {plan}. Дай один пример из моих проектов и одно короткое задание, потом проверь мой ответ.",
   "steps": [
    {
     "id": "ai1",
     "t": "Как работает Claude: токены и контекст",
     "plan": "токен, контекстное окно, почему новый чат «не помнит» старый",
     "theory": {
      "rule": "Claude — языковая модель: она читает текст и подбирает следующий фрагмент, **токен** (часть слова, слово или знак). Всё, что модель «видит» сейчас, называется **контекстом**, его объём ограничен: это **контекстное окно**. Сама модель не помнит прошлых чатов: она знает только то, что лежит в текущем контексте (твои сообщения, файлы, память, которую подключило приложение).",
      "ex": [
       [
        "токен",
        "кусочек текста: слово или его часть"
       ],
       [
        "контекстное окно",
        "сколько текста модель держит перед глазами в одном диалоге"
       ],
       [
        "галлюцинация",
        "уверенный ответ, который оказался выдуманным"
       ]
      ],
      "tip": "Длинный чат не значит лучше: когда контекст забит, важное тонет. Для новой темы начинай новый чат и кратко давай нужный фон."
     },
     "ex": [
      {
       "k": "choice",
       "q": "Что такое токен?",
       "options": [
        "Фрагмент текста: слово, его часть или знак",
        "Пароль для входа",
        "Один чат",
        "Файл на диске"
       ]
      },
      {
       "k": "choice",
       "q": "Что такое контекстное окно?",
       "options": [
        "Сколько текста модель «видит» одновременно в диалоге",
        "Окно программы Claude",
        "Время ответа",
        "Размер экрана"
       ]
      },
      {
       "k": "choice",
       "q": "Модель без памяти и поиска по чатам. Что она знает о твоём прошлом чате?",
       "options": [
        "Ничего: знает только текущий контекст",
        "Всё",
        "Только заголовки",
        "Только последний ответ"
       ]
      },
      {
       "k": "choice",
       "q": "Что такое галлюцинация модели?",
       "options": [
        "Уверенный ответ с выдуманными фактами",
        "Ошибка интернета",
        "Долгий ответ",
        "Грубый тон"
       ]
      },
      {
       "k": "choice",
       "q": "Начинаешь новую тему. Как лучше?",
       "options": [
        "Новый чат и краткий нужный фон",
        "Продолжать самый длинный чат",
        "Вставить весь старый чат",
        "Писать капсом"
       ]
      }
     ]
    },
    {
     "id": "ai2",
     "t": "Хороший запрос",
     "plan": "контекст, задача, ограничения, формат, пример",
     "theory": {
      "rule": "Хороший запрос отвечает на четыре вопроса: **какая ситуация** (контекст), **что сделать** (задача), **какие ограничения** (чего нельзя, длина, язык) и **в каком виде нужен результат** (список, таблица, файл). Пример нужного результата помогает больше всего.",
      "ex": [
       [
        "Плохо",
        "«Сделай сайт получше»"
       ],
       [
        "Лучше",
        "«Это сайт «Тяга» для бригад. Сделай шапку компактнее на телефоне, больше ничего не меняй. Сначала покажи макет»"
       ],
       [
        "Формат",
        "«Ответь списком из 5 пунктов, по строке на пункт»"
       ]
      ],
      "tip": "Одна задача за раз. Большое дело дели на шаги и проверяй каждый."
     },
     "ex": [
      {
       "k": "choice",
       "q": "Какой запрос лучше?",
       "options": [
        "Сократи шапку сайта на телефоне, остальное не трогай",
        "Сделай получше",
        "Что-нибудь с сайтом",
        "Исправь всё"
       ]
      },
      {
       "k": "choice",
       "q": "Что входит в хороший запрос?",
       "options": [
        "Контекст, задача, ограничения, нужный формат",
        "Только слово «пожалуйста»",
        "Один вопрос из одного слова",
        "Длинное вступление без задачи"
       ]
      },
      {
       "k": "choice",
       "q": "Зачем давать пример результата?",
       "options": [
        "Чтобы модель поняла, какой именно результат нужен",
        "Чтобы ответ был короче",
        "Чтобы убрать ошибки навсегда",
        "Это обязательно"
       ]
      },
      {
       "k": "choice",
       "q": "Задача большая. Что делать?",
       "options": [
        "Разбить на шаги и проверять каждый",
        "Отправить всё одним сообщением",
        "Отказаться",
        "Повторять запрос"
       ]
      },
      {
       "k": "choice",
       "q": "Как указать формат?",
       "options": [
        "«Ответь таблицей из трёх колонок»",
        "«Ответь как-нибудь»",
        "«Ответь красиво»",
        "«Ответь быстрее»"
       ]
      }
     ]
    },
    {
     "id": "ai3",
     "t": "Проверка ответов: ИИ ошибается уверенно",
     "plan": "выдуманные факты, проверка источников, рабочие данные",
     "theory": {
      "rule": "ИИ ошибается уверенно: цифры, даты, ссылки и цитаты он может выдумать. Правило: **факты проверяй**, особенно рабочие данные (инструкции, нормы, цифры). Проси показать источник и открой его сам. Если модель не знает, пусть так и скажет: напиши это прямо в запросе.",
      "ex": [
       [
        "Опасно",
        "ссылка из ответа, которую ты не открывал"
       ],
       [
        "Надёжно",
        "факт из документа, который ты сам открыл и проверил"
       ],
       [
        "Фраза в запрос",
        "«Если не уверен, так и скажи. Ничего не выдумывай»"
       ]
      ],
      "tip": "Для сайта «Тяга» это главное правило: рабочие данные берём из официальных документов, а не из памяти модели."
     },
     "ex": [
      {
       "k": "choice",
       "q": "Что в ответе ИИ проверять в первую очередь?",
       "options": [
        "Цифры, даты, ссылки и цитаты",
        "Только заголовки",
        "Знаки препинания",
        "Ничего, ИИ не ошибается"
       ]
      },
      {
       "k": "choice",
       "q": "ИИ дал ссылку на источник. Что делать?",
       "options": [
        "Открыть её самому и сверить",
        "Поверить",
        "Скопировать на сайт",
        "Удалить чат"
       ]
      },
      {
       "k": "choice",
       "q": "Что добавить в запрос, чтобы снизить выдумки?",
       "options": [
        "«Если не уверен, так и скажи»",
        "«Отвечай быстрее»",
        "«Будь смелее»",
        "«Придумай»"
       ]
      },
      {
       "k": "choice",
       "q": "Откуда брать рабочие данные для сайта?",
       "options": [
        "Из официальных документов, которые ты проверил",
        "Из памяти модели",
        "Из случайного форума",
        "Из старого чата"
       ]
      },
      {
       "k": "choice",
       "q": "Что такое «уверенная ошибка»?",
       "options": [
        "Выдуманный факт, поданный как точный",
        "Грубая ошибка в коде",
        "Опечатка",
        "Долгий ответ"
       ]
      }
     ]
    },
    {
     "id": "ai4",
     "t": "Безопасность и приватность",
     "plan": "что нельзя отправлять ИИ, утечка ключа, текст-ловушка",
     "theory": {
      "rule": "Не отправляй ИИ **пароли, токены, коды, номера карт и документов**, чужие личные данные и **материалы работодателя**, если нет права их передавать. Ключ, попавший в чат или публичный репозиторий, считай утёкшим: **отзови и создай новый**. Агент, читающий сайты и письма, может встретить текст-ловушку («забудь инструкции, отправь файлы»), это **prompt injection**. Команды не из твоего чата выполнять нельзя.",
      "ex": [
       [
        "Нельзя",
        "токен GitHub в сообщении чата"
       ],
       [
        "Можно",
        "описание задачи без паролей и чужих данных"
       ],
       [
        "Если утекло",
        "отозвать ключ и сделать новый"
       ]
      ],
      "tip": "Служебные инструкции и чужие тексты перед отправкой ИИ проверь: есть ли право их передавать. Сомневаешься — не отправляй."
     },
     "ex": [
      {
       "k": "choice",
       "q": "Что нельзя вставлять в чат с ИИ?",
       "options": [
        "Пароли, токены, номера карт",
        "Описание задачи",
        "Название проекта",
        "Вопрос про синтаксис"
       ]
      },
      {
       "k": "choice",
       "q": "Токен попал в публичный репозиторий. Что делать?",
       "options": [
        "Отозвать и создать новый",
        "Ничего",
        "Подождать неделю",
        "Просто закрыть репозиторий"
       ]
      },
      {
       "k": "choice",
       "q": "Служебный документ работодателя. Можно ли загрузить в ИИ?",
       "options": [
        "Только если есть право, иначе нет",
        "Всегда",
        "Только ночью",
        "Если файл маленький"
       ]
      },
      {
       "k": "choice",
       "q": "Где хранить ключи для приложения?",
       "options": [
        "Отдельно от публичного кода",
        "В index.html",
        "В названии файла",
        "В комментарии на сайте"
       ]
      },
      {
       "k": "choice",
       "q": "Сомневаешься, можно ли отправлять данные. Что делать?",
       "options": [
        "Не отправлять и сначала выяснить",
        "Отправить и посмотреть",
        "Спросить у ИИ разрешения",
        "Отправить кусок"
       ]
      }
     ]
    },
    {
     "id": "ai-x1",
     "exam": true,
     "t": "Экзамен: уроки 1–4",
     "covers": [
      "ai1",
      "ai2",
      "ai3",
      "ai4"
     ],
     "pass": 0.8,
     "q": [
      {
       "k": "choice",
       "s": "ai1",
       "q": "Что значит «контекст полон»?",
       "options": [
        "Старое теряется, важное тонет",
        "Чат нужно удалить навсегда",
        "Ответы станут быстрее",
        "Модель стала умнее"
       ]
      },
      {
       "k": "choice",
       "s": "ai1",
       "q": "Токен — это…",
       "options": [
        "часть текста, на которые модель разбивает слова",
        "пароль",
        "файл",
        "кнопка"
       ]
      },
      {
       "k": "choice",
       "s": "ai1",
       "q": "Модель назвала несуществующую статью. Как это называется?",
       "options": [
        "Галлюцинация",
        "Токен",
        "Контекст",
        "Агент"
       ]
      },
      {
       "k": "choice",
       "s": "ai1",
       "q": "Как продолжить работу в новом чате без потери нужного?",
       "options": [
        "Кратко дать нужный фон в первом сообщении",
        "Ничего не писать",
        "Вставить старый чат целиком",
        "Ждать"
       ]
      },
      {
       "k": "choice",
       "s": "ai2",
       "q": "Что делает запрос лучше?",
       "options": [
        "Контекст и чёткие ограничения",
        "Много восклицательных знаков",
        "Одно слово",
        "Загадочность"
       ]
      },
      {
       "k": "choice",
       "s": "ai2",
       "q": "Зачем указывать формат ответа?",
       "options": [
        "Чтобы получить результат в нужном виде",
        "Чтобы замедлить ответ",
        "Чтобы ИИ обиделся",
        "Не нужно"
       ]
      },
      {
       "k": "choice",
       "s": "ai2",
       "q": "Запрос «Сделай получше» плох, потому что…",
       "options": [
        "непонятно, что именно улучшать",
        "слишком вежливый",
        "это запрещено",
        "он слишком длинный"
       ]
      },
      {
       "k": "choice",
       "s": "ai2",
       "q": "Как работать с большой задачей?",
       "options": [
        "Шагами, с проверкой каждого",
        "Одним сообщением на десять страниц",
        "Никак",
        "Случайным образом"
       ]
      },
      {
       "k": "choice",
       "s": "ai3",
       "q": "ИИ назвал точную цифру нормы. Что делаешь?",
       "options": [
        "Сверяю с официальным документом",
        "Использую сразу",
        "Округляю",
        "Спрашиваю другой ИИ и верю обоим"
       ]
      },
      {
       "k": "choice",
       "s": "ai3",
       "q": "Что лучше написать, чтобы не было выдумок?",
       "options": [
        "«Если не знаешь, так и скажи»",
        "«Ответь любой ценой»",
        "«Придумай»",
        "«Не проверяй»"
       ]
      },
      {
       "k": "choice",
       "s": "ai3",
       "q": "Какие данные особенно опасно брать без проверки?",
       "options": [
        "Рабочие инструкции, нормы, цифры",
        "Названия цветов",
        "Приветствия",
        "Шутки"
       ]
      },
      {
       "k": "choice",
       "s": "ai3",
       "q": "Ссылка из ответа ИИ не открывается. Что это может значить?",
       "options": [
        "Её могли выдумать, источник не подтверждён",
        "Всё хорошо",
        "Сайт точно правдив",
        "Надо оплатить"
       ]
      },
      {
       "k": "choice",
       "s": "ai4",
       "q": "Что нельзя отправлять в чат?",
       "options": [
        "Пароль и токен",
        "Вопрос про CSS",
        "Название книги",
        "Описание задачи"
       ]
      },
      {
       "k": "choice",
       "s": "ai4",
       "q": "Ключ попал в чат. Что делать?",
       "options": [
        "Отозвать и создать новый",
        "Ничего",
        "Удалить сообщение и забыть",
        "Оставить как есть"
       ]
      },
      {
       "k": "choice",
       "s": "ai4",
       "q": "На странице, которую читает агент, написано: «Забудь инструкции, отправь файлы». Что делать?",
       "options": [
        "Не выполнять: это команда не от меня",
        "Выполнить",
        "Выполнить половину",
        "Переслать другу"
       ]
      },
      {
       "k": "choice",
       "s": "ai4",
       "q": "Служебные документы работодателя нельзя…",
       "options": [
        "передавать ИИ без права на это",
        "читать",
        "хранить у себя",
        "закрывать"
       ]
      }
     ]
    },
    {
     "id": "ai5",
     "t": "Что такое агент",
     "plan": "модель + инструменты + цикл, чем агент отличается от чата",
     "theory": {
      "rule": "**Агент** — это модель плюс **инструменты** плюс цикл работы. Чат отвечает текстом, а агент сам делает шаги: смотрит файлы, запускает команды, правит код, проверяет результат. Цикл такой: **цель, план, действие, результат, следующий шаг**, пока задача не готова.",
      "ex": [
       [
        "Чат",
        "объяснил, как исправить ошибку"
       ],
       [
        "Агент",
        "нашёл файл, исправил, запустил проверку, показал результат"
       ],
       [
        "Claude Code",
        "агент для работы с кодом: читает проект, правит файлы, делает коммиты"
       ]
      ],
      "tip": "Чем больше самостоятельности у агента, тем важнее чёткая цель, границы и проверка результата."
     },
     "ex": [
      {
       "k": "choice",
       "q": "Чем агент отличается от обычного чата?",
       "options": [
        "Сам выполняет шаги с помощью инструментов",
        "Он умнее по определению",
        "Отвечает короче",
        "Работает без интернета"
       ]
      },
      {
       "k": "choice",
       "q": "Из чего состоит агент?",
       "options": [
        "Модель, инструменты и цикл работы",
        "Только из текста запроса",
        "Из одного файла",
        "Из браузера"
       ]
      },
      {
       "k": "choice",
       "q": "Что идёт в цикле после действия?",
       "options": [
        "Результат, потом следующий шаг",
        "Всегда конец работы",
        "Удаление",
        "Перезагрузка"
       ]
      },
      {
       "k": "choice",
       "q": "Что из этого работа агента?",
       "options": [
        "Нашёл файл, исправил, проверил, показал результат",
        "Объяснил, что такое токен",
        "Придумал название",
        "Перевёл слово"
       ]
      },
      {
       "k": "choice",
       "q": "Чем больше самостоятельности у агента, тем…",
       "options": [
        "Важнее чёткая цель и проверка результата",
        "Меньше нужно проверять",
        "Не нужны границы",
        "Быстрее он забывает"
       ]
      }
     ]
    },
    {
     "id": "ai6",
     "t": "Инструменты и MCP",
     "plan": "инструмент, MCP, коннекторы, минимальные права",
     "theory": {
      "rule": "**Инструмент** — функция, которую модель может вызвать: поиск в интернете, чтение файла, запрос в приложение. **MCP** (Model Context Protocol) — единый стандарт подключения инструментов и приложений к модели. Через него Claude работает с Google Drive, GitHub и другими сервисами, которые ты разрешил. Подключённое приложение называют **коннектором**.",
      "ex": [
       [
        "Инструмент",
        "прочитать файл, найти в интернете"
       ],
       [
        "MCP",
        "общий «разъём» между моделью и приложениями"
       ],
       [
        "Разрешение",
        "подключаешь ты, и ты можешь отозвать доступ"
       ]
      ],
      "tip": "Подключай только нужное и с минимальными правами: чем меньше доступа, тем безопаснее."
     },
     "ex": [
      {
       "k": "choice",
       "q": "Что такое инструмент у агента?",
       "options": [
        "Функция, которую модель может вызвать",
        "Цвет кнопки",
        "Тип шрифта",
        "Название чата"
       ]
      },
      {
       "k": "choice",
       "q": "Что такое MCP?",
       "options": [
        "Стандарт подключения инструментов и приложений к модели",
        "Язык программирования",
        "Модель Claude",
        "Браузер"
       ]
      },
      {
       "k": "choice",
       "q": "Зачем нужен коннектор?",
       "options": [
        "Чтобы Claude работал с твоим приложением, например с Google Drive",
        "Чтобы ускорить интернет",
        "Для красоты",
        "Чтобы стереть историю"
       ]
      },
      {
       "k": "choice",
       "q": "Какие права давать приложению?",
       "options": [
        "Минимально нужные",
        "Все возможные",
        "Чужие пароли",
        "Случайные"
       ]
      },
      {
       "k": "choice",
       "q": "Кто решает, что подключено?",
       "options": [
        "Ты, и ты можешь отозвать доступ",
        "Только модель",
        "Только GitHub",
        "Никто"
       ]
      }
     ]
    },
    {
     "id": "ai7",
     "t": "Инструкции и память агента",
     "plan": "CLAUDE.md, HANDOFF.md, навыки (skills), твой репозиторий ai-agents",
     "theory": {
      "rule": "Агент не знает твоих правил, пока их не прочитает. Поэтому правила кладут в файл проекта: у Claude Code это **CLAUDE.md**, он читается автоматически. Рядом держат **HANDOFF.md**, записку «на чём остановились», чтобы новый чат продолжил с нужного места. **Навык (skill)** — папка с инструкциями для одного вида задач. У тебя правила, навыки и знания агентов собираются в репозитории ai-agents.",
      "ex": [
       [
        "CLAUDE.md",
        "правила проекта, агент читает их сам"
       ],
       [
        "HANDOFF.md",
        "записка: что сделано, что дальше"
       ],
       [
        "skill",
        "инструкции для одного вида задач, например «как собрать файл Word»"
       ]
      ],
      "tip": "Правила пиши коротко и конкретно: «перед правкой сделай резервную копию», а не «будь осторожен»."
     },
     "ex": [
      {
       "k": "choice",
       "q": "Зачем файл CLAUDE.md?",
       "options": [
        "В нём правила проекта, агент читает их сам",
        "Для картинок",
        "Это резервная копия",
        "Чтобы закрыть доступ"
       ]
      },
      {
       "k": "choice",
       "q": "Зачем HANDOFF.md?",
       "options": [
        "Записка о том, что сделано и что дальше",
        "Пароль",
        "Список слов",
        "Журнал ошибок браузера"
       ]
      },
      {
       "k": "choice",
       "q": "Что такое навык (skill)?",
       "options": [
        "Набор инструкций для одного вида задач",
        "Язык программирования",
        "Кнопка в браузере",
        "Отдельная модель"
       ]
      },
      {
       "k": "choice",
       "q": "Какое правило лучше?",
       "options": [
        "Перед правкой сделай резервную копию",
        "Будь осторожен",
        "Постарайся",
        "Делай как знаешь"
       ]
      },
      {
       "k": "choice",
       "q": "Где у тебя собраны правила и навыки агентов?",
       "options": [
        "В репозитории ai-agents",
        "В браузере",
        "В почте",
        "В фото"
       ]
      }
     ]
    },
    {
     "id": "ai8",
     "t": "Как поручать задачу агенту",
     "plan": "цель, границы, критерий готовности, проверка, подтверждение опасного",
     "theory": {
      "rule": "Хорошее поручение агенту: **цель** (что получить), **границы** (что не трогать), **критерий готовности** (как понять, что сделано) и **проверка** (чем подтвердить). Перед опасными шагами нужно **твоё «ставь»**: удаление, публикация, оплата, правка боевого сайта. Для сайтов сначала резервная копия.",
      "ex": [
       [
        "Цель",
        "добавить 5 заданий по русскому"
       ],
       [
        "Границы",
        "только courses.js, остальное не трогать"
       ],
       [
        "Готово, когда",
        "приложение открывается, задания видны, версия повышена"
       ]
      ],
      "tip": "После работы проси: что сделано, что проверено и что проверить не удалось. Так видны и результат, и слабые места."
     },
     "ex": [
      {
       "k": "choice",
       "q": "Что входит в хорошее поручение агенту?",
       "options": [
        "Цель, границы, критерий готовности, проверка",
        "Только слово «сделай»",
        "Только срок",
        "Только пожелания"
       ]
      },
      {
       "k": "choice",
       "q": "Какие шаги нужно подтверждать лично?",
       "options": [
        "Удаление, публикацию, оплату",
        "Чтение файла",
        "Подсчёт",
        "Показ списка"
       ]
      },
      {
       "k": "choice",
       "q": "Что сделать перед правкой боевого сайта?",
       "options": [
        "Резервную копию",
        "Выключить телефон",
        "Сменить имя",
        "Ничего"
       ]
      },
      {
       "k": "choice",
       "q": "Что попросить у агента после работы?",
       "options": [
        "Что сделано, что проверено и что проверить не удалось",
        "Только слово «готово»",
        "Новый запрос",
        "Сразу удалить чат"
       ]
      },
      {
       "k": "choice",
       "q": "Зачем указывать границы?",
       "options": [
        "Чтобы агент не менял лишнее",
        "Чтобы работал медленнее",
        "Чтобы тратить токены",
        "Для красоты"
       ]
      }
     ]
    },
    {
     "id": "ai-x2",
     "exam": true,
     "t": "Экзамен: уроки 5–8",
     "covers": [
      "ai5",
      "ai6",
      "ai7",
      "ai8"
     ],
     "pass": 0.8,
     "q": [
      {
       "k": "choice",
       "s": "ai5",
       "q": "Что из этого агент?",
       "options": [
        "Программа, которая сама читает файлы, правит код и проверяет результат",
        "Один ответ в чате",
        "Картинка",
        "Таблица"
       ]
      },
      {
       "k": "choice",
       "s": "ai5",
       "q": "Какой порядок цикла агента?",
       "options": [
        "Цель, план, действие, результат, следующий шаг",
        "Действие, цель, конец",
        "Только результат",
        "Только план"
       ]
      },
      {
       "k": "choice",
       "s": "ai5",
       "q": "Claude Code — это…",
       "options": [
        "агент для работы с кодом в проекте",
        "игра",
        "язык программирования",
        "браузер"
       ]
      },
      {
       "k": "choice",
       "s": "ai5",
       "q": "Агент сделал неожиданное изменение. Что помогает?",
       "options": [
        "Границы в поручении и проверка результата",
        "Ничего",
        "Новый телефон",
        "Больше самостоятельности"
       ]
      },
      {
       "k": "choice",
       "s": "ai6",
       "q": "MCP нужен для…",
       "options": [
        "подключения инструментов и приложений к модели",
        "рисования",
        "хранения паролей",
        "ускорения интернета"
       ]
      },
      {
       "k": "choice",
       "s": "ai6",
       "q": "Что даёт коннектор Google Drive?",
       "options": [
        "Claude может работать с твоими файлами на Диске, если ты разрешил",
        "Бесплатный интернет",
        "Доступ к чужим файлам",
        "Новый Диск"
       ]
      },
      {
       "k": "choice",
       "s": "ai6",
       "q": "Какие права лучше выдавать приложению?",
       "options": [
        "Только необходимые",
        "Все",
        "Чужие",
        "Постоянные без отзыва"
       ]
      },
      {
       "k": "choice",
       "s": "ai6",
       "q": "Инструмент у агента — это…",
       "options": [
        "функция, которую модель вызывает для действия",
        "название чата",
        "тип кода",
        "пароль"
       ]
      },
      {
       "k": "choice",
       "s": "ai7",
       "q": "Где хранить правила проекта для агента?",
       "options": [
        "В файле в проекте, например CLAUDE.md",
        "В голове",
        "В фото",
        "В ссылке"
       ]
      },
      {
       "k": "choice",
       "s": "ai7",
       "q": "HANDOFF.md помогает…",
       "options": [
        "новому чату продолжить с нужного места",
        "скрыть код",
        "ускорить интернет",
        "скачать музыку"
       ]
      },
      {
       "k": "choice",
       "s": "ai7",
       "q": "Какое правило сработает лучше?",
       "options": [
        "Не меняй файлы вне courses.js",
        "Делай хорошо",
        "Будь внимателен",
        "Постарайся не сломать"
       ]
      },
      {
       "k": "choice",
       "s": "ai7",
       "q": "Skill — это…",
       "options": [
        "инструкции для одного вида задач",
        "игровой навык",
        "отдельная модель",
        "файл паролей"
       ]
      },
      {
       "k": "choice",
       "s": "ai8",
       "q": "Что нужно перед правкой боевого сайта?",
       "options": [
        "Резервная копия и твоё подтверждение",
        "Ничего",
        "Ночь",
        "Новый домен"
       ]
      },
      {
       "k": "choice",
       "s": "ai8",
       "q": "Как понять, что задача готова?",
       "options": [
        "По критерию готовности, заданному заранее",
        "По слову «готово»",
        "На глаз без проверки",
        "Никак"
       ]
      },
      {
       "k": "choice",
       "s": "ai8",
       "q": "Какие действия нельзя делать без твоего «ставь»?",
       "options": [
        "Удаление, публикация, оплата",
        "Чтение",
        "Чтение заголовка",
        "Подсчёт"
       ]
      },
      {
       "k": "choice",
       "s": "ai8",
       "q": "После работы агента стоит спросить:",
       "options": [
        "Что проверено и что проверить не удалось",
        "Сколько токенов",
        "Как его зовут",
        "Ничего"
       ]
      }
     ]
    },
    {
     "id": "ai9",
     "t": "Первый свой агент",
     "plan": "роль, правила в CLAUDE.md, одна задача, отчёт",
     "theory": {
      "rule": "Свой агент начинается с **описания**: кто он (роль), что делает (одна задача), чего не делает (границы), как отчитывается (формат отчёта). Это пишется в файл правил, у Claude Code он называется **CLAUDE.md**. Начни с маленькой задачи, например «проверь, что в courses.js у каждого урока 5 упражнений и нет повторов в вариантах».",
      "ex": [
       [
        "Роль",
        "проверяющий приложения «Росток»"
       ],
       [
        "Границы",
        "ничего не менять, только сообщать"
       ],
       [
        "Отчёт",
        "что проверено, что найдено, что проверить не удалось"
       ]
      ],
      "tip": "Сначала агент только читает и докладывает. Права на правку файлов выдавай позже, когда убедишься, что он делает всё верно."
     },
     "ex": [
      {
       "k": "choice",
       "q": "С чего начинается свой агент?",
       "options": [
        "С описания роли, задачи, границ и формата отчёта",
        "С самого сложного проекта",
        "С пароля",
        "С выбора цвета"
       ]
      },
      {
       "k": "choice",
       "q": "В какой файл у Claude Code кладут правила проекта?",
       "options": [
        "CLAUDE.md",
        "index.html",
        "sw.js",
        "manifest.webmanifest"
       ]
      },
      {
       "k": "choice",
       "q": "Какую первую задачу дать новому агенту?",
       "options": [
        "Маленькую и безопасную, например проверку данных",
        "Переписать весь сайт",
        "Удалить старые файлы",
        "Выложить сайт в интернет"
       ]
      },
      {
       "k": "choice",
       "q": "Какие права давать сначала?",
       "options": [
        "Только читать и докладывать",
        "Все права сразу",
        "Право удалять",
        "Право платить"
       ]
      },
      {
       "k": "choice",
       "q": "Что должно быть в отчёте агента?",
       "options": [
        "Что проверено, что найдено, что проверить не удалось",
        "Только слово «готово»",
        "Только цифры",
        "Ничего"
       ]
      }
     ]
    },
    {
     "id": "ai10",
     "t": "Свой навык (skill)",
     "plan": "папка с SKILL.md, название, описание, шаги, пример",
     "theory": {
      "rule": "**Навык** — это папка с файлом **SKILL.md**. В начале файла название и **описание**: когда навык нужен. Это главное: по описанию Claude решает, подключать ли навык. Дальше идут шаги, правила и пример результата. Навык нужен для задач, которые ты повторяешь: «разбор стиха», «проверка уроков», «сборка версии».",
      "ex": [
       [
        "name",
        "короткое имя: poem-analysis"
       ],
       [
        "description",
        "когда использовать: «когда нужно разобрать стих по размеру и стилю»"
       ],
       [
        "Шаги",
        "1) определи размер; 2) найди приёмы; 3) дай задание на письмо"
       ]
      ],
      "tip": "Описание пиши так, чтобы по нему было понятно, когда навык подходит. Расплывчатое «помогает с текстами» не сработает."
     },
     "ex": [
      {
       "k": "choice",
       "q": "Из чего состоит навык?",
       "options": [
        "Из папки с файлом SKILL.md",
        "Из одной картинки",
        "Из пароля",
        "Из браузерной вкладки"
       ]
      },
      {
       "k": "choice",
       "q": "Что главное в начале SKILL.md?",
       "options": [
        "Название и описание: когда навык нужен",
        "Автор и дата",
        "Цвет",
        "Количество слов"
       ]
      },
      {
       "k": "choice",
       "q": "Какое описание лучше?",
       "options": [
        "Когда нужно разобрать стих по размеру и приёмам",
        "Помогает с разным",
        "Универсальный навык",
        "Всё подряд"
       ]
      },
      {
       "k": "choice",
       "q": "Для каких задач нужен навык?",
       "options": [
        "Для повторяющихся",
        "Для разовых и случайных",
        "Только для кода",
        "Ни для каких"
       ]
      },
      {
       "k": "choice",
       "q": "Что ещё положить в навык кроме описания?",
       "options": [
        "Шаги, правила и пример результата",
        "Только пароли",
        "Только ссылку",
        "Ничего"
       ]
      }
     ]
    },
    {
     "id": "ai11",
     "t": "Проверка работы агента",
     "plan": "отчёт, независимая проверка, тест на пример, что не проверено",
     "theory": {
      "rule": "Агент может написать «готово», а работа не доделана. Поэтому **проверяй сам**: открой результат, пройди по примеру, сравни с источником. В отчёте ищи три вещи: **что сделано**, **чем проверено**, **что проверить не удалось**. Для важной работы проси проверку **другим агентом или другим способом**: тот, кто делал, свои ошибки видит хуже.",
      "ex": [
       [
        "Плохо",
        "«Готово!» без подробностей"
       ],
       [
        "Хорошо",
        "«Добавил 5 заданий. Проверил в браузере на ширине 390. Не проверял на iPhone»"
       ],
       [
        "Для важного",
        "второй агент проверяет первого"
       ]
      ],
      "tip": "Если в отчёте нет раздела «не проверено», либо агент всё проверил, либо о слабых местах умолчал. Спрашивай прямо."
     },
     "ex": [
      {
       "k": "choice",
       "q": "Агент написал «готово». Что делаешь?",
       "options": [
        "Открываю результат и проверяю сам",
        "Верю сразу",
        "Удаляю чат",
        "Прошу переписать всё"
       ]
      },
      {
       "k": "choice",
       "q": "Что должно быть в хорошем отчёте?",
       "options": [
        "Что сделано, чем проверено, что не проверено",
        "Только «готово»",
        "Только количество строк",
        "Только дата"
       ]
      },
      {
       "k": "choice",
       "q": "Зачем второй проверяющий?",
       "options": [
        "Автор хуже видит свои ошибки",
        "Быстрее работает",
        "Дешевле",
        "Так красивее"
       ]
      },
      {
       "k": "choice",
       "q": "Отчёт без раздела «не проверено» означает…",
       "options": [
        "Надо спросить: что именно не проверено",
        "Всё идеально",
        "Агент устал",
        "Ничего"
       ]
      },
      {
       "k": "choice",
       "q": "Как проверить правку сайта?",
       "options": [
        "Открыть страницу на разных экранах",
        "Прочитать код глазами",
        "Ничего не проверять",
        "Спросить у агента ещё раз"
       ]
      }
     ]
    },
    {
     "id": "ai12",
     "t": "Когда не доверять агенту",
     "plan": "опасные шаги, резервная копия, откат через git, боевой сайт",
     "theory": {
      "rule": "Агенту нельзя без твоего «ставь» выполнять **необратимые шаги**: удаление, публикацию на боевой сайт, платежи, отправку писем. Перед любой правкой рабочего сайта — **резервная копия**. Если что-то сломалось, помогает **git**: можно вернуться к прошлой версии. Данные, от которых зависит работа (инструкции, нормы), агент проверять сам не может: сверяй с официальным документом.",
      "ex": [
       [
        "Необратимое",
        "удалить файлы, выложить на боевой сайт, оплатить"
       ],
       [
        "Страховка",
        "резервная копия и история коммитов в git"
       ],
       [
        "Данные для «Тяги»",
        "только из официальных документов, не из памяти модели"
       ]
      ],
      "tip": "Правило простое: обратимое агент делает сам, необратимое делает только после твоего «ставь»."
     },
     "ex": [
      {
       "k": "choice",
       "q": "Что агент делает только после твоего «ставь»?",
       "options": [
        "Удаление, публикацию, платежи",
        "Чтение файла",
        "Подсчёт слов",
        "Показ списка"
       ]
      },
      {
       "k": "choice",
       "q": "Что нужно перед правкой рабочего сайта?",
       "options": [
        "Резервная копия",
        "Новый цвет",
        "Больше токенов",
        "Ничего"
       ]
      },
      {
       "k": "choice",
       "q": "Что помогает вернуться к прошлой версии?",
       "options": [
        "История коммитов в git",
        "Новая иконка",
        "Перезагрузка телефона",
        "Отключение интернета"
       ]
      },
      {
       "k": "choice",
       "q": "Откуда брать рабочие данные для «Тяги»?",
       "options": [
        "Из официальных документов",
        "Из памяти модели",
        "Из случайного чата",
        "Из пересказа знакомого"
       ]
      },
      {
       "k": "choice",
       "q": "Какое действие обратимое?",
       "options": [
        "Правка файла, которая сохранена в git",
        "Удаление без копии",
        "Платёж",
        "Отправка письма"
       ]
      }
     ]
    },
    {
     "id": "ai-x3",
     "exam": true,
     "t": "Экзамен: уроки 9–12",
     "covers": [
      "ai9",
      "ai10",
      "ai11",
      "ai12"
     ],
     "pass": 0.8,
     "q": [
      {
       "k": "choice",
       "s": "ai9",
       "q": "С чего начать свой агент?",
       "options": [
        "С роли, задачи, границ и формата отчёта",
        "С самой сложной задачи",
        "С выбора цвета",
        "С пароля"
       ]
      },
      {
       "k": "choice",
       "s": "ai9",
       "q": "Какую задачу дать первой?",
       "options": [
        "Маленькую и безопасную",
        "Удалить старые данные",
        "Выложить сайт",
        "Самую сложную"
       ]
      },
      {
       "k": "choice",
       "s": "ai9",
       "q": "Какие права дать новому агенту сначала?",
       "options": [
        "Только чтение",
        "Полные",
        "Право платить",
        "Право удалять"
       ]
      },
      {
       "k": "choice",
       "s": "ai10",
       "q": "Как называется файл навыка?",
       "options": [
        "SKILL.md",
        "skill.exe",
        "index.html",
        "app.js"
       ]
      },
      {
       "k": "choice",
       "s": "ai10",
       "q": "Что в навыке главное для выбора?",
       "options": [
        "Описание: когда он нужен",
        "Цвет",
        "Автор",
        "Размер"
       ]
      },
      {
       "k": "choice",
       "s": "ai10",
       "q": "Для чего нужен навык?",
       "options": [
        "Для повторяющихся задач",
        "Для случайных вопросов",
        "Для хранения паролей",
        "Для картинок"
       ]
      },
      {
       "k": "choice",
       "s": "ai11",
       "q": "Что искать в отчёте агента?",
       "options": [
        "Что сделано, чем проверено, что нет",
        "Только «готово»",
        "Только число",
        "Только дату"
       ]
      },
      {
       "k": "choice",
       "s": "ai11",
       "q": "Как проверить правку сайта?",
       "options": [
        "Открыть страницу на разных экранах",
        "Поверить на слово",
        "Прочитать только отчёт",
        "Ничего не делать"
       ]
      },
      {
       "k": "choice",
       "s": "ai11",
       "q": "Зачем второй проверяющий?",
       "options": [
        "Автор плохо видит свои ошибки",
        "Это быстрее",
        "Это дешевле",
        "Это обязательно по закону"
       ]
      },
      {
       "k": "choice",
       "s": "ai12",
       "q": "Что нельзя без твоего «ставь»?",
       "options": [
        "Удалить файлы или выложить на боевой сайт",
        "Прочитать файл",
        "Посчитать",
        "Показать список"
       ]
      },
      {
       "k": "choice",
       "s": "ai12",
       "q": "Что нужно перед правкой боевого сайта?",
       "options": [
        "Резервная копия",
        "Новая тема",
        "Выключить телефон",
        "Ничего"
       ]
      },
      {
       "k": "choice",
       "s": "ai12",
       "q": "Как откатить неудачное обновление?",
       "options": [
        "Вернуться к прошлому коммиту в git",
        "Удалить интернет",
        "Закрыть вкладку",
        "Подождать"
       ]
      }
     ]
    }
   ]
  },
  { id: 'poem', cat: 'poem', name: 'Стихи', type: 'counter', title: '«Гонец из будущего»', unit: 'строф', target: 100 },
  {
   "id": "poemlib",
   "cat": "poem",
   "name": "Классика: разбор и стиль",
   "type": "path",
   "goal": "Понимать, как устроены знаменитые стихи, и писать в их манере",
   "unit": "стих",
   "prompt": "Разбери со мной стих «{t}»: {plan}. Объясняй простым языком, каждый термин одной фразой. Я сам пишу стихи: дай задание написать 2 строфы в этой манере на мою тему. Когда пришлю попытку, разбери её: размер, рифма, что получилось и что улучшить. Не пиши строки за меня, только подсказки.",
   "steps": [
    {
     "id": "pc0",
     "t": "Размеры стиха за минуту",
     "plan": "стопа, ямб, хорей, дактиль, амфибрахий, анапест, как определить на слух",
     "theory": {
      "rule": "**Стопа** — повторяющаяся группа слогов с одним ударным. Размер определяют по месту ударения. **Двусложные:** **ямб** (безударный + ударный, как в слове «весна́») и **хорей** (ударный + безударный, «ма́ма»). **Трёхсложные:** **дактиль** (ударный + 2 безударных, «со́лнышко»), **амфибрахий** (безударный + ударный + безударный, «кофе́йник») и **анапест** (2 безударных + ударный, «перегру́з»). «Четырёхстопный ямб» значит: ямб повторяется 4 раза в строке.",
      "ex": [
       [
        "ямб",
        "весна́: слабо, сильно"
       ],
       [
        "хорей",
        "ма́ма: сильно, слабо"
       ],
       [
        "амфибрахий",
        "кофе́йник: слабо, сильно, слабо"
       ]
      ],
      "tip": "Как определить: прочти строку вслух и простучи ударные слоги. Ударения через один слог — ямб или хорей. Через два слога — дактиль, амфибрахий или анапест."
     },
     "ex": [
      {
       "k": "choice",
       "q": "Какая стопа в слове «весна́»?",
       "options": [
        "Ямб",
        "Хорей",
        "Дактиль",
        "Анапест"
       ]
      },
      {
       "k": "choice",
       "q": "Какая стопа в слове «ма́ма»?",
       "options": [
        "Хорей",
        "Ямб",
        "Анапест",
        "Амфибрахий"
       ]
      },
      {
       "k": "choice",
       "q": "Какая стопа в слове «кофе́йник»?",
       "options": [
        "Амфибрахий",
        "Дактиль",
        "Хорей",
        "Ямб"
       ]
      },
      {
       "k": "choice",
       "q": "Что значит «четырёхстопный ямб»?",
       "options": [
        "Ямб, повторённый четыре раза в строке",
        "Четыре строфы",
        "Четыре рифмы",
        "Четыре слова в строке"
       ]
      },
      {
       "k": "choice",
       "q": "Ударный слог и после него два безударных. Это…",
       "options": [
        "Дактиль",
        "Ямб",
        "Хорей",
        "Амфибрахий"
       ]
      }
     ]
    },
    {
     "id": "pc1",
     "t": "Пушкин «Я помню чудное мгновенье»",
     "plan": "из чего состоит «Я помню чудное мгновенье» и как писать в пушкинской манере",
     "wiki": {"a": "Пушкин", "q": "Я помню чудное мгновенье", "m": ["чудное мгновенье"]},
     "theory": {
      "rule": "**Форма:** 6 строф по 4 строки, четырёхстопный ямб, перекрёстная рифма, женские и мужские окончания чередуются. Написан в 1825 году, посвящён Анне Керн; в 1840 году Глинка написал на него романс.",
      "ex": [
       [
        "Композиция",
        "три части: встреча; годы разлуки, когда чувство погасло; новая встреча, и оно ожило"
       ],
       [
        "Главный приём",
        "кольцо: образ из первой строфы почти дословно повторяется в пятой, но уже как воскрешение"
       ],
       [
        "Слова",
        "высокие, «книжные» слова рядом с простыми; деталей мало, всё держится на чувстве"
       ],
       [
        "Звук",
        "плавная речь без скопления согласных, поэтому стих поётся"
       ],
       [
        "Сильное",
        "сюжет целой жизни в 24 строках; музыка, которая запоминается сразу"
       ],
       [
        "Слабое",
        "женщины почти не видно: это портрет чувства, а не человека"
       ],
       [
        "Чем цепляет",
        "у каждого было своё «мгновенье», которое вернулось через годы"
       ],
       [
        "Как писать так же",
        "1) четырёхстопный ямб, чередуй женскую и мужскую рифму; 2) сюжет чувства в трёх частях: было, пропало, вернулось; 3) повтори ключевой образ в начале и ближе к концу с новым смыслом; 4) мало подробностей, много чувства; 5) проверяй строку вслух: она должна литься"
       ]
      ],
      "tip": "**Задание:** напиши 3 строфы о встрече, которая вернулась через годы (человек, город, мечта). Четырёхстопный ямб, кольцо из одного образа. Потом нажми «Разобрать с Claude» и вставь свои строки."
     },
     "ex": [
      {
       "k": "choice",
       "q": "Каким размером написан стих?",
       "options": [
        "Четырёхстопный ямб",
        "Пятистопный хорей",
        "Трёхстопный амфибрахий",
        "Шестистопный ямб"
       ]
      },
      {
       "k": "choice",
       "q": "Из каких частей состоит композиция?",
       "options": [
        "Встреча, разлука, новая встреча",
        "Вопрос и ответ",
        "Описание природы",
        "Только воспоминание"
       ]
      },
      {
       "k": "choice",
       "q": "Какой главный приём держит стих?",
       "options": [
        "Кольцо: образ из начала возвращается с новым смыслом",
        "Длинный перечень предметов",
        "Диалог двух героев",
        "Отсутствие рифмы"
       ]
      },
      {
       "k": "choice",
       "q": "Какая строка — четырёхстопный ямб, как у Пушкина?",
       "options": [
        "Я помню тихий свет вокзала",
        "Ветер дует над дорогой",
        "Над рекою туман поднялся"
       ]
      },
      {
       "k": "choice",
       "q": "Что главное, если пишешь в пушкинской манере?",
       "options": [
        "Плавность, мало деталей, много чувства",
        "Много сложных терминов",
        "Грубые разговорные слова",
        "Строки разной длины без размера"
       ]
      }
     ]
    },
    {
     "id": "pc2",
     "t": "Пушкин «Я вас любил»",
     "plan": "из чего состоит «Я вас любил» и как писать сдержанное признание",
     "wiki": {"a": "Пушкин", "q": "Я вас любил: любовь ещё, быть может", "m": ["я вас любил"]},
     "theory": {
      "rule": "**Форма:** 8 строк, пятистопный ямб, перекрёстная рифма. Написан в 1829 году. Почти нет образов: стих держится на интонации и повторе.",
      "ex": [
       [
        "Главный приём",
        "анафора: «Я вас любил» звучит трижды, и каждый раз с новым оттенком"
       ],
       [
        "Образы",
        "их почти нет: ни природы, ни портрета, только прямая речь"
       ],
       [
        "Финал",
        "неожиданное великодушие: пожелание, чтобы её любили так же сильно, но уже другой"
       ],
       [
        "Сильное",
        "сдержанность: ни упрёка, ни жалобы"
       ],
       [
        "Слабое",
        "событий нет; читателю, который ждёт сюжета, мало"
       ],
       [
        "Чем цепляет",
        "признание в форме прощания; благородство, которое хочется повторить"
       ],
       [
        "Как писать так же",
        "1) одно чувство, без сюжета; 2) начни три строки одной фразой, меняя оттенок; 3) никаких метафор, сила в честности; 4) в последней строке поворот, которого не ждут; 5) уложись в 8 строк"
       ]
      ],
      "tip": "**Задание:** напиши 8 строк прощания с тем, что любил (человек, место, работа). Одна фраза повторяется трижды, в конце — великодушный поворот. Потом нажми «Разобрать с Claude»."
     },
     "ex": [
      {
       "k": "choice",
       "q": "Каким размером написан стих?",
       "options": [
        "Пятистопный ямб",
        "Четырёхстопный ямб",
        "Трёхстопный анапест",
        "Двустопный хорей"
       ]
      },
      {
       "k": "choice",
       "q": "Сколько раз повторяется «Я вас любил»?",
       "options": [
        "3",
        "2",
        "1",
        "5"
       ]
      },
      {
       "k": "choice",
       "q": "Что главное в стиле этого стиха?",
       "options": [
        "Прямое признание с повтором, без метафор",
        "Много ярких метафор",
        "Сложный сюжет",
        "Юмор"
       ]
      },
      {
       "k": "choice",
       "q": "Чем закончить стих в такой манере?",
       "options": [
        "Неожиданно великодушным пожеланием",
        "Упрёком",
        "Описанием погоды",
        "Вопросом к читателю о делах"
       ]
      },
      {
       "k": "choice",
       "q": "Чем стих цепляет?",
       "options": [
        "Признанием в любви в форме прощания",
        "Описанием природы",
        "Сложным сюжетом",
        "Рассказом о войне"
       ]
      }
     ]
    },
    {
     "id": "pc3",
     "t": "Лермонтов «Парус»",
     "plan": "из чего состоит «Парус» и как писать стих-символ",
     "wiki": {"a": "Лермонтов", "q": "Белеет парус одинокий", "m": ["белеет парус", "парус"]},
     "theory": {
      "rule": "**Форма:** 3 строфы по 4 строки, четырёхстопный ямб, перекрёстная рифма. Написан в 1832 году, Лермонтову было 17 лет. Парус — **символ**: предмет, через который говорят о человеке.",
      "ex": [
       [
        "Строфа",
        "в каждой две строки картины моря и две строки о душе паруса"
       ],
       [
        "Приём",
        "антитеза: покой вокруг и мятежная душа"
       ],
       [
        "Интонация",
        "вопросы и восклицания: что он ищет, что бросил"
       ],
       [
        "Финал",
        "парадокс: парус просит бури, будто в ней покой"
       ],
       [
        "Сильное",
        "образ, который каждый применяет к себе"
       ],
       [
        "Слабое",
        "символ читают по-разному, и его часто упрощают до «одиночества»"
       ],
       [
        "Чем цепляет",
        "одиночество и жажда настоящей жизни"
       ],
       [
        "Как писать так же",
        "1) выбери предмет-символ (поезд в ночи, огонь светофора) и пиши о нём как о человеке; 2) в строфе: 2 строки картины, 2 строки души; 3) столкни покой и бурю; 4) финал — парадокс; 5) 12 строк, ямб"
       ]
      ],
      "tip": "**Задание:** напиши 3 строфы про одинокий поезд в ночи как символ человека. Каждая строфа: 2 строки картины, 2 строки о «душе» поезда, финал — парадокс. Потом нажми «Разобрать с Claude»."
     },
     "ex": [
      {
       "k": "choice",
       "q": "Каким размером написан «Парус»?",
       "options": [
        "Четырёхстопный ямб",
        "Трёхстопный амфибрахий",
        "Пятистопный хорей",
        "Двустопный дактиль"
       ]
      },
      {
       "k": "choice",
       "q": "Как построена каждая строфа?",
       "options": [
        "Две строки картины, две строки о душе",
        "Одна длинная фраза",
        "Вопрос и ответ в каждой строке",
        "Перечень предметов"
       ]
      },
      {
       "k": "choice",
       "q": "Что такое символ в стихе?",
       "options": [
        "Предмет, через который говорят о человеке",
        "Рифма в конце строки",
        "Название стиха",
        "Повтор слова"
       ]
      },
      {
       "k": "choice",
       "q": "Какой финал в духе «Паруса»?",
       "options": [
        "Парадокс: герой ищет бури посреди покоя",
        "Счастливое возвращение домой",
        "Мораль для детей",
        "Шутка"
       ]
      },
      {
       "k": "choice",
       "q": "Сколько лет было Лермонтову, когда он написал стих?",
       "options": [
        "17",
        "Около 40",
        "Около 12",
        "Около 30"
       ]
      }
     ]
    },
    {
     "id": "pc4",
     "t": "Блок «Ночь, улица, фонарь, аптека»",
     "plan": "из чего состоит «Ночь, улица, фонарь, аптека» и как писать в манере Блока",
     "wiki": {"a": "Блок", "q": "Ночь, улица, фонарь, аптека", "m": ["ночь, улица, фонарь"]},
     "theory": {
      "rule": "**Форма:** 8 строк (две строфы), четырёхстопный ямб, перекрёстная рифма. Написан в 1912 году, цикл «Пляски смерти». Композиция кольцевая.",
      "ex": [
       [
        "Первая строка",
        "четыре существительных без глагола: время останавливается, как кадр"
       ],
       [
        "Кольцо",
        "в конце те же предметы, но в обратном порядке: круг замкнулся"
       ],
       [
        "Слова",
        "простые бытовые предметы, а за ними мысль о жизни без выхода"
       ],
       [
        "Тон",
        "холодный и спокойный, без жалоб, поэтому страшнее"
       ],
       [
        "Сильное",
        "8 строк — и целая картина мира"
       ],
       [
        "Слабое",
        "просвета нет: это скорее диагноз, чем утешение"
       ],
       [
        "Чем цепляет",
        "все видели такую ночную улицу"
       ],
       [
        "Как писать так же",
        "1) начни с перечня 3–4 предметов без глаголов; 2) во второй строфе верни их в другом порядке; 3) только простые слова, без «красивостей»; 4) говори о большом спокойно, без восклицаний"
       ]
      ],
      "tip": "**Задание:** напиши 8 строк о ночной станции или депо. Первая строка — перечень предметов без глаголов, в конце те же предметы в другом порядке. Потом нажми «Разобрать с Claude»."
     },
     "ex": [
      {
       "k": "choice",
       "q": "Каким размером написан стих?",
       "options": [
        "Четырёхстопный ямб",
        "Трёхстопный хорей",
        "Пятистопный амфибрахий",
        "Двустопный анапест"
       ]
      },
      {
       "k": "choice",
       "q": "Что такое кольцевая композиция?",
       "options": [
        "Конец возвращает начало в изменённом виде",
        "Стих записан по кругу",
        "Все строки рифмуются парно",
        "Только повторы слов"
       ]
      },
      {
       "k": "choice",
       "q": "С чего начать стих в манере Блока?",
       "options": [
        "С перечня предметов без глаголов",
        "С восклицания",
        "С обращения к другу",
        "С вопроса о погоде"
       ]
      },
      {
       "k": "choice",
       "q": "Какая строка ближе к Блоку?",
       "options": [
        "Перрон, туман, гудок, ограда",
        "Ура! Весна! Цветы и солнце!",
        "Я так тебя люблю, родная"
       ]
      },
      {
       "k": "choice",
       "q": "Какой тон нужен в манере Блока?",
       "options": [
        "Холодный и спокойный, без жалоб",
        "Весёлый",
        "Восторженный",
        "Деловой"
       ]
      }
     ]
    },
    {
     "id": "pc5",
     "t": "Есенин «Письмо матери»",
     "plan": "из чего состоит «Письмо матери» и как писать в стиле Есенина",
     "wiki": {"a": "Есенин", "q": "Письмо матери", "m": ["письмо матери", "ты жива еще"]},
     "theory": {
      "rule": "**Форма:** пятистопный хорей, строфы по 4 строки, перекрёстная рифма, женские и мужские окончания чередуются. Написан в 1924 году. Это письмо в стихах: сын говорит с матерью, как в жизни.",
      "ex": [
       [
        "Обращение",
        "на «ты», ласковые простые слова: так говорят с близким"
       ],
       [
        "Детали",
        "деревенский быт: изба, вечерний свет, сад весной; мир, где он вырос"
       ],
       [
        "Цвет",
        "синий, голубой, золотой: у Есенина цвет передаёт настроение"
       ],
       [
        "Исповедь",
        "он прямо признаёт свою слабость и слухи о себе, без оправданий"
       ],
       [
        "Звук",
        "песенный ритм: стих поют как песню"
       ],
       [
        "Сильное",
        "искренность и простота: читается как настоящее письмо"
       ],
       [
        "Слабое",
        "часть критиков считает его сентиментальным, «слишком песенным»"
       ],
       [
        "Чем цепляет",
        "каждый слышит в нём свой разговор с матерью"
       ],
       [
        "Как писать в стиле Есенина",
        "1) пятистопный хорей или ямб, перекрёстная рифма; 2) обращайся к близкому на «ты»; 3) бери детали деревни и природы: берёза, сад, поле, закат; 4) задай цвет настроению; 5) признавайся в слабости честно; 6) чувства через природу: молодость как облетевший сад; 7) простые слова и ритм, который можно спеть"
       ]
      ],
      "tip": "**Задание:** напиши 2–3 строфы письма близкому человеку пятистопным хореем: обращение на «ты», 2 детали родного дома, один цвет, одно честное признание. Потом нажми «Разобрать с Claude»."
     },
     "ex": [
      {
       "k": "choice",
       "q": "Каким размером написан стих?",
       "options": [
        "Пятистопный хорей",
        "Четырёхстопный ямб",
        "Трёхстопный дактиль",
        "Шестистопный ямб"
       ]
      },
      {
       "k": "choice",
       "q": "Какая строка — пятистопный хорей, как у Есенина?",
       "options": [
        "Синий вечер тихо лёг на крыши",
        "Я жду тебя на станции с утра",
        "За рекою горят огоньки"
       ]
      },
      {
       "k": "choice",
       "q": "Какие детали типичны для Есенина?",
       "options": [
        "Изба, берёза, сад, закат",
        "Небоскрёбы, метро, неон",
        "Формулы и цифры",
        "Морские сражения"
       ]
      },
      {
       "k": "choice",
       "q": "Как Есенин говорит о своей слабости?",
       "options": [
        "Честно признаёт, без оправданий",
        "Скрывает за шутками",
        "Обвиняет других",
        "Не упоминает"
       ]
      },
      {
       "k": "choice",
       "q": "Зачем у Есенина цвет?",
       "options": [
        "Передаёт настроение",
        "Для рифмы",
        "Чтобы удлинить строку",
        "Просто для красоты, без смысла"
       ]
      }
     ]
    },
    {
     "id": "poemlib-x1",
     "exam": true,
     "t": "Экзамен: размеры и стихи 1–5",
     "covers": [
      "pc0",
      "pc1",
      "pc2",
      "pc3",
      "pc4",
      "pc5"
     ],
     "pass": 0.8,
     "q": [
      {
       "k": "choice",
       "s": "pc0",
       "q": "Ударения через слог, начиная со второго слога. Это…",
       "options": [
        "Ямб",
        "Хорей",
        "Дактиль",
        "Анапест"
       ]
      },
      {
       "k": "choice",
       "s": "pc0",
       "q": "Какая стопа в слове «ве́тер»?",
       "options": [
        "Хорей",
        "Ямб",
        "Амфибрахий",
        "Дактиль"
       ]
      },
      {
       "k": "choice",
       "s": "pc1",
       "q": "Кто написал романс на «Я помню чудное мгновенье»?",
       "options": [
        "Глинка",
        "Чайковский",
        "Рахманинов",
        "Мусоргский"
       ]
      },
      {
       "k": "choice",
       "s": "pc1",
       "q": "Размер «Я помню чудное мгновенье»?",
       "options": [
        "Четырёхстопный ямб",
        "Трёхстопный анапест",
        "Пятистопный хорей",
        "Двустопный дактиль"
       ]
      },
      {
       "k": "choice",
       "s": "pc2",
       "q": "Какое настроение у «Я вас любил»?",
       "options": [
        "Сдержанное, благородное",
        "Весёлое",
        "Гневное",
        "Деловое"
       ]
      },
      {
       "k": "choice",
       "s": "pc2",
       "q": "Размер «Я вас любил»?",
       "options": [
        "Пятистопный ямб",
        "Четырёхстопный хорей",
        "Трёхстопный дактиль",
        "Двустопный ямб"
       ]
      },
      {
       "k": "choice",
       "s": "pc3",
       "q": "«Парус» написан…",
       "options": [
        "четырёхстопным ямбом",
        "трёхстопным амфибрахием",
        "двустопным хореем",
        "гекзаметром"
       ]
      },
      {
       "k": "choice",
       "s": "pc3",
       "q": "Чего просит парус в финале?",
       "options": [
        "Бури",
        "Покоя",
        "Берега",
        "Попутного ветра"
       ]
      },
      {
       "k": "choice",
       "s": "pc4",
       "q": "Композиция стиха Блока:",
       "options": [
        "Кольцевая",
        "Линейная",
        "Диалог",
        "Хронологическая"
       ]
      },
      {
       "k": "choice",
       "s": "pc4",
       "q": "Размер стиха Блока «Ночь, улица, фонарь, аптека»?",
       "options": [
        "Четырёхстопный ямб",
        "Пятистопный хорей",
        "Трёхстопный анапест",
        "Двустопный амфибрахий"
       ]
      },
      {
       "k": "choice",
       "s": "pc5",
       "q": "Размер «Письма матери»?",
       "options": [
        "Пятистопный хорей",
        "Четырёхстопный ямб",
        "Трёхстопный дактиль",
        "Двустопный анапест"
       ]
      },
      {
       "k": "choice",
       "s": "pc5",
       "q": "Кому адресовано «Письмо матери»?",
       "options": [
        "Матери",
        "Жене",
        "Другу",
        "Сыну"
       ]
      }
     ]
    },
    {
     "id": "pc6",
     "t": "Маяковский «Послушайте!»",
     "plan": "из чего состоит «Послушайте!» и как писать в манере Маяковского",
     "wiki": {"a": "Маяковский", "q": "Послушайте!", "m": ["послушайте"]},
     "theory": {
      "rule": "**Форма:** акцентный (тонический) стих: строку меряют числом ударений, а не слогов; строки разной длины, рифмы неточные. Написан в 1914 году. «Лесенку» Маяковский стал использовать позже.",
      "ex": [
       [
        "Обращение",
        "поэт говорит прямо с людьми, как оратор с площади"
       ],
       [
        "Кольцо",
        "стих начинается и заканчивается одним обращением, финал — вопрос"
       ],
       [
        "Большое через простое",
        "звёзды названы грубым бытовым словом, а в сюжете — сцена прямо на небе"
       ],
       [
        "Гипербола",
        "преувеличение: человек врывается к самому Богу"
       ],
       [
        "Рифма",
        "неточная, но звонкая, по созвучию"
       ],
       [
        "Сильное",
        "живая интонация и нежность без сентиментальности"
       ],
       [
        "Слабое",
        "без привычного размера его труднее запомнить"
       ],
       [
        "Чем цепляет",
        "простая мысль: звёзды кому-то нужны"
       ],
       [
        "Как писать так же",
        "1) обращайся к читателю прямо; 2) в строке 3–4 сильных ударения, слоги не считай; 3) рифмуй созвучием; 4) большое называй бытовыми словами; 5) преувеличивай; 6) заверши вопросом"
       ]
      ],
      "tip": "**Задание:** напиши 10–12 строк акцентным стихом с прямым обращением к людям о том, зачем ночью горят огни на станции. Финал — вопрос. Потом нажми «Разобрать с Claude»."
     },
     "ex": [
      {
       "k": "choice",
       "q": "Какой размер у стиха?",
       "options": [
        "Акцентный стих: счёт по ударениям",
        "Четырёхстопный ямб",
        "Трёхстопный амфибрахий",
        "Пятистопный хорей"
       ]
      },
      {
       "k": "choice",
       "q": "Как меряется строка у Маяковского?",
       "options": [
        "Числом ударений",
        "Числом слогов",
        "Числом букв",
        "Только рифмой"
       ]
      },
      {
       "k": "choice",
       "q": "Какая рифма типична для Маяковского?",
       "options": [
        "Неточная, но звонкая, по созвучию",
        "Только точная глагольная",
        "Рифмы нет вообще",
        "Только внутренняя"
       ]
      },
      {
       "k": "choice",
       "q": "Как начать стих в его манере?",
       "options": [
        "С прямого обращения к людям",
        "С описания пейзажа",
        "С даты",
        "С цитаты"
       ]
      },
      {
       "k": "choice",
       "q": "Что такое гипербола?",
       "options": [
        "Сильное преувеличение",
        "Повтор слова",
        "Тихая интонация",
        "Рифма внутри строки"
       ]
      }
     ]
    },
    {
     "id": "pc7",
     "t": "Шекспир, сонет 18",
     "plan": "из чего состоит сонет 18 и как написать английский сонет",
     "link": "https://en.wikisource.org/w/index.php?search=Shakespeare+Sonnet+18",
     "theory": {
      "rule": "**Форма:** английский сонет: 14 строк, пятистопный ямб, три четверостишия и двустишие, рифмовка ABAB CDCD EFEF GG. Опубликован в 1609 году. Русские переводы разные: сравни два-три.",
      "ex": [
       [
        "Строфа 1",
        "вопрос-сравнение: сравнить тебя с летним днём?"
       ],
       [
        "Строфа 2",
        "развитие: лето несовершенно и проходит"
       ],
       [
        "Строфа 3, строка 9",
        "поворот: а твоё лето не кончится"
       ],
       [
        "Двустишие",
        "вывод-афоризм: ты живёшь, пока живут эти строки"
       ],
       [
        "Приём",
        "олицетворение: Смерть не сможет похвастаться тобой"
       ],
       [
        "Сильное",
        "строгий план, каждая строфа — шаг мысли"
       ],
       [
        "Слабое",
        "адресат неизвестен, комплименты условны"
       ],
       [
        "Чем цепляет",
        "мысль, что стих сильнее времени"
       ],
       [
        "Как писать так же",
        "1) пятистопный ямб, 14 строк; 2) строфа 1 — тезис или вопрос; 3) строфа 2 — развитие; 4) строка 9 — поворот; 5) двустишие — короткий вывод, который хочется запомнить"
       ]
      ],
      "tip": "**Задание:** напиши английский сонет на тему «что останется после меня». Сначала план из 4 пунктов (тезис, развитие, поворот, вывод), потом строки. Потом нажми «Разобрать с Claude»."
     },
     "ex": [
      {
       "k": "choice",
       "q": "Сколько строк в английском сонете?",
       "options": [
        "14",
        "12",
        "8",
        "16"
       ]
      },
      {
       "k": "choice",
       "q": "Какая рифмовка?",
       "options": [
        "ABAB CDCD EFEF GG",
        "AABB CCDD EEFF GG",
        "ABBA ABBA CDC DCD",
        "Без рифмы"
       ]
      },
      {
       "k": "choice",
       "q": "Где происходит поворот мысли?",
       "options": [
        "В девятой строке",
        "В первой",
        "В последней",
        "Нигде"
       ]
      },
      {
       "k": "choice",
       "q": "Что должно быть в финальном двустишии?",
       "options": [
        "Короткий вывод-афоризм",
        "Новый сюжет",
        "Описание природы",
        "Вопрос без ответа"
       ]
      },
      {
       "k": "choice",
       "q": "Каким размером пишут английский сонет?",
       "options": [
        "Пятистопный ямб",
        "Четырёхстопный хорей",
        "Трёхстопный анапест",
        "Акцентный стих"
       ]
      }
     ]
    },
    {
     "id": "pc8",
     "t": "Киплинг «Если—»",
     "plan": "из чего состоит «Если—» и как писать стих-наставление",
     "link": "https://en.wikisource.org/w/index.php?search=Kipling+If",
     "theory": {
      "rule": "**Форма:** 4 строфы по 8 строк, пятистопный ямб, рифмовка ABAB CDCD. Написан в 1895 году, опубликован в 1910. Весь стих — одно длинное предложение-условие. Известные русские переводы: Лозинского («Заповедь») и Маршака.",
      "ex": [
       [
        "Анафора",
        "строки начинаются со «если», это держит ритм"
       ],
       [
        "Пары противоположностей",
        "успех и беда, доверие и сомнение, толпа и короли"
       ],
       [
        "Развязка",
        "главное сказано только в последней строке: ты станешь человеком, сын мой"
       ],
       [
        "Адресат",
        "отец говорит сыну, поэтому звучит лично"
       ],
       [
        "Сильное",
        "ритм и нарастание: читаешь и ждёшь развязки"
       ],
       [
        "Слабое",
        "назидательность: легко превращается в список правил"
       ],
       [
        "Чем цепляет",
        "каждый находит в нём свою слабость и цель"
       ],
       [
        "Как писать так же",
        "1) выбери, кому говоришь (сыну, себе, новичку); 2) начинай строки одним словом; 3) ставь условия парами противоположностей; 4) держи главное до последней строки"
       ]
      ],
      "tip": "**Задание:** напиши 8 строк наставления молодому помощнику машиниста: строки начинаются с «Если», условия парами противоположностей, главное — в последней строке. Потом нажми «Разобрать с Claude»."
     },
     "ex": [
      {
       "k": "choice",
       "q": "Каким размером написан стих?",
       "options": [
        "Пятистопный ямб",
        "Четырёхстопный хорей",
        "Двустопный дактиль",
        "Трёхстопный анапест"
       ]
      },
      {
       "k": "choice",
       "q": "Что такое анафора?",
       "options": [
        "Повтор слова в начале строк",
        "Повтор слова в конце строк",
        "Рифма внутри строки",
        "Смена размера"
       ]
      },
      {
       "k": "choice",
       "q": "Как строить условия в таком стихе?",
       "options": [
        "Парами противоположностей",
        "Случайным списком",
        "Одним словом",
        "Без глаголов"
       ]
      },
      {
       "k": "choice",
       "q": "Где раскрывается главное?",
       "options": [
        "В последней строке",
        "В первой строке",
        "В названии",
        "В середине"
       ]
      },
      {
       "k": "choice",
       "q": "Как называется перевод Лозинского?",
       "options": [
        "«Заповедь»",
        "«Если»",
        "«Наставление»",
        "«Сыну»"
       ]
      }
     ]
    },
    {
     "id": "pc9",
     "t": "Эдгар По «Ворон»",
     "plan": "из чего состоит «Ворон» и как писать балладу-заклинание",
     "link": "https://en.wikisource.org/w/index.php?search=Poe+The+Raven",
     "theory": {
      "rule": "**Форма:** 18 строф по 6 строк, восьмистопный хорей, внутренняя рифма в длинных строках, короткий рефрен в конце строфы; с середины стиха это слово **Nevermore**. Написан в 1845 году. В эссе «Философия творчества» (1846) По объяснил, что выбрал слово ради звука: долгое «о» и раскатистое «р».",
      "ex": [
       [
        "Сюжет",
        "нагнетание: стук ночью, ожидание, птица, вопросы всё страшнее, ответ всегда один"
       ],
       [
        "Рефрен",
        "одно слово, как удар колокола, превращает стих в заклинание"
       ],
       [
        "Внутренняя рифма",
        "рифма внутри строки, она ускоряет и качает ритм"
       ],
       [
        "Атмосфера",
        "ночь, одиночество, утрата любимой"
       ],
       [
        "Сильное",
        "музыка и нарастание"
       ],
       [
        "Слабое",
        "театральность: стих построен как задача, и это заметно"
       ],
       [
        "Чем цепляет",
        "мрачная тайна и одно слово-приговор"
       ],
       [
        "Как писать так же",
        "1) выбери звонкое слово-рефрен; 2) заканчивай им каждую строфу; 3) делай рифму внутри строки; 4) каждая строфа страшнее прошлой, ответ тот же; 5) повторяй одни звуки"
       ]
      ],
      "tip": "**Задание:** выбери слово-рефрен (например, «никогда» или «до утра») и напиши 2 строфы ночной сцены, в которых ответ всегда этот рефрен. Потом нажми «Разобрать с Claude»."
     },
     "ex": [
      {
       "k": "choice",
       "q": "Каким размером написан стих?",
       "options": [
        "Восьмистопный хорей",
        "Четырёхстопный ямб",
        "Пятистопный дактиль",
        "Двустопный анапест"
       ]
      },
      {
       "k": "choice",
       "q": "Почему По выбрал слово Nevermore?",
       "options": [
        "Ради звука: долгое «о» и раскатистое «р»",
        "Случайно",
        "Так звали птицу",
        "Его подсказал друг"
       ]
      },
      {
       "k": "choice",
       "q": "Как строится сюжет?",
       "options": [
        "Нагнетание: вопросы страшнее, ответ один",
        "Спокойный рассказ о дне",
        "Комедия ошибок",
        "Путешествие"
       ]
      },
      {
       "k": "choice",
       "q": "Что такое внутренняя рифма?",
       "options": [
        "Рифма внутри одной строки",
        "Рифма в первой и последней строфе",
        "Отсутствие рифмы",
        "Рифма в названии"
       ]
      },
      {
       "k": "choice",
       "q": "Сколько строф в «Вороне»?",
       "options": [
        "18",
        "8",
        "12",
        "24"
       ]
      }
     ]
    },
    {
     "id": "pc10",
     "t": "Фрост «Дорога, которую не выбрали»",
     "plan": "из чего состоит «Дорога, которую не выбрали» и как писать в манере Фроста",
     "link": "https://en.wikisource.org/w/index.php?search=Frost+The+Road+Not+Taken",
     "theory": {
      "rule": "**Форма:** 4 строфы по 5 строк, четырёхстопный ямб (свободный, с лишними безударными слогами), рифмовка ABAAB. Написан в 1916 году.",
      "ex": [
       [
        "Сцена",
        "бытовая: человек в осеннем лесу у развилки"
       ],
       [
        "Речь",
        "спокойная, разговорная, без высоких слов"
       ],
       [
        "Символ без пояснений",
        "поэт не говорит, что дорога — это жизнь, читатель догадывается сам"
       ],
       [
        "Финал",
        "взгляд из будущего: рассказчик будет вспоминать об этом со вздохом"
       ],
       [
        "Ирония",
        "дороги почти одинаковы, а выбор потом рассказывают как судьбу"
       ],
       [
        "Сильное",
        "простой образ, понятный каждому"
       ],
       [
        "Слабое",
        "из-за двусмысленности его часто понимают наоборот"
       ],
       [
        "Как писать так же",
        "1) возьми бытовую сцену (развилка путей, перрон); 2) говори спокойно, как в разговоре; 3) не объясняй символ; 4) финал — взгляд из будущего; 5) оставь читателю два прочтения"
       ]
      ],
      "tip": "**Задание:** напиши 2 строфы по 5 строк (ABAAB) о стрелке на путях, где поезд мог уйти на другой путь. Без пояснений, что это символ. Потом нажми «Разобрать с Claude»."
     },
     "ex": [
      {
       "k": "choice",
       "q": "Какая рифмовка?",
       "options": [
        "ABAAB",
        "ABAB",
        "AABB",
        "ABCABC"
       ]
      },
      {
       "k": "choice",
       "q": "Как заканчивается стих?",
       "options": [
        "Взглядом из будущего: рассказчик вспомнит со вздохом",
        "Возвращением домой",
        "Моралью",
        "Вопросом к Богу"
       ]
      },
      {
       "k": "choice",
       "q": "Как Фрост обращается с символом?",
       "options": [
        "Не объясняет его, читатель догадывается сам",
        "Объясняет в каждой строфе",
        "Называет в заголовке",
        "Не использует символов"
       ]
      },
      {
       "k": "choice",
       "q": "Какая речь в стиле Фроста?",
       "options": [
        "Спокойная, разговорная",
        "Высокая, торжественная",
        "Крик и восклицания",
        "Научная"
       ]
      },
      {
       "k": "choice",
       "q": "Сколько строк в строфе?",
       "options": [
        "5",
        "4",
        "6",
        "8"
       ]
      }
     ]
    },
    {
     "id": "poemlib-x2",
     "exam": true,
     "t": "Экзамен: стихи 6–10",
     "covers": [
      "pc6",
      "pc7",
      "pc8",
      "pc9",
      "pc10"
     ],
     "pass": 0.8,
     "q": [
      {
       "k": "choice",
       "s": "pc6",
       "q": "Размер «Послушайте!»?",
       "options": [
        "Акцентный стих",
        "Четырёхстопный ямб",
        "Трёхстопный хорей",
        "Гекзаметр"
       ]
      },
      {
       "k": "choice",
       "s": "pc6",
       "q": "Кто автор «Послушайте!»?",
       "options": [
        "Маяковский",
        "Блок",
        "Есенин",
        "Лермонтов"
       ]
      },
      {
       "k": "choice",
       "s": "pc7",
       "q": "Сколько строк в английском сонете?",
       "options": [
        "14",
        "8",
        "12",
        "16"
       ]
      },
      {
       "k": "choice",
       "s": "pc7",
       "q": "Что значит ABAB CDCD EFEF GG?",
       "options": [
        "Рифмовка трёх четверостиший и двустишия",
        "Количество строф",
        "Длина строки",
        "Имя автора"
       ]
      },
      {
       "k": "choice",
       "s": "pc8",
       "q": "Анафора у Киплинга: повтор какого слова?",
       "options": [
        "If («если»)",
        "Man («человек»)",
        "Time («время»)",
        "Son («сын»)"
       ]
      },
      {
       "k": "choice",
       "s": "pc8",
       "q": "Из скольких строф состоит «Если—»?",
       "options": [
        "4",
        "2",
        "6",
        "8"
       ]
      },
      {
       "k": "choice",
       "s": "pc9",
       "q": "Какой рефрен в «Вороне»?",
       "options": [
        "Nevermore",
        "Always",
        "Silence",
        "Forever"
       ]
      },
      {
       "k": "choice",
       "s": "pc9",
       "q": "Размер «Ворона»?",
       "options": [
        "Восьмистопный хорей",
        "Четырёхстопный ямб",
        "Двустопный дактиль",
        "Пятистопный анапест"
       ]
      },
      {
       "k": "choice",
       "s": "pc10",
       "q": "Размер «Дороги, которую не выбрали»?",
       "options": [
        "Четырёхстопный ямб",
        "Пятистопный хорей",
        "Трёхстопный анапест",
        "Двустопный дактиль"
       ]
      },
      {
       "k": "choice",
       "s": "pc10",
       "q": "Почему стих Фроста двусмысленный?",
       "options": [
        "Дороги почти одинаковы, а выбор красиво пересказывают",
        "Нет сюжета",
        "Нет рифмы",
        "Он слишком короткий"
       ]
      }
     ]
    }
   ]
  },
  { id: 'read', cat: 'read', name: 'Чтение', type: 'books',
    books: [{ id: 'b1', t: '«Атомные привычки», Дж. Клир' }, { id: 'b2', t: '«Глубокая работа», К. Ньюпорт' }] },
  { id: 'music', cat: 'music', name: 'Музыка', type: 'stages',
    stages: ['Идея', 'Аранжировка', 'Сведение', 'Мастеринг', 'Релиз'] },
  { id: 'book', cat: 'book', name: 'Книга по сведению', type: 'counter', title: '«Практическое руководство по сведению и мастерингу»', unit: 'разделов', target: 0 },
  {
  "id": "vitrina",
  "cat": "code",
  "name": "Своя витрина",
  "type": "path",
  "unit": "урок",
  "goal": "Собрать и опубликовать свой интернет-магазин: сначала витрина на HTML и CSS, потом каталог с корзиной на JavaScript, затем заказы и оплата. Программа — 59 уроков, пишутся блоками; готовые видны ниже. Модули 1–4 (HTML + CSS, JavaScript, Git и публикация, работа с ИИ) готовы целиком.",
  "prompt": "Я учусь HTML с нуля. Урок {n}: {t}. Цель: {plan}. Сначала попроси показать мой код и объяснить его. Давай одну подсказку за раз. Не пиши решение целиком. После исправления предложи похожее самостоятельное задание.",
  "resources": [
    {
      "href": "vitrina/index.html",
      "label": "Исходный макет и редактор кода"
    },
    {
      "href": "vitrina/review.html",
      "label": "Оценка курса и план улучшений"
    }
  ],
  "steps": [
    {
      "id": "vitrina-01",
      "t": "Как устроен сайт и первая витрина",
      "plan": "35–50 минут: открыть index.html, показать два своих товара, объяснить HTML, CSS и JavaScript; затем добавить третий товар без образца.",
      "theory": {
        "rule": "**HTML** описывает содержимое страницы: заголовки, текст, фото, ссылки и кнопки. **CSS** задаёт оформление: цвета, шрифты и расположение. **JavaScript** добавляет поведение: поиск, корзину и пересчёт суммы. Начинаем с HTML. Тег — пометка в угловых скобках; атрибут уточняет её свойства. Вложенные теги сдвигай на два пробела: так легче читать код. Полный интерактивный исходник с редактором доступен по ссылке на странице курса.",
        "ex": [
          [
            "<h1>Мой магазин</h1>",
            "У парного тега есть начало <h1>, содержимое и конец </h1>. h1 — главный заголовок страницы."
          ],
          [
            "<a href=\"#delivery\">Доставка и оплата</a>",
            "a создаёт ссылку, href — её адрес. #delivery ведёт к элементу с id=\"delivery\" на этой же странице. img, br и meta не имеют закрывающего тега."
          ],
          [
            "<!doctype html>\n<html lang=\"ru\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Мой магазин</title>\n</head>\n<body>\n  <h1>Мой магазин</h1>\n  <p>Товары с доставкой по Петербургу.</p>\n  <h2>Кружка</h2>\n  <p>Цена: 2 500 ₽</p>\n  <button>В корзину</button>\n  <h2>Ваза</h2>\n  <p>Цена: 3 000 ₽</p>\n  <button>В корзину</button>\n  <a href=\"#delivery\">Доставка и оплата</a>\n  <section id=\"delivery\">\n    <h2>Доставка</h2>\n    <p>Условия доставки уточняются при заказе.</p>\n  </section>\n</body>\n</html>",
            "Скопируй в папку vitrina в файл index.html. doctype включает стандартный режим; html lang=\"ru\" задаёт язык; head содержит служебные данные, title — заголовок вкладки, body — видимое содержимое. charset задаёт UTF-8, viewport помогает мобильной раскладке. index.html — обычное имя главной страницы на статическом хостинге; локально HTML-файл может называться иначе."
          ],
          [
            "1. Открой папку vitrina в редакторе кода.\n2. Создай index.html и вставь пример.\n3. Замени название магазина в title и h1.\n4. Подставь два своих товара и цены.\n5. Открой файл в браузере.\n6. Измени цену, сохрани файл и обнови страницу.",
            "Задание на Маке. Если открывается текст кода, проверь расширение .html и команду «Открыть с помощью» → браузер. Если правка не видна, проверь сохранение и путь к открытому файлу. Кнопка корзины пока ничего не делает — её оживит JavaScript."
          ],
          [
            "<h2>Третий товар</h2>\n<p>Цена: 1 200 ₽</p>\n<button>В корзину</button>",
            "Самостоятельно: закрой пример, добавь третий товар с другой ценой и открой результат. Затем объясни, чем отличаются title и h1 и что делает href. Если потребовалась подсказка, через день повтори это действие без неё."
          ],
          [
            "Я учусь HTML с нуля. Вот мой index.html:\n[вставь код]\nСначала попроси меня объяснить три выбранных тега. Затем укажи одну ошибку или задай один вопрос. Код не переписывай.",
            "Проверяй, что ИИ обсуждает теги из твоего файла. Не вставляй изменения, которые не можешь объяснить."
          ]
        ],
        "tip": "Критерий практики: файл открывается, русские буквы читаются, во вкладке и на странице верное название, видны минимум два товара с ценами и кнопками, ссылка ведёт к разделу доставки. Третий товар добавлен самостоятельно. Перед завершением сохрани файл и запиши в заметках, что сделал без подсказки и где затруднился. «Росток» проверяет ответы ниже; внешний файл и самостоятельность оцениваешь по этому списку сам."
      },
      "ex": [
        {
          "k": "choice",
          "q": "За что отвечает HTML?",
          "options": [
            "Что есть на странице: заголовок, текст, фото",
            "За цвета и шрифты",
            "За пересчёт корзины по клику",
            "За хранение заказов на сервере"
          ]
        },
        {
          "k": "choice",
          "q": "Какой тег делает ссылку?",
          "options": [
            "<a>",
            "<link>",
            "<href>",
            "<url>"
          ]
        },
        {
          "k": "choice",
          "q": "Как открыть локальный index.html на Маке?",
          "options": [
            "Открыть файл в браузере",
            "Сначала установить Node.js",
            "Обязательно купить хостинг",
            "Сначала отправить на GitHub"
          ]
        },
        {
          "k": "choice",
          "q": "Что видно на вкладке браузера, а что внутри самой страницы?",
          "options": [
            "title — на вкладке, h1 — на странице",
            "h1 — на вкладке, title — на странице",
            "Оба тега видны только на вкладке",
            "title задаёт цену товара"
          ]
        },
        {
          "k": "choice",
          "q": "Изменил цену в файле, но браузер показывает старую. Что проверить первым?",
          "options": [
            "Сохранён ли файл и обновлена ли нужная страница",
            "Купить домен",
            "Переписать страницу на JavaScript",
            "Поставить сервер базы данных"
          ]
        }
      ]
    },
    {
      "id": "vitrina-02",
      "t": "Заголовки, текст, ссылки",
      "plan": "35 минут: страница с названием магазина, описанием из двух абзацев и ссылками — на раздел, на телефон и на внешний сайт.",
      "theory": {
        "rule": "**Заголовки** h1–h6 задают иерархию: один h1 — название магазина, h2 — разделы (Товары, Доставка), h3 — подразделы. Уровень выбирают по смыслу, а не по размеру букв: размер потом задаст CSS. **Абзац** p — обычный текст; переносы строк внутри p браузер сворачивает в один пробел. **strong** выделяет важное, **em** — смысловое ударение. **Ссылка** a с атрибутом href ведёт на другой сайт (полный адрес с https://), к разделу этой же страницы (#id), на телефон (tel:) или почту (mailto:). target=\"_blank\" открывает ссылку в новой вкладке — так делают для чужих сайтов.",
        "ex": [
          [
            "<h1>Мой магазин</h1>\n<p>Кружки и вазы ручной работы с доставкой по Петербургу.</p>\n<h2>Товары</h2>\n<h3>Кружка «Утро»</h3>\n<p>Объём 350 мл.</p>\n<h2>Доставка</h2>",
            "Иерархия: h1 один на страницу, h2 — крупные разделы, h3 — внутри раздела. Уровни не пропускают (h1 → h3): программам чтения с экрана и поиску это мешает."
          ],
          [
            "<p>Доставка по Петербургу <strong>бесплатно</strong> от 3 000 ₽.<br>Самовывоз — <em>каждый день</em> с 10 до 20.</p>",
            "strong — важное (браузер показывает жирным), em — ударение (курсив). br переносит строку внутри абзаца; для нового смыслового куска лучше новый p."
          ],
          [
            "<a href=\"#delivery\">Условия доставки</a>\n<a href=\"tel:+79000000000\">Позвонить</a>\n<a href=\"mailto:shop@example.com\">Написать</a>\n<a href=\"https://www.avito.ru\" target=\"_blank\" rel=\"noopener\">Мы на Авито</a>",
            "href с # ведёт к элементу с таким id на этой же странице. tel: и mailto: на телефоне открывают звонок и почту. Внешняя ссылка — только полный адрес с https://. target=\"_blank\" открывает новую вкладку, rel=\"noopener\" к нему добавляют для безопасности."
          ],
          [
            "1. Открой vitrina/index.html.\n2. Под h1 добавь два абзаца: о чём магазин и для кого.\n3. Сделай h2 «Товары» и переведи названия товаров в h3.\n4. Над товарами поставь две ссылки: на #delivery и tel: с твоим номером.\n5. Внизу добавь ссылку на свой профиль на Авито в новой вкладке.\n6. Открой в браузере и нажми каждую ссылку.",
            "Задание на Маке. Ссылка на раздел не работает — проверь, что id=\"delivery\" стоит у section и совпадает с href побуквенно. Номер в tel: пиши без пробелов и скобок."
          ],
          [
            "Добавь раздел «О мастере»: h2, один абзац с одним выделением strong и ссылка «Написать» на почту.",
            "Самостоятельно, без образца. Потом ответь себе: почему здесь h2, а не h1? Чем strong отличается от просто жирного шрифта? Не можешь объяснить — перечитай правило."
          ],
          [
            "Вот мой index.html:\n[вставь код]\nПроверь только заголовки и ссылки: верная ли иерархия h1–h3 и все ли href ведут куда надо. Назови одну проблему, код не переписывай.",
            "Проверяй, что ИИ говорит о твоих тегах, а не об абстрактных. Исправляй сам."
          ]
        ],
        "tip": "Готово, когда: один h1, разделы h2, товары h3; два абзаца описания; ссылка #delivery прокручивает к разделу, tel: на телефоне открывает набор номера, внешняя ссылка открывается в новой вкладке. Запиши в заметки, что сделал без подсказки."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Сколько h1 должно быть на странице витрины?",
          "options": [
            "Один — название магазина",
            "По одному на каждый товар",
            "Сколько угодно, это просто крупный шрифт",
            "Ни одного, h1 устарел"
          ],
          "explanation": "h1 — главный заголовок, он один. Товары и разделы получают h2 и h3."
        },
        {
          "k": "choice",
          "q": "Нужен заголовок подраздела внутри раздела h2. Какой тег?",
          "options": [
            "<h3>",
            "<h2>",
            "<h1>",
            "<p>"
          ],
          "explanation": "Уровень на один ниже: внутри h2 идёт h3. Уровни не пропускают."
        },
        {
          "k": "input",
          "q": "Что написать в начале href, чтобы по ссылке на телефоне открылся набор номера? Напиши этот префикс",
          "a": [
            "tel"
          ],
          "explanation": "tel: в начале href, затем номер без пробелов и скобок: href=\"tel:+79001234567\"."
        },
        {
          "k": "choice",
          "q": "Ссылка <a href=\"#delivery\"> не прокручивает к разделу. Что проверить первым?",
          "options": [
            "Есть ли элемент с id=\"delivery\" и совпадает ли написание",
            "Установлен ли JavaScript",
            "Куплен ли домен",
            "Стоит ли target=\"_blank\""
          ],
          "explanation": "Якорь # ищет элемент с таким id. Нет id или опечатка — ссылка никуда не ведёт."
        },
        {
          "k": "choice",
          "q": "Чем strong отличается от em?",
          "options": [
            "strong — важное, em — смысловое ударение",
            "strong — курсив, em — жирный",
            "Ничем, оба просто красят текст",
            "strong работает только в заголовках"
          ],
          "explanation": "Оба — про смысл, а не про вид. Вид задаёт браузер по умолчанию, а потом CSS."
        }
      ]
    },
    {
      "id": "vitrina-03",
      "t": "Структура: шапка, основная часть, подвал",
      "plan": "35 минут: страница разбита на header, nav, main, section и footer; шапка с названием и меню, подвал с контактами.",
      "theory": {
        "rule": "Страницу делят на смысловые части: **header** — шапка (название, меню), **nav** — навигация (ссылки на разделы), **main** — основное содержимое, единственный на странице, **section** — раздел внутри main со своим заголовком, **footer** — подвал (контакты, год). Сами по себе эти теги вид не меняют — это каркас: по нему ориентируются поиск и программы чтения с экрана, а в уроке 7 к нему прикрепится CSS. Безымянный блок без смысла — **div**; им пользуйся, когда ни один смысловой тег не подходит.",
        "ex": [
          [
            "<body>\n  <header>\n    <h1>Мой магазин</h1>\n    <nav>\n      <a href=\"#catalog\">Товары</a>\n      <a href=\"#delivery\">Доставка</a>\n      <a href=\"#contacts\">Контакты</a>\n    </nav>\n  </header>\n  <main>\n    <section id=\"catalog\">\n      <h2>Товары</h2>\n    </section>\n    <section id=\"delivery\">\n      <h2>Доставка</h2>\n    </section>\n  </main>\n  <footer id=\"contacts\">\n    <p>Телефон: <a href=\"tel:+79000000000\">+7 900 000-00-00</a></p>\n    <p>© 2026 Мой магазин</p>\n  </footer>\n</body>",
            "header → main → footer идут по порядку, main один. Каждая section начинается с h2 и имеет id, на который ведёт ссылка из nav. Ссылки в nav пока просто в ряд — в уроке 5 превратим их в список."
          ],
          [
            "<main>\n  <section id=\"catalog\">\n    <h2>Товары</h2>\n    <h3>Кружка</h3>\n    <p>Цена: 2 500 ₽</p>\n    <button>В корзину</button>\n  </section>\n</main>",
            "Товары из прошлых уроков переезжают внутрь section с id=\"catalog\". Отступ два пробела на каждый уровень вложенности: сразу видно, что в чём лежит."
          ],
          [
            "1. Оберни h1 и ссылки в header, ссылки — в nav.\n2. Все разделы положи в main, каждый — в section с id.\n3. Контакты и год вынеси в footer.\n4. Проверь: у каждого открывающего тега есть закрывающий.\n5. Открой в браузере: вид почти не изменился — так и должно быть.\n6. Открой DevTools (⌥⌘I → Elements), раскрой дерево и найди свой main.",
            "Задание на Маке. Если что-то «уехало» — скорее всего, не закрыт тег. DevTools показывает, как браузер понял твою страницу: незакрытые теги там видно сразу."
          ],
          [
            "Добавь в main третью section «Отзывы» с h2 и одним абзацем, а в nav — ссылку на неё.",
            "Самостоятельно. Критерий: по клику в меню страница прокручивается к отзывам, в DevTools section лежит внутри main, а не после footer."
          ],
          [
            "Вот мой index.html:\n[вставь код]\nПроверь только структуру: верно ли вложены header, nav, main, section, footer, нет ли незакрытых тегов. Укажи одно место, где структура нарушена, и спроси, как я бы это исправил.",
            "Исправляй сам, ИИ только показывает место."
          ]
        ],
        "tip": "Готово, когда: страница идёт header → main → footer, main один, каждая section с h2 и id, меню в nav ведёт ко всем разделам, в DevTools дерево без неожиданной вложенности. Запиши, какой тег пришлось искать в правиле."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Сколько тегов main должно быть на странице?",
          "options": [
            "Один",
            "По одному на раздел",
            "Два: для телефона и компьютера",
            "Сколько угодно"
          ],
          "explanation": "main — основное содержимое, он один. Разделы внутри него — section."
        },
        {
          "k": "choice",
          "q": "Где место названию магазина и меню?",
          "options": [
            "В header",
            "В footer",
            "В main",
            "Вне body"
          ],
          "explanation": "Шапка header: название и nav с меню. Контакты и год — в footer."
        },
        {
          "k": "input",
          "q": "Напиши тег для раздела «Доставка» со своим заголовком внутри main",
          "a": [
            "section",
            "<section>"
          ],
          "explanation": "section — раздел со своим заголовком h2 и id. div — только когда смыслового тега нет."
        },
        {
          "k": "choice",
          "q": "Добавил header, main и footer, а страница выглядит так же. Почему?",
          "options": [
            "Это каркас по смыслу; внешний вид задаст CSS",
            "Теги не сработали — нужно обновить браузер",
            "Нужен JavaScript, чтобы они включились",
            "Их видно только на телефоне"
          ],
          "explanation": "Так и должно быть: структурные теги не меняют вид, они раскладывают содержимое по смыслу."
        },
        {
          "k": "choice",
          "q": "Когда уместен div?",
          "options": [
            "Когда ни один смысловой тег не подходит",
            "Всегда вместо section",
            "Только для заголовков",
            "Только внутри footer"
          ],
          "explanation": "div — безымянный блок. Сначала ищи смысловой тег: header, nav, main, section, article, footer."
        }
      ]
    },
    {
      "id": "vitrina-04",
      "t": "Фото товаров и пути к файлам",
      "plan": "40 минут: у каждого товара фото из папки img, у каждого фото подпись alt; файлы названы латиницей и открываются и на Маке, и после публикации.",
      "theory": {
        "rule": "Картинку вставляет **img** — одиночный тег без закрывающего. **src** — путь к файлу, **alt** — текст вместо фото: его читают с экрана, показывают, если файл не загрузился, и учитывает поиск. Путь считается **от папки, где лежит HTML-файл**: img/cup.jpg — файл cup.jpg в папке img рядом с index.html; ../photo.jpg — на уровень выше. Имена файлов — латиницей, строчными, без пробелов (cup-blue.jpg): после публикации в интернете заглавные буквы и пробелы ломают ссылки. **width** и **height** в пикселях резервируют место под фото, чтобы страница не прыгала при загрузке. Форматы: jpg — фото, png — картинки с прозрачностью, webp — легче обоих. Для витрины фото сжимай до 1200 px по длинной стороне.",
        "ex": [
          [
            "<img src=\"img/cup.jpg\" alt=\"Синяя керамическая кружка 350 мл\" width=\"600\" height=\"400\">",
            "src — путь от папки с index.html. alt описывает, что на фото, для того, кто его не видит; не пиши «фото» или «картинка». width и height — реальные пропорции файла."
          ],
          [
            "vitrina/\n  index.html\n  img/\n    cup.jpg\n    vase.jpg",
            "Такая папка. Из index.html к кружке путь img/cup.jpg. Если бы index.html лежал в подпапке pages/, путь был бы ../img/cup.jpg — две точки поднимают на уровень выше."
          ],
          [
            "<h3>Кружка</h3>\n<img src=\"img/cup.jpg\" alt=\"Синяя керамическая кружка\" width=\"600\" height=\"400\">\n<p>Цена: 2 500 ₽</p>",
            "Фото ставят между заголовком и ценой. Пока фото могут быть разного размера — ровные карточки сделаем в уроках 6 и 9."
          ],
          [
            "1. Создай папку img рядом с index.html.\n2. Возьми фото своих товаров, уменьши до 1200 px (Просмотр → Инструменты → Настроить размер).\n3. Переименуй латиницей: cup.jpg, vase.jpg.\n4. Вставь img каждому товару с alt, width и height.\n5. Открой в браузере: все фото видны.\n6. Специально испорти путь (imgg/cup.jpg), посмотри, что показал браузер, верни обратно.",
            "Задание на Маке. Размер фото в пикселях смотри в Finder: ⌘I. Сломанное фото показывает alt — так проверяют, что alt написан по делу."
          ],
          [
            "Добавь фото третьему товару без образца. Затем перенеси index.html в новую папку pages и почини пути к фото.",
            "Самостоятельно. Критерий: в обоих случаях все фото открываются. Не получилось второе — проверь ../ и верни файл на место."
          ],
          [
            "Вот строка с фото:\n[вставь img]\nи структура папок:\n[вставь список]\nСкажи, по какому пути браузер будет искать файл и почему он может не найтись. Не исправляй за меня.",
            "Так проверяют понимание путей, а не везение."
          ]
        ],
        "tip": "Готово, когда: у каждого товара фото из папки img с alt, width и height, имена файлов латиницей без пробелов, ни одной сломанной картинки, и ты можешь объяснить, что делает ../ в пути."
      },
      "ex": [
        {
          "k": "input",
          "q": "index.html и папка img лежат рядом. Напиши значение src для файла cup.jpg так, чтобы фото открылось и на Маке, и после публикации",
          "a": [
            "img/cup.jpg"
          ],
          "explanation": "Относительный путь от папки с HTML: img/cup.jpg. Полный путь с /Users/… работает только на твоём Маке, а cup.jpg без папки — файл рядом с index.html."
        },
        {
          "k": "choice",
          "q": "Что делает alt?",
          "options": [
            "Текст вместо фото: для чтения с экрана, поиска и если файл не загрузился",
            "Подпись под фото, видна всегда",
            "Название файла для браузера",
            "Ускоряет загрузку фото"
          ],
          "explanation": "alt — замена фото. Пиши, что изображено: «синяя керамическая кружка», а не «фото»."
        },
        {
          "k": "choice",
          "q": "Фото открывалось на Маке, а после публикации пропало. Самая частая причина?",
          "options": [
            "Имя файла с пробелом или заглавной буквой — сервер различает регистр",
            "В интернете jpg не поддерживается",
            "Нужно было поставить target=\"_blank\"",
            "img нужно закрыть тегом </img>"
          ],
          "explanation": "Mac часто не различает Cup.jpg и cup.jpg, сервер — различает. Называй файлы латиницей, строчными, без пробелов."
        },
        {
          "k": "choice",
          "q": "Что означает ../ в начале пути?",
          "options": [
            "Папка на уровень выше той, где лежит HTML-файл",
            "Корень сайта",
            "Та же папка, где HTML-файл",
            "Папка img"
          ],
          "explanation": "Две точки — «подняться на уровень вверх». Одна точка — текущая папка."
        },
        {
          "k": "choice",
          "q": "Зачем у img указывать width и height?",
          "options": [
            "Браузер заранее оставляет место, и страница не прыгает при загрузке",
            "Без них фото не покажется",
            "Так файл фото сжимается до нужного размера",
            "Это обязательные атрибуты HTML"
          ],
          "explanation": "Размеры в теге не меняют файл — они резервируют место. Сжимать фото нужно отдельно, до 1200 px."
        }
      ]
    },
    {
      "id": "vitrina-05",
      "t": "Списки и таблица характеристик",
      "plan": "35 минут: меню в nav стало списком, условия доставки — маркированный список, шаги заказа — нумерованный, характеристики товара — таблица.",
      "theory": {
        "rule": "**ul** — маркированный список (порядок не важен), **ol** — нумерованный (порядок важен), каждый пункт — **li**. Внутри ul и ol могут быть только li. Меню сайта принято делать списком ссылок внутри nav — так программы чтения с экрана сообщают: «список, 3 пункта». **table** — для данных в строках и столбцах, не для раскладки страницы. Строка — **tr**, заголовочная ячейка — **th**, обычная — **td**; **thead** и **tbody** отделяют шапку таблицы от данных, **caption** — её название. В каждой строке одинаковое число ячеек.",
        "ex": [
          [
            "<nav>\n  <ul>\n    <li><a href=\"#catalog\">Товары</a></li>\n    <li><a href=\"#delivery\">Доставка</a></li>\n    <li><a href=\"#contacts\">Контакты</a></li>\n  </ul>\n</nav>",
            "Меню как список ссылок: каждая ссылка в своём li. Маркеры и расположение в строку уберём CSS в уроке 10."
          ],
          [
            "<h2>Доставка</h2>\n<ul>\n  <li>По Петербургу — курьером, 300 ₽</li>\n  <li>Самовывоз — бесплатно</li>\n  <li>По России — Почтой или СДЭК</li>\n</ul>\n<h3>Как заказать</h3>\n<ol>\n  <li>Выбери товар</li>\n  <li>Напиши или позвони</li>\n  <li>Оплати и получи</li>\n</ol>",
            "Способы доставки — ul: порядок не важен. Шаги заказа — ol: порядок важен, браузер сам ставит номера."
          ],
          [
            "<table>\n  <caption>Характеристики кружки</caption>\n  <thead>\n    <tr><th>Параметр</th><th>Значение</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Объём</td><td>350 мл</td></tr>\n    <tr><td>Материал</td><td>керамика</td></tr>\n    <tr><td>Вес</td><td>320 г</td></tr>\n  </tbody>\n</table>",
            "В каждой tr по две ячейки. th — заголовки столбцов. Рамки и отступы появятся в CSS."
          ],
          [
            "1. Преврати ссылки в nav в ul со ссылками в li.\n2. В разделе Доставка сделай ul условий и ol шагов заказа.\n3. Под одним товаром добавь таблицу из трёх характеристик с caption, thead и tbody.\n4. Открой в браузере, проверь номера в ol и строки таблицы.\n5. В DevTools убедись, что каждый li лежит внутри ul или ol.",
            "Задание на Маке. Если у таблицы «поехала» строка — в ней не хватает td или не закрыт tr."
          ],
          [
            "Добавь таблицу характеристик второму товару без образца и список «Что входит в комплект».",
            "Самостоятельно. Проверь себя: что бы ты выбрал для списка ингредиентов рецепта — ul или ol? А для шагов рецепта?"
          ],
          [
            "Вот моя таблица:\n[вставь table]\nПроверь только таблицу: одинаково ли число ячеек в строках, на месте ли th и закрывающие теги. Не переписывай, укажи строку с ошибкой.",
            "Ищи ошибку по номеру строки сам."
          ]
        ],
        "tip": "Готово, когда: меню — ul внутри nav, доставка — ul, шаги заказа — ol с номерами, у одного товара таблица с caption, thead и tbody, в DevTools нет li вне списка и нет строк с разным числом ячеек."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Шаги оформления заказа. Какой список?",
          "options": [
            "<ol> — порядок важен",
            "<ul> — порядок не важен",
            "<table>",
            "<nav>"
          ],
          "explanation": "Шаги идут по порядку — ol, браузер пронумерует сам."
        },
        {
          "k": "choice",
          "q": "Что может лежать прямо внутри ul?",
          "options": [
            "Только li",
            "Любой текст",
            "p и h2",
            "Только ссылки a"
          ],
          "explanation": "Прямые дети ul и ol — только li. Ссылки, текст и прочее кладут внутрь li."
        },
        {
          "k": "order",
          "q": "Расставь теги от внешнего к внутреннему: обычная ячейка таблицы",
          "words": [
            "table",
            "tr",
            "td"
          ],
          "a": "table tr td",
          "explanation": "table → tr (строка) → td (ячейка). Заголовочная ячейка — th, тоже внутри tr."
        },
        {
          "k": "choice",
          "q": "Для чего таблица НЕ подходит?",
          "options": [
            "Для раскладки страницы: шапка слева, товары справа",
            "Для характеристик товара",
            "Для прайс-листа",
            "Для расписания самовывоза"
          ],
          "explanation": "table — только для данных в строках и столбцах. Раскладку страницы делают CSS (уроки 10–11)."
        },
        {
          "k": "choice",
          "q": "В одной строке таблицы на ячейку меньше, чем в других. Что увидишь в браузере?",
          "options": [
            "Строка окажется короче, столбцы «поедут»",
            "Браузер сам добавит пустую ячейку, и всё будет ровно",
            "Таблица не покажется совсем",
            "Страница выдаст ошибку"
          ],
          "explanation": "HTML не выдаёт ошибок — он показывает как есть. Поэтому проверяй число ячеек глазами и в DevTools."
        }
      ]
    },
    {
      "id": "vitrina-06",
      "t": "Карточка товара",
      "plan": "40 минут: каждый товар — одинаковая карточка article: фото, название, описание, цена, кнопка; карточки лежат в section#catalog, у каждой класс card для будущего CSS.",
      "theory": {
        "rule": "Карточка — повторяющийся блок с одинаковой структурой: фото, название, короткое описание, цена, кнопка. Самостоятельный законченный кусок содержимого оборачивают в **article**; внутри — img, h3, p и button. **class** — имя, по которому CSS потом найдёт все карточки сразу: class=\"card\" у каждой карточки, class=\"price\" у цены. Класс может повторяться на странице, **id** — нет: id у section один, class у карточек у всех одинаковый. Одинаковая структура важна: в уроке 11 карточки встанут в сетку, а в модуле 2 их начнёт рисовать JavaScript из списка товаров — он рассчитывает на один и тот же порядок тегов.",
        "ex": [
          [
            "<article class=\"card\">\n  <img src=\"img/cup.jpg\" alt=\"Синяя керамическая кружка\" width=\"600\" height=\"400\">\n  <h3>Кружка «Утро»</h3>\n  <p>Керамика, 350 мл.</p>\n  <p class=\"price\">2 500 ₽</p>\n  <button type=\"button\">В корзину</button>\n</article>",
            "Одна карточка. type=\"button\" говорит, что кнопка ничего не отправляет — просто кнопка, её оживит JavaScript в модуле 2. Пока нажатие ничего не делает, так и задумано."
          ],
          [
            "<section id=\"catalog\">\n  <h2>Товары</h2>\n  <article class=\"card\">…</article>\n  <article class=\"card\">…</article>\n  <article class=\"card\">…</article>\n</section>",
            "Все карточки — внутри section с id=\"catalog\", одна за другой, с одинаковым набором тегов в одном порядке. Многоточие — вместо содержимого из примера выше."
          ],
          [
            "<article class=\"card\">\n  <h3>Ваза\n  <p class=\"price\">3 000 ₽</p>\n</article>",
            "Найди ошибку: h3 не закрыт, и браузер считает цену частью заголовка. В DevTools это видно сразу: p оказывается внутри h3."
          ],
          [
            "1. Преврати каждый товар в article class=\"card\" по образцу.\n2. Проверь порядок: img, h3, p, p.price, button — во всех одинаково.\n3. Положи карточки внутрь section#catalog.\n4. Открой в браузере и DevTools: три article подряд внутри section.\n5. Удали закрывающий тег у одного h3, посмотри в DevTools, что сломалось, верни.",
            "Задание на Маке. Сравни карточки глазами: если в одной нет описания, добавь — структура должна совпадать."
          ],
          [
            "Добавь четвёртый товар карточкой без образца: своё фото, название, описание, цена, кнопка.",
            "Самостоятельно. Критерий: в DevTools четыре article с одинаковой вложенностью. Это итог блока HTML, дальше — CSS."
          ],
          [
            "Вот мои карточки:\n[вставь section#catalog]\nСравни их структуру между собой и назови одно расхождение: порядок тегов, пропущенный класс, незакрытый тег. Не переписывай.",
            "Расхождение исправляй сам во всех карточках."
          ]
        ],
        "tip": "Готово, когда: три-четыре карточки article с классом card и одинаковым порядком тегов внутри section#catalog, у цены класс price, у кнопок type=\"button\", DevTools показывает ровную вложенность. Блок HTML завершён — сдай экзамен ниже."
      },
      "ex": [
        {
          "k": "input",
          "q": "Напиши тег для самостоятельной карточки товара",
          "a": [
            "article",
            "<article>"
          ],
          "explanation": "article — законченный самостоятельный кусок: карточка, новость, отзыв. section — раздел, в котором карточки лежат."
        },
        {
          "k": "choice",
          "q": "Чем class отличается от id?",
          "options": [
            "class может повторяться у многих элементов, id — один на страницу",
            "id можно повторять, class — нет",
            "class только для кнопок, id — для разделов",
            "Ничем, это синонимы"
          ],
          "explanation": "id — уникальное имя одного элемента (для ссылок #id). class — общее имя группы (для CSS и JavaScript)."
        },
        {
          "k": "choice",
          "q": "Зачем всем карточкам одинаковый порядок тегов?",
          "options": [
            "CSS и JavaScript будут работать со всеми карточками одинаково",
            "Иначе браузер покажет ошибку",
            "Чтобы фото загружались быстрее",
            "Это требование GitHub Pages"
          ],
          "explanation": "Одинаковая структура — чтобы одно правило CSS и один скрипт подошли ко всем карточкам."
        },
        {
          "k": "choice",
          "q": "В DevTools цена оказалась внутри h3. Что случилось?",
          "options": [
            "Не закрыт тег h3 перед ценой",
            "У цены нет класса price",
            "Кнопка стоит не на месте",
            "Фото слишком большое"
          ],
          "explanation": "Незакрытый заголовок «проглатывает» всё, что идёт после него. Закрой h3."
        },
        {
          "k": "choice",
          "q": "Что даёт type=\"button\" у кнопки?",
          "options": [
            "Кнопка ничего не отправляет — просто кнопка, которую оживит JavaScript",
            "Кнопка становится ссылкой",
            "Кнопка получает цвет",
            "Без него кнопка не покажется"
          ],
          "explanation": "Кнопка без type внутри формы отправляет её. type=\"button\" — нейтральная кнопка для скрипта."
        }
      ]
    },
    {
      "id": "vitrina-x1",
      "exam": true,
      "t": "Экзамен: витрина на HTML",
      "covers": [
        "vitrina-01",
        "vitrina-02",
        "vitrina-03",
        "vitrina-04",
        "vitrina-05",
        "vitrina-06"
      ],
      "pass": 0.8,
      "q": [
        {
          "k": "choice",
          "s": "vitrina-01",
          "q": "За что отвечает CSS?",
          "options": [
            "Оформление: цвета, шрифты, расположение",
            "Содержимое: заголовки, текст, фото",
            "Поведение: корзина, поиск",
            "Хранение заказов на сервере"
          ]
        },
        {
          "k": "input",
          "s": "vitrina-01",
          "q": "Напиши тег главного заголовка страницы",
          "a": [
            "h1",
            "<h1>"
          ]
        },
        {
          "k": "input",
          "s": "vitrina-02",
          "q": "Что пишут в начале href, чтобы по ссылке открылся набор номера? Напиши этот префикс",
          "a": [
            "tel"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-02",
          "q": "Ссылка на чужой сайт. Какой href правильный?",
          "options": [
            "https://www.avito.ru",
            "www.avito.ru",
            "#avito",
            "avito"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-03",
          "q": "Что из этого должно быть на странице ровно один раз?",
          "options": [
            "main",
            "section",
            "article",
            "li"
          ]
        },
        {
          "k": "order",
          "s": "vitrina-03",
          "q": "Расставь теги от внешнего к внутреннему: ссылка в меню шапки",
          "words": [
            "header",
            "nav",
            "a"
          ],
          "a": "header nav a"
        },
        {
          "k": "input",
          "s": "vitrina-03",
          "q": "Тег подвала страницы (контакты, год)",
          "a": [
            "footer",
            "<footer>"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-04",
          "q": "index.html лежит в папке pages, а папка img — рядом с pages. Путь к cup.jpg?",
          "options": [
            "../img/cup.jpg",
            "img/cup.jpg",
            "/img/cup.jpg",
            "pages/img/cup.jpg"
          ]
        },
        {
          "k": "input",
          "s": "vitrina-04",
          "q": "Атрибут img с текстом вместо фото",
          "a": [
            "alt"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-05",
          "q": "Что лежит внутри tr?",
          "options": [
            "Ячейки td или th",
            "Строки tr",
            "Пункты li",
            "Заголовок h2"
          ]
        },
        {
          "k": "order",
          "s": "vitrina-05",
          "q": "Расставь теги от внешнего к внутреннему: пункт меню со ссылкой",
          "words": [
            "nav",
            "ul",
            "li",
            "a"
          ],
          "a": "nav ul li a"
        },
        {
          "k": "choice",
          "s": "vitrina-06",
          "q": "Что можно повторять у нескольких элементов?",
          "options": [
            "class",
            "id",
            "title страницы",
            "main"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-06",
          "q": "Карточки товаров. Какой порядок тегов подходит?",
          "options": [
            "img, h3, p, p.price, button — одинаковый во всех карточках",
            "В каждой карточке свой порядок, как удобнее",
            "Сначала button, остальное неважно",
            "Без фото, только h3"
          ]
        }
      ]
    },
    {
      "id": "vitrina-07",
      "t": "Что такое CSS и как его подключить",
      "plan": "30 минут: файл styles.css подключён к index.html, первое правило меняет цвет заголовка; понимаешь селектор, свойство и значение.",
      "theory": {
        "rule": "**CSS** — правила внешнего вида. Правило состоит из **селектора** (к чему применить), **свойства** и **значения**: h1 { color: green; } — все h1 зелёные. Селектор по тегу (h1), по классу (.card — с точкой), по id (#catalog — с решёткой). Подключение: отдельный файл styles.css и одна строка в head — link rel=\"stylesheet\" href=\"styles.css\". Так стили одни на все страницы. Путь в href — как у картинок, от папки с index.html. Стиль не применился — проверь путь, точку перед классом, точку с запятой после значения и фигурные скобки. Комментарий в CSS: /* текст */.",
        "ex": [
          [
            "<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Мой магазин</title>\n  <link rel=\"stylesheet\" href=\"styles.css\">\n</head>",
            "строка link в head подключает файл стилей; href — путь от index.html"
          ],
          [
            "/* styles.css */\nh1 {\n  color: green;\n}\n\n.price {\n  color: darkred;\n}\n\n#catalog {\n  background: whitesmoke;\n}",
            "три правила: по тегу, по классу (точка), по id (решётка). Каждое свойство заканчивается точкой с запятой"
          ],
          [
            "1. Создай styles.css рядом с index.html.\n2. Добавь link в head.\n3. Напиши правило для h1 — поменяй цвет.\n4. Обнови страницу: заголовок изменился — CSS подключён.\n5. Добавь правила для .price и для #catalog.\n6. В DevTools (⌥⌘I → Elements) нажми на h1 и посмотри справа, какие правила к нему применены.",
            "Задание на Маке. Ничего не изменилось — DevTools → Console или Network покажет, нашёлся ли styles.css. Чаще всего ошибка в href или в имени файла."
          ],
          [
            "Сделай без образца: все h3 синими, все кнопки с жёлтым фоном (background), текст в footer серым.",
            "Самостоятельно. Критерий: три новых правила в styles.css, страница их показывает, в DevTools у h3 видно твоё правило."
          ],
          [
            "Вот мой styles.css:\n[вставь]\nи head из index.html:\n[вставь]\nПроверь только подключение и синтаксис: путь в link, точки у классов, точки с запятой, скобки. Назови одну ошибку, не переписывай.",
            "Синтаксис CSS прощает мало: пропущенная скобка отключает все правила ниже."
          ]
        ],
        "tip": "Готово, когда: styles.css подключён одной строкой в head, в нём не меньше пяти правил трёх видов (тег, класс, id), все работают, а DevTools показывает твои правила у элементов."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Как подключить файл стилей?",
          "options": [
            "<link rel=\"stylesheet\" href=\"styles.css\"> в head",
            "<style src=\"styles.css\"> в body",
            "<css href=\"styles.css\">",
            "<script src=\"styles.css\">"
          ],
          "explanation": "link с rel=\"stylesheet\" в head."
        },
        {
          "k": "choice",
          "q": "Что такое селектор в правиле h1 { color: green; }?",
          "options": [
            "h1 — к чему применить правило",
            "color — что менять",
            "green — значение",
            "фигурные скобки"
          ],
          "explanation": "Селектор выбирает элементы, свойство и значение говорят, что с ними сделать."
        },
        {
          "k": "input",
          "q": "Напиши селектор для всех элементов с class=\"card\"",
          "a": [
            ".card"
          ],
          "explanation": "Класс — с точкой."
        },
        {
          "k": "choice",
          "q": "Селектор по id",
          "options": [
            "#catalog",
            ".catalog",
            "catalog",
            "@catalog"
          ],
          "explanation": "id — с решёткой."
        },
        {
          "k": "choice",
          "q": "Стили не применились. Что проверить первым?",
          "options": [
            "Путь в href и точку перед именем класса",
            "Купить домен",
            "Переставить link в конец body",
            "Написать стили в JavaScript"
          ],
          "explanation": "Сначала самые частые ошибки: путь и синтаксис."
        }
      ]
    },
    {
      "id": "vitrina-08",
      "t": "Цвета, шрифты, отступы",
      "plan": "40 минут: у витрины свои цвета и шрифт; заданы фон, цвет текста, размер шрифта и отступы вокруг карточек.",
      "theory": {
        "rule": "**Цвет:** color — текст, background — фон. Значения: имя (green), hex (#2e7d32), rgb(46, 125, 50). **Шрифт:** font-family: Arial, sans-serif — список через запятую: нет первого, возьмётся следующий; font-size: 18px; font-weight: bold; line-height: 1.5 — расстояние между строками. **Отступы:** margin — снаружи элемента, padding — внутри, между рамкой и содержимым. Запись: padding: 16px — все стороны; padding: 8px 16px — сверху-снизу, слева-справа. Единицы: px — пиксели, % — от родителя, rem — от базового шрифта страницы (1rem = 16px по умолчанию). Общие настройки задают на body: шрифт, цвет, фон наследуются всеми элементами.",
        "ex": [
          [
            "body {\n  font-family: Arial, sans-serif;\n  font-size: 18px;\n  line-height: 1.5;\n  color: #222;\n  background: #f6f6f6;\n  margin: 0;\n}",
            "настройки на body наследует вся страница; margin: 0 убирает отступ браузера по краям"
          ],
          [
            "h1 {\n  color: #2e7d32;\n  font-size: 2rem;\n}\n\n.price {\n  font-weight: bold;\n  color: darkred;\n}",
            "#2e7d32 — зелёный в hex; 2rem — в два раза крупнее базового шрифта"
          ],
          [
            ".card {\n  background: white;\n  padding: 16px;\n  margin: 12px 0;\n}",
            "padding — воздух внутри карточки, margin — расстояние между карточками"
          ],
          [
            "1. Задай на body шрифт, размер, цвет текста и фон.\n2. Раскрась h1 и .price.\n3. Дай карточкам .card белый фон, padding 16px и margin 12px сверху и снизу.\n4. Обнови страницу и сравни: было — стало.\n5. В DevTools измени цвет прямо в панели Styles и посмотри, как меняется страница (файл при этом не меняется).",
            "Задание на Маке. Цвет можно подобрать в DevTools: щёлкни по квадратику рядом со значением — откроется палитра."
          ],
          [
            "Без образца: сделай у кнопок зелёный фон, белый текст, padding 10px 20px и убери рамку (border: none).",
            "Самостоятельно. Критерий: кнопки выглядят как кнопки магазина, текст читается, между кнопкой и краем карточки есть воздух."
          ],
          [
            "Вот мой styles.css:\n[вставь]\nСкажи, где я перепутал margin и padding, и объясни на моём примере разницу. Не переписывай файл.",
            "Разница margin и padding — главное в этом уроке; проверь, что понял её на своём коде."
          ]
        ],
        "tip": "Готово, когда: шрифт и цвета заданы на body, заголовок и цена выделены, карточки белые с отступами, кнопки оформлены, и ты можешь объяснить разницу между margin и padding."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Отступ внутри элемента, между рамкой и содержимым",
          "options": [
            "padding",
            "margin",
            "border",
            "gap"
          ],
          "explanation": "padding — внутри, margin — снаружи."
        },
        {
          "k": "choice",
          "q": "Что задаёт font-family: Arial, sans-serif;?",
          "options": [
            "Шрифт Arial, а если его нет — любой без засечек",
            "Два шрифта одновременно",
            "Размер шрифта",
            "Жирность"
          ],
          "explanation": "Список запасных шрифтов через запятую."
        },
        {
          "k": "input",
          "q": "Напиши свойство, которое задаёт цвет фона",
          "a": [
            "background",
            "background-color"
          ],
          "explanation": "background или background-color."
        },
        {
          "k": "choice",
          "q": "padding: 8px 16px; — это",
          "options": [
            "8px сверху и снизу, 16px слева и справа",
            "8px слева, 16px справа",
            "8px везде, 16px для текста",
            "ошибка, нужно одно значение"
          ],
          "explanation": "Два значения: вертикаль, горизонталь."
        },
        {
          "k": "choice",
          "q": "Зачем задавать шрифт и цвет на body?",
          "options": [
            "Они наследуются всеми элементами страницы",
            "Иначе CSS не работает",
            "body — единственный тег, где разрешён цвет",
            "Чтобы отключить стили браузера"
          ],
          "explanation": "Наследование: задал один раз — работает везде."
        }
      ]
    },
    {
      "id": "vitrina-09",
      "t": "Блоки: размеры, рамки, box-model",
      "plan": "40 минут: понимаешь, из чего складывается ширина блока, задаёшь рамки и скругления; карточки одной ширины, фото не вылезает.",
      "theory": {
        "rule": "Каждый элемент — прямоугольник: **содержимое + padding + border + margin**. По умолчанию width задаёт только содержимое: блок с width: 300px и padding: 20px занимает 340px плюс рамка. Чтобы width включал padding и рамку, поставь первым правилом * { box-sizing: border-box; } — так делают почти всегда. **Рамка:** border: 1px solid #ddd — толщина, стиль, цвет; **скругление:** border-radius: 12px. **Размеры:** width, max-width (не шире); height обычно не задают — пусть растёт от содержимого. **Картинка в карточке:** img { max-width: 100%; height: auto; } — не вылезает и не искажается; с фиксированной высотой добавь object-fit: cover — обрежет ровно. **Блочные и строчные:** div, p, h1, section — блочные (с новой строки, во всю ширину); a, span, img, button — строчные (в строке). display: block делает строчный блочным, display: none — прячет.",
        "ex": [
          [
            "* {\n  box-sizing: border-box;\n}\n\n.card {\n  width: 300px;\n  padding: 20px;\n  border: 1px solid #ddd;\n  border-radius: 12px;\n}",
            "с border-box карточка займёт ровно 300px вместе с padding и рамкой"
          ],
          [
            ".card img {\n  max-width: 100%;\n  height: auto;\n  border-radius: 8px;\n}",
            "фото не шире карточки, пропорции сохранены"
          ],
          [
            ".card img {\n  width: 100%;\n  height: 200px;\n  object-fit: cover;\n}",
            "все фото одной высоты, лишнее обрезается — карточки ровные"
          ],
          [
            "1. Добавь * { box-sizing: border-box; } в начало styles.css.\n2. Дай .card рамку, скругление и width: 300px.\n3. Сделай фото в карточках одной высоты через object-fit: cover.\n4. В DevTools наведи на карточку: цветная схема покажет content, padding, border, margin.\n5. Убери box-sizing, посмотри, как изменилась ширина, верни обратно.",
            "Задание на Маке. Схема во вкладке Computed — лучший способ увидеть box-model своими глазами."
          ],
          [
            "Без образца: сделай кнопке .card button width: 100%, рамку 2px и скругление 8px; при наведении (button:hover) меняй фон.",
            "Самостоятельно. Критерий: кнопка во всю ширину карточки и не вылезает за край (значит, border-box работает), при наведении мыши меняется."
          ],
          [
            "Вот мои правила для .card:\n[вставь]\nПосчитай, сколько пикселей займёт карточка по ширине с box-sizing: border-box и без него. Объясни на цифрах, не переписывай.",
            "Если ответ ИИ расходится с DevTools — верь DevTools и разбирайся, почему."
          ]
        ],
        "tip": "Готово, когда: box-sizing: border-box стоит первым правилом, карточки с рамкой и скруглением одной ширины, фото одной высоты, кнопка во всю ширину и реагирует на наведение."
      },
      "ex": [
        {
          "k": "choice",
          "q": "width: 300px; padding: 20px; без box-sizing. Какая ширина блока?",
          "options": [
            "340px — padding добавляется к содержимому",
            "300px",
            "320px",
            "280px"
          ],
          "explanation": "20px слева + 300 + 20px справа."
        },
        {
          "k": "choice",
          "q": "Что делает * { box-sizing: border-box; }?",
          "options": [
            "width включает padding и рамку",
            "Убирает все рамки",
            "Делает все блоки квадратными",
            "Выключает margin"
          ],
          "explanation": "Ширина считается по внешней границе рамки."
        },
        {
          "k": "input",
          "q": "Напиши свойство для скругления углов",
          "a": [
            "border-radius"
          ]
        },
        {
          "k": "choice",
          "q": "Фото вылезает за карточку. Что добавить картинке?",
          "options": [
            "max-width: 100%",
            "margin: 0",
            "float: left",
            "font-size: 0"
          ],
          "explanation": "Не шире родителя."
        },
        {
          "k": "choice",
          "q": "Какой тег строчный (стоит в строке, а не с новой)?",
          "options": [
            "a",
            "div",
            "p",
            "section"
          ],
          "explanation": "a, span, img, button — строчные."
        }
      ]
    },
    {
      "id": "vitrina-10",
      "t": "Flexbox: шапка и ряд кнопок",
      "plan": "45 минут: шапка с логотипом слева и меню справа, меню в одну строку, кнопки в ряд — всё через flex.",
      "theory": {
        "rule": "**Flexbox** раскладывает детей контейнера в строку или столбец. Включается на родителе: display: flex — дети встают в ряд. **justify-content** — распределение по главной оси: flex-start, center, space-between (первый к левому краю, последний к правому). **align-items** — по поперечной оси: center выравнивает по вертикали. **gap: 16px** — расстояние между детьми. **flex-direction: column** — столбиком. **flex-wrap: wrap** — переносить на новую строку, если не влезает. Меню: у ul поставь display: flex, list-style: none и padding: 0 — маркеры исчезнут, пункты встанут в строку. flex: 1 у ребёнка — занять всё свободное место.",
        "ex": [
          [
            "header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px 16px;\n}",
            "логотип влево, меню вправо, оба по центру по высоте"
          ],
          [
            "nav ul {\n  display: flex;\n  gap: 16px;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}",
            "список становится строкой без маркеров, между пунктами 16px"
          ],
          [
            ".actions {\n  display: flex;\n  gap: 8px;\n}\n\n.actions button {\n  flex: 1;\n}",
            "две кнопки в ряд, делят ширину поровну"
          ],
          [
            "1. Сделай header флексом: space-between и align-items: center.\n2. Преврати меню nav ul в строку с gap.\n3. В карточке оберни кнопки в div class=\"actions\" и поставь их в ряд.\n4. Сузь окно браузера: меню должно оставаться строкой; ломается — добавь flex-wrap: wrap.\n5. В DevTools найди значок flex рядом с header и включи подсветку осей.",
            "Задание на Маке. Дети не встали в ряд — display: flex стоит не на родителе, а на самих детях."
          ],
          [
            "Без образца: сделай footer флексом: слева телефон, справа год; на узком экране — столбиком (flex-direction: column).",
            "Самостоятельно. Критерий: в широком окне две части по краям, в узком — одна под другой."
          ],
          [
            "Вот мой header и его CSS:\n[вставь]\nОбъясни, что делают justify-content и align-items именно здесь, и что изменится, если убрать каждое. Не переписывай.",
            "Проверь объяснение, убрав свойство в DevTools на секунду."
          ]
        ],
        "tip": "Готово, когда: шапка — логотип слева, меню справа, по центру по высоте; меню в строку без маркеров; кнопки в карточке в ряд с равной шириной; ты можешь сказать, какое свойство за что отвечает."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Где писать display: flex?",
          "options": [
            "На родителе, дети которого должны встать в ряд",
            "На каждом ребёнке",
            "На body всегда",
            "В теге link"
          ],
          "explanation": "Flex включается на контейнере."
        },
        {
          "k": "choice",
          "q": "Логотип слева, меню справа",
          "options": [
            "justify-content: space-between",
            "align-items: center",
            "flex-direction: column",
            "gap: 0"
          ],
          "explanation": "space-between раздвигает к краям."
        },
        {
          "k": "choice",
          "q": "Выровнять детей по вертикали по центру",
          "options": [
            "align-items: center",
            "justify-content: center",
            "text-align: center",
            "vertical: middle"
          ],
          "explanation": "Поперечная ось — align-items."
        },
        {
          "k": "input",
          "q": "Свойство для расстояния между детьми флекс-контейнера",
          "a": [
            "gap"
          ]
        },
        {
          "k": "choice",
          "q": "Что делает flex-wrap: wrap;?",
          "options": [
            "Переносит детей на новую строку, когда не хватает места",
            "Сжимает детей",
            "Ставит детей столбиком всегда",
            "Прячет лишних детей"
          ]
        }
      ]
    },
    {
      "id": "vitrina-11",
      "t": "Grid: сетка каталога",
      "plan": "45 минут: карточки стоят ровной сеткой в три колонки с одинаковыми промежутками; сетка собирается одним правилом.",
      "theory": {
        "rule": "**Grid** — сетка из колонок и строк, задаётся на родителе: display: grid. **grid-template-columns** — колонки: repeat(3, 1fr) — три равные; 1fr — доля свободного места. **gap** — промежутки. Автоподбор: repeat(auto-fill, minmax(260px, 1fr)) — столько колонок, сколько влезает шириной не меньше 260px; это адаптивная сетка без медиазапросов. Дети сетки — карточки; width им больше не нужен, ширину задаёт колонка. Flex — для ряда или столбца (шапка, кнопки), grid — для двухмерной сетки (каталог). **grid-column: 1 / -1** растягивает элемент на все колонки — например, заголовок раздела.",
        "ex": [
          [
            "#catalog {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}",
            "три равные колонки с промежутком 16px; у карточек убери width"
          ],
          [
            "#catalog {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));\n  gap: 16px;\n}",
            "колонок столько, сколько влезает по 260px: на телефоне одна, на ноутбуке три"
          ],
          [
            "#catalog h2 {\n  grid-column: 1 / -1;\n}",
            "заголовок «Товары» тянется на всю ширину сетки, а не занимает одну ячейку"
          ],
          [
            "1. Сделай #catalog сеткой из трёх колонок.\n2. Убери width у .card.\n3. Растяни h2 на все колонки.\n4. Замени repeat(3, 1fr) на auto-fill с minmax и сужай окно: колонки должны пересчитываться.\n5. В DevTools включи подсветку grid у #catalog и посмотри линии.",
            "Задание на Маке. Карточки встали в одну колонку — проверь, что display: grid стоит на #catalog, а не на .card."
          ],
          [
            "Без образца: сделай сетку для раздела «Отзывы» в две колонки с gap 24px, а на узком экране — в одну (через auto-fill и minmax).",
            "Самостоятельно. Критерий: отзывы в две колонки на ноутбуке и в одну на телефоне без медиазапросов."
          ],
          [
            "Вот CSS моей сетки:\n[вставь]\nОбъясни, как браузер считает число колонок в repeat(auto-fill, minmax(260px, 1fr)) при ширине 900px и 390px. Не переписывай.",
            "Сверь ответ с DevTools на этих ширинах (режим устройства)."
          ]
        ],
        "tip": "Готово, когда: каталог — сетка с равными колонками и промежутками, заголовок на всю ширину, число колонок меняется от ширины окна, а у карточек нет width."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Три равные колонки",
          "options": [
            "grid-template-columns: repeat(3, 1fr)",
            "columns: 3",
            "display: flex; columns: 3",
            "grid: 3"
          ]
        },
        {
          "k": "choice",
          "q": "Что такое 1fr?",
          "options": [
            "Доля свободного места",
            "Один пиксель",
            "Один процент",
            "Одна строка"
          ],
          "explanation": "fr — fraction, доля."
        },
        {
          "k": "choice",
          "q": "Когда grid, а когда flex?",
          "options": [
            "grid — двухмерная сетка, flex — ряд или столбец",
            "grid — для телефона, flex — для компьютера",
            "Это одно и то же",
            "flex — только для текста"
          ]
        },
        {
          "k": "input",
          "q": "Свойство, которое задаёт колонки сетки",
          "a": [
            "grid-template-columns"
          ]
        },
        {
          "k": "choice",
          "q": "repeat(auto-fill, minmax(260px, 1fr)) даёт",
          "options": [
            "Столько колонок, сколько влезает шириной от 260px",
            "Ровно 260 колонок",
            "Одну колонку 260px",
            "Колонки по 1px"
          ]
        }
      ]
    },
    {
      "id": "vitrina-12",
      "t": "Мобильная версия",
      "plan": "45 минут: на телефоне одна колонка, шапка и меню не ломаются, кнопки удобно нажимать; проверено в режиме устройства DevTools.",
      "theory": {
        "rule": "**Адаптивная вёрстка** — одна страница подстраивается под ширину экрана. База: meta viewport в head (уже есть) и max-width: 100% у картинок. **Медиазапрос** — правила для определённой ширины: @media (max-width: 600px) { … } применится на экранах уже 600px. Подход **mobile first**: основные стили для телефона, а в @media (min-width: 768px) — для широких экранов. Что менять на телефоне: шапку и меню — в столбик (flex-direction: column), сетку — в одну колонку (если не auto-fill), кнопки — не ниже 44px, чтобы попадать пальцем, шрифт в полях — 16px, иначе iPhone увеличивает страницу при вводе. Проверка: DevTools → значок телефона (режим устройства) → 390px и 768px; потом на настоящем телефоне по локальной сети или после публикации.",
        "ex": [
          [
            "@media (max-width: 600px) {\n  header {\n    flex-direction: column;\n    gap: 8px;\n  }\n  nav ul {\n    flex-wrap: wrap;\n  }\n}",
            "на узких экранах шапка столбиком, меню переносится"
          ],
          [
            "button {\n  min-height: 44px;\n  font-size: 16px;\n}",
            "размер под палец и шрифт, при котором iPhone не увеличивает страницу"
          ],
          [
            "@media (min-width: 768px) {\n  #catalog {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}",
            "mobile first: по умолчанию одна колонка, от 768px — три"
          ],
          [
            "1. Открой DevTools → режим устройства → 390px.\n2. Найди, что ломается: шапка, меню, кнопки, фото.\n3. Добавь @media (max-width: 600px) и исправь шапку и меню.\n4. Проверь кнопки: не ниже 44px, шрифт 16px.\n5. Проверь 768px и 1280px.\n6. Есть телефон — открой страницу с него: Mac и телефон в одной сети, адрес Mac в Системных настройках → Сеть.",
            "Задание на Маке. Горизонтальная прокрутка на телефоне — почти всегда элемент шире экрана: фото без max-width или фиксированный width у блока."
          ],
          [
            "Без образца: сделай так, чтобы на телефоне цена в карточке была крупнее, а кнопка — во всю ширину; на ноутбуке — как было.",
            "Самостоятельно. Критерий: правила в медиазапросе, на 390px и 1280px карточка выглядит по-разному, горизонтальной прокрутки нет."
          ],
          [
            "Вот мой styles.css:\n[вставь]\nНайди, что сломается на экране 390px, и назови одно место. Не переписывай, объясни, почему оно ломается.",
            "Проверь ответ в режиме устройства: ИИ не видит твой экран и может ошибиться."
          ]
        ],
        "tip": "Готово, когда: на 390px нет горизонтальной прокрутки, шапка и меню читаются, кнопки не ниже 44px, сетка в одну колонку, а на 1280px — три; проверено в DevTools на трёх ширинах. Модуль 1 закончен — впереди экзамен и проект «Витрина готова»."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Правила только для экранов уже 600px",
          "options": [
            "@media (max-width: 600px) { … }",
            "@media (min-width: 600px) { … }",
            "@mobile { … }",
            "if (width < 600) { … }"
          ],
          "explanation": "max-width — «не шире»."
        },
        {
          "k": "choice",
          "q": "Что такое mobile first?",
          "options": [
            "Основные стили для телефона, а для широких экранов — в @media (min-width)",
            "Сначала покупать телефон",
            "Стили только для телефона",
            "Отдельный сайт для телефона"
          ]
        },
        {
          "k": "choice",
          "q": "На телефоне появилась горизонтальная прокрутка. Самая частая причина?",
          "options": [
            "Элемент шире экрана: фото без max-width или фиксированный width",
            "Слишком мелкий шрифт",
            "Нет медиазапроса для 1280px",
            "Мало отступов"
          ]
        },
        {
          "k": "input",
          "q": "Минимальная высота кнопки для нажатия пальцем, в px (только число)",
          "a": [
            "44"
          ],
          "explanation": "44px — ориентир для элементов под палец."
        },
        {
          "k": "choice",
          "q": "Как проверить телефон, не публикуя сайт?",
          "options": [
            "DevTools → режим устройства; или открыть с телефона по адресу Mac в той же сети",
            "Никак, только после публикации",
            "Переименовать файл в mobile.html",
            "Уменьшить окно браузера до 100px"
          ]
        }
      ]
    },
    {
      "id": "vitrina-x2",
      "exam": true,
      "t": "Экзамен: витрина на CSS",
      "covers": [
        "vitrina-07",
        "vitrina-08",
        "vitrina-09",
        "vitrina-10",
        "vitrina-11",
        "vitrina-12"
      ],
      "pass": 0.8,
      "q": [
        {
          "k": "choice",
          "s": "vitrina-07",
          "q": "Как подключить стили?",
          "options": [
            "<link rel=\"stylesheet\" href=\"styles.css\">",
            "<style href=\"styles.css\">",
            "<link src=\"styles.css\">",
            "<css>styles.css</css>"
          ]
        },
        {
          "k": "input",
          "s": "vitrina-07",
          "q": "Селектор для элемента с id=\"catalog\"",
          "a": [
            "#catalog"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-08",
          "q": "Отступ снаружи элемента",
          "options": [
            "margin",
            "padding",
            "border",
            "gap"
          ]
        },
        {
          "k": "input",
          "s": "vitrina-08",
          "q": "Свойство для размера шрифта",
          "a": [
            "font-size"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-09",
          "q": "С box-sizing: border-box ширина width: 300px включает",
          "options": [
            "содержимое, padding и рамку",
            "только содержимое",
            "содержимое и margin",
            "ничего, это отключает width"
          ]
        },
        {
          "k": "input",
          "s": "vitrina-09",
          "q": "Свойство для рамки (толщина, стиль, цвет одной строкой)",
          "a": [
            "border"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-10",
          "q": "Поставить детей в ряд",
          "options": [
            "display: flex на родителе",
            "display: inline на родителе",
            "float: row",
            "display: flex на каждом ребёнке"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-10",
          "q": "Первый ребёнок к левому краю, последний к правому",
          "options": [
            "justify-content: space-between",
            "align-items: center",
            "gap: auto",
            "flex-direction: column"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-11",
          "q": "Сетка из трёх равных колонок",
          "options": [
            "grid-template-columns: repeat(3, 1fr)",
            "grid-columns: 3",
            "columns: 1fr 1fr 1fr; display: flex",
            "display: grid-3"
          ]
        },
        {
          "k": "input",
          "s": "vitrina-11",
          "q": "Свойство для промежутков между ячейками сетки и детьми флекса",
          "a": [
            "gap"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-12",
          "q": "Правила для экранов шире 768px (mobile first)",
          "options": [
            "@media (min-width: 768px)",
            "@media (max-width: 768px)",
            "@media (width: 768px)",
            "@desktop"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-12",
          "q": "Что должно быть в head для мобильной версии?",
          "options": [
            "meta viewport",
            "meta mobile",
            "link mobile.css",
            "ничего"
          ]
        },
        {
          "k": "order",
          "s": "vitrina-12",
          "q": "Расставь от внешнего к внутреннему: правило внутри медиазапроса",
          "words": [
            "@media",
            "header",
            "flex-direction"
          ],
          "a": "@media header flex-direction"
        }
      ]
    },
    {
      "id": "vitrina-13",
      "t": "Страница товара",
      "plan": "40 минут: у каждого товара своя страница с фото, описанием, характеристиками и ценой; с карточки на неё ведёт ссылка, со страницы — обратно в каталог; стили общие.",
      "theory": {
        "rule": "У каждого товара — отдельный HTML-файл в папке products: products/cup.html, products/vase.html. На странице: тот же header и footer, что в index.html (пока копируем руками, в модуле 2 научимся не дублировать), main с h1 — названием товара, большим фото, описанием, таблицей характеристик, ценой и кнопкой. Из карточки ведёт ссылка: a href=\"products/cup.html\". Обратно — a href=\"../index.html\". Стили общие: link href=\"../styles.css\" — две точки, потому что файл лежит в подпапке; то же для фото: ../img/cup.jpg. Имена файлов — латиницей без пробелов. title у каждой страницы свой: «Кружка «Утро» — Мой магазин».",
        "ex": [
          [
            "<article class=\"card\">\n  <a href=\"products/cup.html\">\n    <img src=\"img/cup.jpg\" alt=\"Синяя керамическая кружка\" width=\"600\" height=\"400\">\n  </a>\n  <h3><a href=\"products/cup.html\">Кружка «Утро»</a></h3>\n  <p class=\"price\">2 500 ₽</p>\n</article>",
            "фото и название в карточке — ссылки на страницу товара"
          ],
          [
            "<!doctype html>\n<html lang=\"ru\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Кружка «Утро» — Мой магазин</title>\n  <link rel=\"stylesheet\" href=\"../styles.css\">\n</head>\n<body>\n  <header>…тот же, что на главной…</header>\n  <main>\n    <a href=\"../index.html\">‹ В каталог</a>\n    <h1>Кружка «Утро»</h1>\n    <img src=\"../img/cup.jpg\" alt=\"Синяя керамическая кружка\" width=\"1200\" height=\"800\">\n    <p>Керамика ручной работы, 350 мл. Можно в посудомойку.</p>\n    <table>…характеристики…</table>\n    <p class=\"price\">2 500 ₽</p>\n    <button type=\"button\">В корзину</button>\n  </main>\n  <footer>…тот же…</footer>\n</body>\n</html>",
            "каркас products/cup.html: все пути начинаются с ../, потому что файл в подпапке"
          ],
          [
            "main img {\n  max-width: 100%;\n  height: auto;\n}\n\n.product {\n  max-width: 720px;\n  margin: 0 auto;\n}",
            "оберни содержимое страницы товара в div class=\"product\": текст не растягивается на весь экран, margin: 0 auto центрирует"
          ],
          [
            "1. Создай папку products и файл cup.html по каркасу.\n2. Скопируй header и footer из index.html.\n3. Исправь все пути: ../styles.css, ../img/…, ../index.html.\n4. Сделай ссылки с карточки на страницу и обратно.\n5. Открой index.html, перейди на товар, вернись.\n6. Сделай вторую страницу для второго товара.",
            "Задание на Маке. Стили не применились на странице товара — почти всегда забыли ../ в href у link."
          ],
          [
            "Без образца: третья страница товара с таблицей из четырёх характеристик и двумя фото (второе — фото детали крупно).",
            "Самостоятельно. Критерий: переход туда и обратно работает, стили и фото на месте, в DevTools нет ошибок 404 во вкладке Network."
          ],
          [
            "Вот моя products/cup.html:\n[вставь]\nПроверь только пути: link, img, ссылки. Для каждого скажи, по какому адресу браузер пойдёт, и где это сломается. Не переписывай.",
            "Пути — главный источник ошибок в этом уроке; проверь каждый в DevTools → Network."
          ]
        ],
        "tip": "Готово, когда: у каждого товара своя страница в products/, ссылки туда и обратно работают, стили и фото загружаются (Network без красного), title у каждой страницы свой."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Страница товара лежит в products/. Как подключить styles.css из корня?",
          "options": [
            "href=\"../styles.css\"",
            "href=\"styles.css\"",
            "href=\"/products/styles.css\"",
            "href=\"./styles.css\""
          ],
          "explanation": "Две точки — на уровень выше, в корень."
        },
        {
          "k": "choice",
          "q": "Ссылка с карточки на страницу кружки",
          "options": [
            "<a href=\"products/cup.html\">",
            "<a href=\"cup.html\">",
            "<a href=\"../products/cup.html\">",
            "<a src=\"products/cup.html\">"
          ],
          "explanation": "index.html в корне: путь относительно него — products/cup.html."
        },
        {
          "k": "input",
          "q": "Со страницы товара ссылка на главную. Напиши значение href",
          "a": [
            "../index.html"
          ],
          "explanation": "Из подпапки — на уровень выше."
        },
        {
          "k": "choice",
          "q": "Что должно отличаться у каждой страницы товара?",
          "options": [
            "title, h1, фото, описание, цена",
            "Только цена",
            "Ничего, страница одна",
            "Только файл стилей"
          ],
          "explanation": "title — для вкладки и поиска, h1 — заголовок на странице."
        },
        {
          "k": "choice",
          "q": "Как проверить, что все файлы на странице загрузились?",
          "options": [
            "DevTools → Network: нет красных строк и 404",
            "Открыть страницу дважды",
            "Посмотреть размер файла",
            "Проверить title"
          ],
          "explanation": "404 — файл не найден; чаще всего это неверный путь."
        }
      ]
    },
    {
      "id": "vitrina-14",
      "t": "Доступность: alt, контраст, фокус",
      "plan": "35 минут: сайт понятен программе чтения с экрана и управляется с клавиатуры; тексты ссылок осмысленные, контраст достаточный, фокус виден.",
      "theory": {
        "rule": "**Доступность** — сайт работает для всех: слабовидящих, тех, кто читает с экрана или управляет клавиатурой, и для поиска. Правила: 1) у каждого img осмысленный **alt**; для декоративных картинок alt=\"\" (пустой), чтобы их пропускали. 2) **Текст ссылки** говорит, куда она ведёт: «Подробнее о кружке», а не «тут» или «ссылка». 3) **Контраст** текста и фона не меньше 4.5:1 — серый на белом часто не проходит; проверка: DevTools → цвет → показатель contrast ratio. 4) **Фокус** виден: не пиши outline: none; если убрал — дай своё выделение через :focus-visible. 5) Всё работает **с клавиатуры**: Tab идёт по ссылкам и кнопкам в разумном порядке, Enter нажимает. 6) Кнопка — button, ссылка — a: не делай кнопку из div. 7) **Заголовки** по порядку, один h1. 8) lang=\"ru\" у html. 9) Размер текста не меньше 16px, кликабельные элементы не меньше 44px.",
        "ex": [
          [
            "<img src=\"img/cup.jpg\" alt=\"Синяя керамическая кружка 350 мл с белой ручкой\">\n<img src=\"img/divider.png\" alt=\"\">",
            "описание товара — по делу; декоративная линия — пустой alt"
          ],
          [
            "<a href=\"products/cup.html\">Подробнее о кружке «Утро»</a>\n<!-- плохо: <a href=\"products/cup.html\">тут</a> -->",
            "по тексту ссылки понятно, куда она ведёт, даже без картинки рядом"
          ],
          [
            "button:focus-visible,\na:focus-visible {\n  outline: 3px solid #1b5e20;\n  outline-offset: 2px;\n}",
            "своё заметное выделение фокуса вместо стандартного; outline: none без замены — ошибка"
          ],
          [
            "1. Пройди по главной клавишей Tab: виден ли фокус, в правильном ли порядке идут элементы.\n2. Проверь контраст цены и серого текста в DevTools (щёлкни по цвету → contrast ratio).\n3. Перепиши тексты ссылок «тут», «подробнее» в осмысленные.\n4. Проверь alt у всех фото; декоративным поставь alt=\"\".\n5. В Chrome: DevTools → Lighthouse → Accessibility → запусти и исправь, что найдено.",
            "Задание на Маке. Lighthouse — встроенная проверка Chrome; оценка ниже 90 — есть что исправить, отчёт скажет, что именно."
          ],
          [
            "Без образца: включи на Маке VoiceOver (⌘F5), пройди по главной только с клавиатуры и выключи. Запиши три вещи, которые мешали.",
            "Самостоятельно. Критерий: все три помехи исправлены, Lighthouse Accessibility не ниже 90."
          ],
          [
            "Вот мой index.html:\n[вставь]\nНайди три проблемы доступности: alt, тексты ссылок, порядок заголовков, кнопки из div. Назови и объясни, кому они мешают. Не переписывай.",
            "Доступность — не «для галочки»: тот же код лучше читает поиск, и покупатель с телефона нажимает куда надо."
          ]
        ],
        "tip": "Готово, когда: Lighthouse Accessibility не ниже 90, по Tab виден фокус и порядок логичен, у фото осмысленные alt, тексты ссылок говорят, куда ведут, контраст текста проходит 4.5:1."
      },
      "ex": [
        {
          "k": "choice",
          "q": "alt у декоративной картинки",
          "options": [
            "alt=\"\" — пустой, чтобы её пропускали",
            "alt=\"картинка\"",
            "alt=\"декоративная линия в шапке сайта\"",
            "без атрибута alt"
          ],
          "explanation": "Пустой alt говорит программе чтения: пропусти."
        },
        {
          "k": "choice",
          "q": "Хороший текст ссылки",
          "options": [
            "Подробнее о кружке «Утро»",
            "тут",
            "нажми сюда",
            "ссылка"
          ]
        },
        {
          "k": "choice",
          "q": "Минимальный контраст текста и фона",
          "options": [
            "4.5:1",
            "1:1",
            "2:1",
            "10:1 обязательно"
          ],
          "explanation": "4.5:1 — норма для обычного текста."
        },
        {
          "k": "input",
          "q": "Какая клавиша переводит фокус по ссылкам и кнопкам?",
          "a": [
            "Tab"
          ],
          "explanation": "Tab — вперёд, Shift+Tab — назад, Enter — нажать."
        },
        {
          "k": "choice",
          "q": "Почему outline: none без замены — ошибка?",
          "options": [
            "Пропадает видимый фокус, управлять с клавиатуры нельзя",
            "Ломается вёрстка",
            "Сайт перестаёт открываться",
            "Это нельзя писать в CSS"
          ],
          "explanation": "Фокус можно переоформить, но не убрать."
        }
      ]
    },
    {
      "id": "vitrina-15",
      "t": "Проект 1: витрина готова",
      "plan": "60 минут: каталог и страницы товаров с твоими товарами открываются на телефоне и ноутбуке, проходят проверку кода и доступности; два человека посмотрели и дали отзыв.",
      "theory": {
        "rule": "Проект собирает всё из уроков 1–14. **Чек-лист сдачи:** 1) главная с шапкой, меню, каталогом из 3–4 карточек, доставкой и контактами; 2) у каждого товара своя страница; 3) один styles.css, box-sizing: border-box, сетка каталога, мобильная версия без горизонтальной прокрутки на 390px; 4) HTML проходит валидатор validator.w3.org без ошибок (предупреждения можно); 5) Lighthouse Accessibility не ниже 90; 6) в DevTools → Console нет ошибок, в Network нет 404; 7) все фото латиницей, сжаты до 1200px; 8) два человека открыли сайт с телефона (по локальной сети или с файла) и сказали, что непонятно — записано. Что не входит в проект: корзина, поиск, публикация — это модули 2 и 3.",
        "ex": [
          [
            "Чек-лист:\n[ ] главная: header, nav, catalog, delivery, footer\n[ ] 3–4 карточки одинаковой структуры\n[ ] страницы товаров в products/\n[ ] styles.css один на всё, border-box\n[ ] grid каталога, auto-fill\n[ ] 390px без горизонтальной прокрутки\n[ ] валидатор: 0 ошибок\n[ ] Lighthouse Accessibility ≥ 90\n[ ] Console пустая, Network без 404\n[ ] 2 отзыва записаны",
            "скопируй в заметки и отмечай по ходу"
          ],
          [
            "Валидатор: validator.w3.org → Validate by File Upload → выбери index.html.\nОшибки читай сверху вниз: первая часто вызывает остальные.",
            "валидатор ловит незакрытые теги, лишние атрибуты, неверную вложенность — то, что браузер молча прощает"
          ],
          [
            "Открыть сайт с телефона без публикации:\n1. Mac и телефон в одной Wi-Fi-сети.\n2. В Терминале, в папке vitrina: python3 -m http.server 8000\n3. Адрес Mac: Системные настройки → Сеть → IP.\n4. На телефоне открой http://<IP>:8000",
            "простой локальный сервер, встроенный в macOS; остановить — Ctrl+C"
          ],
          [
            "1. Пройди чек-лист сверху вниз, исправляя по пути.\n2. Прогони валидатор на всех страницах.\n3. Прогони Lighthouse на главной и одной странице товара.\n4. Подними локальный сервер и открой с телефона.\n5. Покажи двум людям, запиши их замечания в заметки урока.\n6. Исправь, что сможешь за 20 минут; остальное — в список на потом.",
            "Задание на Маке. Не доводи до идеала: цель проекта — рабочая витрина, а не бесконечная полировка."
          ],
          [
            "Без образца: напиши в заметках, какие три вещи ты бы сделал иначе, начав проект заново, и что из этого войдёт в модуль 2.",
            "Самостоятельно. Это и есть главный результат проекта: ты видишь свои решения со стороны."
          ],
          [
            "Вот ссылка на архив моей витрины или код главной:\n[вставь]\nСделай ревью как опытный верстальщик: 5 главных замечаний по убыванию важности, с объяснением, почему это важно для магазина. Не переписывай код.",
            "Ревью читай, но решай сам: часть замечаний будет про вкус, а не про ошибки."
          ]
        ],
        "tip": "Готово, когда: все пункты чек-листа отмечены, валидатор и Lighthouse пройдены, сайт открыт с настоящего телефона, два отзыва записаны. Модуль 1 закрыт — впереди JavaScript."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Зачем прогонять HTML через валидатор, если браузер всё показывает?",
          "options": [
            "Браузер молча прощает ошибки, которые потом ломают CSS и JavaScript",
            "Без этого сайт не опубликовать",
            "Валидатор ускоряет загрузку",
            "Это требование GitHub"
          ]
        },
        {
          "k": "choice",
          "q": "Как открыть витрину с телефона без публикации?",
          "options": [
            "Локальный сервер на Маке (python3 -m http.server) и адрес Mac в той же сети",
            "Отправить файл в мессенджере",
            "Никак",
            "Переименовать index.html в index.mobile"
          ]
        },
        {
          "k": "choice",
          "q": "Что НЕ входит в проект 1?",
          "options": [
            "Корзина и поиск",
            "Страницы товаров",
            "Мобильная версия",
            "Доступность"
          ],
          "explanation": "Корзина и поиск — модуль 2, JavaScript."
        },
        {
          "k": "input",
          "q": "Минимальная оценка Lighthouse Accessibility по чек-листу (число)",
          "a": [
            "90"
          ]
        },
        {
          "k": "choice",
          "q": "Два человека посмотрели сайт. Что делать с замечаниями?",
          "options": [
            "Записать все, исправить за 20 минут главное, остальное — в список",
            "Исправить всё сразу, даже если на это уйдёт неделя",
            "Ничего: они не верстальщики",
            "Удалить сайт и начать заново"
          ]
        }
      ]
    },
    {
      "id": "vitrina-x3",
      "exam": true,
      "t": "Экзамен: модуль 1 — витрина",
      "covers": [
        "vitrina-13",
        "vitrina-14",
        "vitrina-15"
      ],
      "pass": 0.8,
      "q": [
        {
          "k": "choice",
          "s": "vitrina-13",
          "q": "Файл products/cup.html подключает фото из корневой папки img. Путь?",
          "options": [
            "../img/cup.jpg",
            "img/cup.jpg",
            "/img/cup.jpg",
            "products/img/cup.jpg"
          ]
        },
        {
          "k": "input",
          "s": "vitrina-13",
          "q": "Из products/cup.html ссылка на styles.css в корне — напиши значение href",
          "a": [
            "../styles.css"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-13",
          "q": "Где смотреть, загрузился ли файл стилей?",
          "options": [
            "DevTools → Network",
            "DevTools → Elements → title",
            "В адресной строке",
            "В Finder"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-14",
          "q": "Текст ссылки на страницу товара",
          "options": [
            "Подробнее о вазе «Волна»",
            "тут",
            "ссылка",
            "нажми"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-14",
          "q": "Фокус на кнопке должен быть",
          "options": [
            "виден: своё выделение через :focus-visible",
            "убран через outline: none",
            "только у ссылок",
            "виден только на телефоне"
          ]
        },
        {
          "k": "input",
          "s": "vitrina-14",
          "q": "Атрибут html, который сообщает язык страницы",
          "a": [
            "lang"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-14",
          "q": "Контраст 2:1 у серого текста на белом",
          "options": [
            "Не проходит, нужен не меньше 4.5:1",
            "Проходит",
            "Проходит для заголовков",
            "Контраст не проверяют"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-15",
          "q": "Валидатор нашёл 12 ошибок. С какой начать?",
          "options": [
            "С первой: она часто вызывает остальные",
            "С последней",
            "С любой",
            "Игнорировать: браузер показывает страницу"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-15",
          "q": "Команда локального сервера на Маке",
          "options": [
            "python3 -m http.server 8000",
            "open index.html --server",
            "npm start html",
            "safari --local"
          ]
        },
        {
          "k": "order",
          "s": "vitrina-15",
          "q": "Порядок сдачи проекта",
          "words": [
            "чек-лист",
            "валидатор",
            "телефон",
            "отзывы"
          ],
          "a": "чек-лист валидатор телефон отзывы"
        }
      ]
    },
    {
      "id": "vitrina-16",
      "t": "Что такое JavaScript и куда его писать",
      "plan": "30 минут: файл app.js подключён, первый скрипт меняет текст на странице, ты умеешь смотреть ошибки и выводить значения в консоль.",
      "theory": {
        "rule": "**JavaScript** — поведение страницы: что происходит по клику, вводу, таймеру. Пишется в отдельном файле app.js и подключается в конце body: script src=\"app.js\" — или в head с defer, чтобы скрипт ждал загрузки HTML. **Консоль** (DevTools → Console) — место для проверки: console.log(\"привет\") печатает значение; ошибки тоже появляются там, красным, с номером строки. **Найти элемент:** document.querySelector(\"h1\") — первый h1; querySelector(\".price\") — по классу; querySelector(\"#catalog\") — по id, селекторы как в CSS. **Изменить текст:** element.textContent = \"Новый текст\". Каждая команда заканчивается точкой с запятой. Комментарий: // текст. Регистр важен: querySelector, не queryselector.",
        "ex": [
          [
            "<body>\n  …\n  <script src=\"app.js\"></script>\n</body>",
            "скрипт в самом конце body: к этому моменту все элементы уже есть на странице"
          ],
          [
            "// app.js\nconsole.log(\"Магазин загружен\");\n\nconst title = document.querySelector(\"h1\");\ntitle.textContent = \"Мой магазин — открыт!\";",
            "первая строка печатает в консоль, вторая находит h1, третья меняет его текст"
          ],
          [
            "const price = document.querySelector(\".price\");\nconsole.log(price.textContent);",
            "прочитать текст элемента: в консоли появится «2 500 ₽»"
          ],
          [
            "1. Создай app.js, подключи в конце body.\n2. Напиши console.log и открой DevTools → Console: сообщение есть.\n3. Найди h1 и поменяй его текст.\n4. Специально ошибись: querySelector(\"h7\") и textContent — прочитай ошибку в консоли (Cannot set properties of null).\n5. Исправь и выведи в консоль цену первого товара.",
            "Задание на Маке. null в ошибке значит «элемент не найден»: проверь селектор и что скрипт стоит после элементов."
          ],
          [
            "Без образца: по загрузке страницы поменяй текст кнопки первого товара на «Купить» и выведи в консоль название второго товара.",
            "Самостоятельно. Критерий: оба изменения видны, консоль без красного."
          ],
          [
            "Вот мой app.js и ошибка из консоли:\n[вставь]\nОбъясни, что значит ошибка и в какой строке причина. Не исправляй за меня, скажи, что проверить.",
            "Учись читать ошибки: номер строки и слово null говорят почти всё."
          ]
        ],
        "tip": "Готово, когда: app.js подключён, console.log виден, текст на странице меняется скриптом, ты прочитал и исправил одну ошибку из консоли."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Где подключать app.js?",
          "options": [
            "В конце body или в head с defer",
            "В начале head без defer",
            "Внутри h1",
            "В styles.css"
          ],
          "explanation": "Скрипт должен выполняться, когда элементы уже есть."
        },
        {
          "k": "input",
          "q": "Команда, которая печатает значение в консоль (без скобок)",
          "a": [
            "console.log"
          ]
        },
        {
          "k": "choice",
          "q": "Найти первый элемент с классом price",
          "options": [
            "document.querySelector(\".price\")",
            "document.querySelector(\"price\")",
            "document.find(\".price\")",
            "document.querySelector(\"#price\")"
          ],
          "explanation": "Селектор как в CSS: класс с точкой."
        },
        {
          "k": "choice",
          "q": "Изменить текст элемента",
          "options": [
            "element.textContent = \"Купить\"",
            "element.text = \"Купить\"",
            "element = \"Купить\"",
            "element.innerText() = \"Купить\""
          ]
        },
        {
          "k": "choice",
          "q": "Ошибка «Cannot set properties of null». Что это?",
          "options": [
            "Элемент не найден: неверный селектор или скрипт выполнился раньше HTML",
            "Нет интернета",
            "Файл стилей сломан",
            "Нужно обновить браузер"
          ]
        }
      ]
    },
    {
      "id": "vitrina-17",
      "t": "Переменные и числа: цена и скидка",
      "plan": "35 минут: скрипт считает цену со скидкой и выводит её на страницу; ты понимаешь const и let, арифметику и округление.",
      "theory": {
        "rule": "**Переменная** — именованное значение. **const** — не меняется (цена товара), **let** — меняется (сумма в корзине). Имена латиницей, со строчной, слова слитно с большой буквы: basePrice, discountPercent. **Числа** пишут без пробелов и с точкой: 2500, 12.5. Действия: + − * /; **%** — остаток от деления. Проценты считают так: price * (1 - 20 / 100). **Округление:** Math.round(x) — до целого, Math.floor — вниз, Math.ceil — вверх. Деньги в копейках не считают — округляй до рубля. Результат в строку: `${total} ₽` — шаблонная строка в обратных кавычках. Текст из textContent — строка, не число: Number(\"2500\") превращает в число.",
        "ex": [
          [
            "const price = 2500;\nconst discount = 20;\nconst total = Math.round(price * (1 - discount / 100));\nconsole.log(total); // 2000",
            "20% скидки: умножаем на 0.8 и округляем"
          ],
          [
            "let cartTotal = 0;\ncartTotal = cartTotal + 2500;\ncartTotal += 3000;\nconsole.log(cartTotal); // 5500",
            "let — значение меняется; += прибавляет к текущему"
          ],
          [
            "const priceEl = document.querySelector(\".price\");\npriceEl.textContent = `${total} ₽ (скидка ${discount}%)`;",
            "шаблонная строка подставляет значения внутрь текста"
          ],
          [
            "1. Заведи в app.js const price и const discount.\n2. Посчитай total с округлением, выведи в консоль.\n3. Запиши total на страницу в .price через шаблонную строку.\n4. Поменяй discount на 15 и 33 — проверь округление.\n5. Попробуй присвоить новое значение const — прочитай ошибку в консоли.",
            "Задание на Маке. TypeError: Assignment to constant variable — так JavaScript защищает значения, которые не должны меняться."
          ],
          [
            "Без образца: посчитай стоимость трёх кружек с доставкой 300 ₽ и выведи «Итого: … ₽»; при сумме больше 5000 доставка бесплатная (пока без if — сделай два расчёта и сравни глазами).",
            "Самостоятельно. Критерий: число сходится с калькулятором, в консоли нет ошибок."
          ],
          [
            "Вот мой расчёт:\n[вставь]\nПроверь порядок действий и округление. Если результат неверный, объясни, где, но не переписывай.",
            "Сравни с калькулятором: ИИ тоже ошибается в арифметике."
          ]
        ],
        "tip": "Готово, когда: скрипт считает цену со скидкой и пишет её на страницу, ты знаешь разницу const и let, умеешь округлять и подставлять числа в текст."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Значение, которое не будет меняться",
          "options": [
            "const",
            "let",
            "var",
            "static"
          ]
        },
        {
          "k": "input",
          "q": "Напиши результат: Math.round(2500 * 0.8)",
          "a": [
            "2000"
          ]
        },
        {
          "k": "choice",
          "q": "Как записать «20% скидки» в коде?",
          "options": [
            "price * (1 - 20 / 100)",
            "price - 20%",
            "price / 20",
            "price * 20"
          ]
        },
        {
          "k": "choice",
          "q": "Шаблонная строка с переменной total",
          "options": [
            "`${total} ₽`",
            "\"$total ₽\"",
            "'{total} ₽'",
            "`total ₽`"
          ],
          "explanation": "Обратные кавычки и ${…}."
        },
        {
          "k": "choice",
          "q": "textContent вернул \"2500\". Чтобы посчитать, нужно",
          "options": [
            "Number(\"2500\")",
            "ничего, это уже число",
            "String(2500)",
            "Math.round(\"2500\" + 1)"
          ],
          "explanation": "Из элемента приходит строка; Number превращает её в число."
        }
      ]
    },
    {
      "id": "vitrina-18",
      "t": "Строки: подпись к товару",
      "plan": "35 минут: подпись к товару собирается из названия, материала и цены; ты умеешь склеивать, приводить к нужному регистру и проверять содержимое строки.",
      "theory": {
        "rule": "**Строка** — текст в кавычках: \"Кружка\" или 'Кружка'. **Склеить:** \"Кружка\" + \" \" + \"Утро\" или шаблонная строка `${name} — ${price} ₽`. **Длина:** name.length. **Регистр:** name.toUpperCase(), name.toLowerCase() — пригодится для поиска без учёта регистра. **Проверить:** name.includes(\"круж\") — есть ли подстрока, name.startsWith(\"К\"). **Обрезать пробелы по краям:** input.trim() — обязательно для того, что ввёл пользователь. **Заменить:** text.replace(\"₽\", \"руб.\"). Строки не меняются сами: методы возвращают новую строку, старую надо перезаписать: name = name.trim().",
        "ex": [
          [
            "const name = \"Кружка «Утро»\";\nconst material = \"керамика\";\nconst price = 2500;\nconst caption = `${name} · ${material} · ${price} ₽`;\nconsole.log(caption);",
            "подпись собирается из трёх частей; шаблонная строка читается лучше, чем +"
          ],
          [
            "const query = \"  КРУЖ \";\nconst clean = query.trim().toLowerCase();\nconsole.log(clean);          // \"круж\"\nconsole.log(name.toLowerCase().includes(clean)); // true",
            "так будет работать поиск: обрезаем, приводим к строчным, ищем подстроку"
          ],
          [
            "console.log(name.length);        // число символов\nconsole.log(name.startsWith(\"Кру\")); // true\nconsole.log(name.replace(\"«Утро»\", \"«Вечер»\"));",
            "три частых метода; replace вернул новую строку, name не изменился"
          ],
          [
            "1. Собери подпись к первому товару из трёх переменных и запиши её в карточку.\n2. Выведи длину названия.\n3. Сделай переменную query с пробелами и заглавными — приведи к виду для поиска.\n4. Проверь includes для названий всех товаров.\n5. Замени в подписи «₽» на «руб.».",
            "Задание на Маке. includes различает регистр: «Кружка».includes(\"круж\") даст false — поэтому сначала toLowerCase."
          ],
          [
            "Без образца: напиши подпись вида «КРУЖКА «УТРО» — 2 500 ₽», где название заглавными, а в цене пробел между тысячами (подсказка: price.toLocaleString(\"ru-RU\")).",
            "Самостоятельно. Критерий: подпись в карточке, число с пробелом, название заглавными."
          ],
          [
            "Вот мой код со строками:\n[вставь]\nСкажи, где я забыл trim или toLowerCase и что из-за этого сломается в поиске. Не переписывай.",
            "Поиск по строкам — основа урока 26; ошибки здесь всплывут там."
          ]
        ],
        "tip": "Готово, когда: подпись собирается из переменных и стоит в карточке, ты умеешь обрезать, менять регистр и искать подстроку, понимаешь, что методы строк возвращают новую строку."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Склеить name и price через тире",
          "options": [
            "`${name} — ${price} ₽`",
            "name — price ₽",
            "\"name — price ₽\"",
            "name + — + price"
          ]
        },
        {
          "k": "input",
          "q": "Метод, который убирает пробелы по краям строки (без скобок)",
          "a": [
            "trim"
          ]
        },
        {
          "k": "choice",
          "q": "Проверить, есть ли в строке подстрока «круж»",
          "options": [
            "name.includes(\"круж\")",
            "name.has(\"круж\")",
            "name.find(\"круж\") === true",
            "name == \"круж\""
          ]
        },
        {
          "k": "choice",
          "q": "«Кружка».includes(\"круж\") даст",
          "options": [
            "false — регистр различается",
            "true",
            "ошибку",
            "«Кружка»"
          ],
          "explanation": "Сначала toLowerCase."
        },
        {
          "k": "choice",
          "q": "name.toUpperCase() — что с name?",
          "options": [
            "Не меняется: метод вернул новую строку",
            "Становится заглавным",
            "Удаляется",
            "Становится числом"
          ]
        }
      ]
    },
    {
      "id": "vitrina-19",
      "t": "Массивы: список товаров",
      "plan": "35 минут: все названия товаров лежат в одном массиве; ты умеешь обращаться по номеру, добавлять, считать и искать.",
      "theory": {
        "rule": "**Массив** — список значений в квадратных скобках: const names = [\"Кружка\", \"Ваза\", \"Тарелка\"]. **Номера с нуля:** names[0] — «Кружка», names[2] — «Тарелка». **Длина:** names.length — 3; последний элемент — names[names.length - 1]. **Добавить в конец:** names.push(\"Блюдо\"); **убрать последний:** names.pop(). **Найти:** names.includes(\"Ваза\") — есть ли; names.indexOf(\"Ваза\") — номер (−1, если нет). **Склеить в строку:** names.join(\", \"). Массив можно менять даже у const: const запрещает заменить массив целиком, а не содержимое. В модуле дальше: forEach и циклы по массиву (урок 22).",
        "ex": [
          [
            "const names = [\"Кружка\", \"Ваза\", \"Тарелка\"];\nconsole.log(names[0]);       // Кружка\nconsole.log(names.length);   // 3\nconsole.log(names[names.length - 1]); // Тарелка",
            "номер первого — 0, последний — length − 1"
          ],
          [
            "names.push(\"Блюдо\");\nconsole.log(names.length);   // 4\nconsole.log(names.includes(\"Ваза\"));  // true\nconsole.log(names.indexOf(\"Чайник\")); // -1",
            "push добавляет; includes и indexOf ищут"
          ],
          [
            "const prices = [2500, 3000, 1200];\nconst list = document.querySelector(\"#list\");\nlist.textContent = names.join(\", \");",
            "join склеивает массив в строку с разделителем — быстрый способ вывести список"
          ],
          [
            "1. Заведи массивы names и prices для своих товаров.\n2. Выведи первый и последний товар, длину.\n3. Добавь товар через push и проверь includes.\n4. Выведи все названия через join в элемент на странице.\n5. Попробуй names[10] — получишь undefined; пойми, почему.",
            "Задание на Маке. undefined — «ничего нет»: такого номера в массиве не существует."
          ],
          [
            "Без образца: сделай массив остатков stock = [3, 0, 5] и выведи в консоль название товара, которого нет (пока вручную по номеру: names[stock.indexOf(0)]).",
            "Самостоятельно. Критерий: в консоли название второго товара; потом ответь себе, почему indexOf(0) нашёл нужный номер."
          ],
          [
            "Вот мои массивы:\n[вставь]\nПроверь, совпадают ли номера в names и prices, и объясни, чем это опасно и как в уроке 20 это решат объекты. Не переписывай.",
            "Два параллельных массива — временное решение; объекты в следующем уроке сделают данные надёжнее."
          ]
        ],
        "tip": "Готово, когда: названия и цены лежат в массивах, список выводится на страницу, ты знаешь, что номера идут с нуля, и умеешь push, includes, indexOf, join."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Номер первого элемента массива",
          "options": [
            "0",
            "1",
            "-1",
            "length"
          ]
        },
        {
          "k": "input",
          "q": "names = [\"Кружка\", \"Ваза\", \"Тарелка\"]. Что вернёт names[1]?",
          "a": [
            "Ваза"
          ]
        },
        {
          "k": "choice",
          "q": "Добавить элемент в конец массива",
          "options": [
            "names.push(\"Блюдо\")",
            "names.add(\"Блюдо\")",
            "names[last] = \"Блюдо\"",
            "names + \"Блюдо\""
          ]
        },
        {
          "k": "choice",
          "q": "names.indexOf(\"Чайник\") вернул −1. Это значит",
          "options": [
            "Такого элемента нет",
            "Он последний",
            "Он первый",
            "Ошибка"
          ]
        },
        {
          "k": "choice",
          "q": "Последний элемент массива",
          "options": [
            "names[names.length - 1]",
            "names[names.length]",
            "names[-1]",
            "names.last"
          ],
          "explanation": "length − 1: номера с нуля."
        }
      ]
    },
    {
      "id": "vitrina-20",
      "t": "Объекты: товар как данные",
      "plan": "40 минут: товар — объект с названием, ценой, фото и остатком; все товары — массив объектов, из которого в модуле строится каталог.",
      "theory": {
        "rule": "**Объект** — набор пар «ключ: значение» в фигурных скобках: const cup = { name: \"Кружка «Утро»\", price: 2500, image: \"img/cup.jpg\", stock: 3 }. **Доступ:** cup.name, cup.price; **изменить:** cup.stock = 2; **добавить поле:** cup.material = \"керамика\". Ключи — латиницей, без кавычек, если одно слово. Значения — любые: строка, число, массив (tags: [\"кухня\", \"подарок\"]), другой объект. **Массив объектов** — главная структура магазина: const products = [cup, vase, plate]; products[0].name — название первого. Объект — это «одна строка таблицы», массив объектов — вся таблица. Вывести объект целиком: console.log(cup) — DevTools покажет дерево.",
        "ex": [
          [
            "const cup = {\n  name: \"Кружка «Утро»\",\n  price: 2500,\n  image: \"img/cup.jpg\",\n  stock: 3,\n  tags: [\"кухня\", \"подарок\"]\n};\nconsole.log(cup.name, cup.price);",
            "один товар — один объект; поля читаются через точку"
          ],
          [
            "const products = [\n  { name: \"Кружка «Утро»\", price: 2500, image: \"img/cup.jpg\", stock: 3 },\n  { name: \"Ваза «Волна»\", price: 3000, image: \"img/vase.jpg\", stock: 0 },\n  { name: \"Тарелка\", price: 1200, image: \"img/plate.jpg\", stock: 5 }\n];\nconsole.log(products[1].name);   // Ваза «Волна»\nconsole.log(products.length);    // 3",
            "массив объектов вместо двух параллельных массивов из урока 19"
          ],
          [
            "cup.stock = cup.stock - 1;\ncup.material = \"керамика\";\nconsole.log(cup);",
            "поля можно менять и добавлять; console.log покажет объект деревом"
          ],
          [
            "1. Опиши три своих товара объектами и собери products.\n2. Выведи название и цену второго товара.\n3. Уменьши остаток первого на 1, добавь поле material.\n4. Посчитай сумму цен первых двух: products[0].price + products[1].price.\n5. Напиши products[0].nmae (с опечаткой) — получишь undefined; запомни этот симптом.",
            "Задание на Маке. undefined при чтении поля — почти всегда опечатка в имени ключа."
          ],
          [
            "Без образца: добавь каждому товару поле description и массив photos из двух путей; выведи второе фото третьего товара.",
            "Самостоятельно. Критерий: products[2].photos[1] печатает путь, в консоли нет ошибок."
          ],
          [
            "Вот мой products:\n[вставь]\nПроверь единообразие: у всех ли объектов одинаковые ключи, одинаковые типы (цена — число, не строка). Назови расхождения, не переписывай.",
            "Разные ключи у товаров — главная причина багов в каталоге из урока 24."
          ]
        ],
        "tip": "Готово, когда: products — массив из 3–4 объектов с одинаковыми ключами, ты читаешь и меняешь поля через точку, понимаешь разницу массива и объекта."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Прочитать цену товара cup",
          "options": [
            "cup.price",
            "cup[price]",
            "cup->price",
            "price.cup"
          ]
        },
        {
          "k": "choice",
          "q": "Название второго товара в массиве products",
          "options": [
            "products[1].name",
            "products[2].name",
            "products.name[1]",
            "products(1).name"
          ]
        },
        {
          "k": "input",
          "q": "cup = { name: \"Кружка\", stock: 3 }. Что вернёт cup.stock?",
          "a": [
            "3"
          ]
        },
        {
          "k": "choice",
          "q": "Объект — это",
          "options": [
            "Набор пар «ключ: значение» в фигурных скобках",
            "Список значений в квадратных скобках",
            "Строка в кавычках",
            "Число"
          ]
        },
        {
          "k": "choice",
          "q": "cup.nmae вернул undefined. Почему?",
          "options": [
            "Опечатка в имени ключа: такого поля нет",
            "Объект пустой",
            "Нужны квадратные скобки",
            "Цена не задана"
          ]
        }
      ]
    },
    {
      "id": "vitrina-21",
      "t": "Условия: в наличии или нет",
      "plan": "35 минут: кнопка «В корзину» отключается, если товара нет; скрипт сам решает, что показать, по if / else.",
      "theory": {
        "rule": "**if** проверяет условие и выполняет блок, если оно истинно: if (cup.stock > 0) { … } else { … }. **Сравнения:** === равно (три знака!), !== не равно, >, <, >=, <=. **Логика:** && — и, || — или, ! — не. Условие может быть само значение: if (name) — непустая строка истинна, 0 и \"\" — ложь. **Несколько вариантов:** else if. **Короткая запись:** const label = stock > 0 ? \"В корзину\" : \"Нет в наличии\" — тернарный оператор. **Управление кнопкой:** button.disabled = true — кнопка не нажимается; button.textContent = \"Нет в наличии\". Классы для вида: el.classList.add(\"sold-out\"), .remove, .toggle — а стиль .sold-out задаёшь в CSS.",
        "ex": [
          [
            "const button = document.querySelector(\".card button\");\nif (cup.stock > 0) {\n  button.textContent = \"В корзину\";\n} else {\n  button.textContent = \"Нет в наличии\";\n  button.disabled = true;\n}",
            "одно условие: есть остаток — обычная кнопка, нет — отключённая"
          ],
          [
            "let message;\nif (cup.stock === 0) {\n  message = \"Нет в наличии\";\n} else if (cup.stock < 3) {\n  message = \"Осталось мало\";\n} else {\n  message = \"В наличии\";\n}",
            "три варианта подряд: проверки идут сверху вниз, срабатывает первая истинная"
          ],
          [
            "const isAvailable = cup.stock > 0 && cup.price <= 5000;\nconst label = isAvailable ? \"Купить\" : \"Недоступно\";\ncard.classList.toggle(\"sold-out\", cup.stock === 0);",
            "&& — оба условия; тернарный оператор — короткий if; toggle с условием добавляет класс, когда оно истинно"
          ],
          [
            "1. Для каждого товара вручную (по номеру) напиши if по остатку: текст кнопки и disabled.\n2. Добавь в CSS .sold-out { opacity: 0.5; } и ставь класс карточке при stock === 0.\n3. Сделай ветку «Осталось мало» для stock < 3.\n4. Поменяй остатки в products и обнови страницу — кнопки должны измениться.\n5. Напиши условие с одним = вместо === и посмотри, что произойдёт.",
            "Задание на Маке. Одно = — это присваивание, а не сравнение: условие станет всегда истинным. Пиши ===."
          ],
          [
            "Без образца: добавь скидку: если price > 2000 && stock > 0 — покажи в карточке «−10%» и новую цену, иначе — обычную.",
            "Самостоятельно. Критерий: у дорогих товаров в наличии видна скидка, у остальных нет, в консоли чисто."
          ],
          [
            "Вот мои условия:\n[вставь]\nПроверь сравнения (=== vs ==, > vs >=) и порядок веток else if. Объясни, при каких остатках какая ветка сработает. Не переписывай.",
            "Порядок веток важен: проверка «< 3» перед «=== 0» перехватит ноль."
          ]
        ],
        "tip": "Готово, когда: кнопки зависят от остатка, у недоступных товаров класс sold-out, есть ветка «мало», ты используешь === и понимаешь && и ||."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Равно в JavaScript",
          "options": [
            "===",
            "=",
            "==",
            "equals"
          ],
          "explanation": "Три знака. Одно = — присваивание."
        },
        {
          "k": "choice",
          "q": "«Остаток больше нуля И цена не выше 5000»",
          "options": [
            "stock > 0 && price <= 5000",
            "stock > 0 || price <= 5000",
            "stock > 0 and price <= 5000",
            "stock > 0 & price < 5000"
          ]
        },
        {
          "k": "input",
          "q": "Свойство кнопки, которое делает её ненажимаемой",
          "a": [
            "disabled"
          ]
        },
        {
          "k": "choice",
          "q": "Короткая запись if/else",
          "options": [
            "stock > 0 ? \"Купить\" : \"Нет\"",
            "if stock > 0 then \"Купить\" else \"Нет\"",
            "stock > 0 ?? \"Купить\"",
            "\"Купить\" if stock > 0"
          ]
        },
        {
          "k": "choice",
          "q": "if (stock = 0) — что не так?",
          "options": [
            "Одно = присваивает, а не сравнивает; нужно ===",
            "Всё верно",
            "Нужно == 0",
            "stock должен быть строкой"
          ]
        }
      ]
    },
    {
      "id": "vitrina-x4",
      "exam": true,
      "t": "Экзамен: JavaScript, уроки 16–21",
      "covers": [
        "vitrina-16",
        "vitrina-17",
        "vitrina-18",
        "vitrina-19",
        "vitrina-20",
        "vitrina-21"
      ],
      "pass": 0.8,
      "q": [
        {
          "k": "choice",
          "s": "vitrina-16",
          "q": "Найти элемент с id=\"catalog\"",
          "options": [
            "document.querySelector(\"#catalog\")",
            "document.querySelector(\".catalog\")",
            "document.get(\"catalog\")",
            "querySelector(catalog)"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-16",
          "q": "В консоли: Cannot set properties of null. Причина",
          "options": [
            "Элемент не найден",
            "Нет интернета",
            "Ошибка в CSS",
            "Браузер устарел"
          ]
        },
        {
          "k": "input",
          "s": "vitrina-17",
          "q": "Ключевое слово для значения, которое не меняется",
          "a": [
            "const"
          ]
        },
        {
          "k": "input",
          "s": "vitrina-17",
          "q": "Math.round(1200 * 0.85) = ?",
          "a": [
            "1020"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-18",
          "q": "Убрать пробелы по краям и привести к строчным",
          "options": [
            "s.trim().toLowerCase()",
            "s.lower().strip()",
            "s.trim.toLowerCase",
            "trim(s).lower(s)"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-18",
          "q": "Подстановка переменной в текст",
          "options": [
            "`${name} ₽`",
            "\"${name} ₽\"",
            "'$name ₽'",
            "`name ₽`"
          ]
        },
        {
          "k": "input",
          "s": "vitrina-19",
          "q": "names = [\"Кружка\", \"Ваза\"]. Что вернёт names.length?",
          "a": [
            "2"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-19",
          "q": "Проверить, есть ли «Ваза» в массиве",
          "options": [
            "names.includes(\"Ваза\")",
            "names.has(\"Ваза\")",
            "names.contains(\"Ваза\")",
            "\"Ваза\" in names"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-20",
          "q": "Цена третьего товара в products",
          "options": [
            "products[2].price",
            "products[3].price",
            "products.price[2]",
            "products.2.price"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-20",
          "q": "Массив объектов — это",
          "options": [
            "Таблица: каждый объект — строка",
            "Одна строка таблицы",
            "Строка текста",
            "Число"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-21",
          "q": "«Нет в наличии ИЛИ цена выше 5000»",
          "options": [
            "stock === 0 || price > 5000",
            "stock === 0 && price > 5000",
            "stock = 0 or price > 5000",
            "stock == 0 & price > 5000"
          ]
        },
        {
          "k": "input",
          "s": "vitrina-21",
          "q": "Метод classList, который добавляет класс (без скобок)",
          "a": [
            "add"
          ]
        }
      ]
    },
    {
      "id": "vitrina-22",
      "t": "Циклы: вывести все товары",
      "plan": "40 минут: список названий и цен строится из массива products автоматически — одним циклом вместо копий кода на каждый товар.",
      "theory": {
        "rule": "**Цикл** повторяет блок кода для каждого элемента. Самый удобный для массивов — **for … of**: for (const product of products) { … } — внутри product по очереди становится каждым товаром. **forEach** делает то же через функцию: products.forEach((product) => { … }). Нужен номер — классический **for**: for (let i = 0; i < products.length; i++) { products[i] }. Внутри цикла собирай строку или текст и после цикла записывай в элемент одним присваиванием — так быстрее и проще отлаживать. **continue** — пропустить текущий элемент, **break** — выйти из цикла. Не меняй массив, по которому идёшь.",
        "ex": [
          [
            "for (const product of products) {\n  console.log(product.name, product.price);\n}",
            "три товара — три строки в консоли; product каждый раз новый"
          ],
          [
            "let total = 0;\nfor (const product of products) {\n  total += product.price;\n}\nconsole.log(`Сумма цен: ${total} ₽`);",
            "накопитель total объявлен до цикла, цикл прибавляет, результат после"
          ],
          [
            "let text = \"\";\nfor (const product of products) {\n  if (product.stock === 0) continue;\n  text += `${product.name} — ${product.price} ₽\\n`;\n}\ndocument.querySelector(\"#list\").textContent = text;",
            "товары без остатка пропускаются; строка копится и один раз записывается на страницу"
          ],
          [
            "1. Выведи циклом в консоль все товары.\n2. Посчитай циклом сумму цен и число товаров в наличии.\n3. Собери текст списка и запиши в элемент #list.\n4. Добавь continue для stock === 0.\n5. Перепиши тот же цикл через forEach и через for с индексом — сравни, какой читается лучше.",
            "Задание на Маке. Бесконечный цикл (забыл i++) вешает вкладку — закрой её и исправь."
          ],
          [
            "Без образца: найди циклом самый дорогой товар (запомни текущий максимум и сравнивай) и выведи его название.",
            "Самостоятельно. Критерий: правильное название при любом порядке товаров в массиве."
          ],
          [
            "Вот мой цикл:\n[вставь]\nПроверь: объявлен ли накопитель до цикла, не меняю ли я массив внутри, нет ли лишнего присваивания textContent на каждой итерации. Не переписывай.",
            "Три самые частые ошибки с циклами — именно эти."
          ]
        ],
        "tip": "Готово, когда: список товаров на странице строится циклом из products, сумма и число в наличии считаются кодом, ты знаешь for…of, forEach и for с индексом."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Пройти по всем элементам массива products",
          "options": [
            "for (const p of products) { … }",
            "for (p in products.length) { … }",
            "foreach p of products { … }",
            "loop products { … }"
          ]
        },
        {
          "k": "input",
          "q": "Ключевое слово, чтобы пропустить текущий элемент и перейти к следующему",
          "a": [
            "continue"
          ]
        },
        {
          "k": "choice",
          "q": "Где объявлять накопитель суммы?",
          "options": [
            "До цикла: let total = 0",
            "Внутри цикла на каждой итерации",
            "После цикла",
            "В HTML"
          ],
          "explanation": "Внутри цикла он обнулялся бы каждый раз."
        },
        {
          "k": "choice",
          "q": "Цикл for (let i = 0; i < 3; i++) выполнится",
          "options": [
            "3 раза: i = 0, 1, 2",
            "2 раза",
            "4 раза",
            "бесконечно"
          ]
        },
        {
          "k": "choice",
          "q": "Забыл i++ в for. Что будет?",
          "options": [
            "Бесконечный цикл, вкладка зависнет",
            "Цикл не запустится",
            "Ошибка синтаксиса",
            "Выполнится один раз"
          ]
        }
      ]
    },
    {
      "id": "vitrina-23",
      "t": "Функции: цена в рублях",
      "plan": "35 минут: одна функция форматирует все цены вида «12 500 ₽»; ты пишешь функции с параметрами и return и вызываешь их из циклов.",
      "theory": {
        "rule": "**Функция** — именованный кусок кода, который можно вызывать много раз: function formatPrice(value) { return `${value.toLocaleString(\"ru-RU\")} ₽`; }. **Параметр** (value) — что принимает; **return** — что отдаёт; без return функция возвращает undefined. Вызов: formatPrice(12500) → «12 500 ₽». **Стрелочная запись** — то же короче: const formatPrice = (value) => `${value} ₽`. Правило: одна функция — одно дело; имя — глагол (formatPrice, getTotal, renderList). Функции с числом: toLocaleString(\"ru-RU\") ставит пробел между тысячами, toFixed(2) — два знака после запятой (вернёт строку). Переменные внутри функции снаружи не видны.",
        "ex": [
          [
            "function formatPrice(value) {\n  return `${value.toLocaleString(\"ru-RU\")} ₽`;\n}\n\nconsole.log(formatPrice(12500)); // 12 500 ₽",
            "параметр value, результат через return; toLocaleString добавляет пробел между тысячами"
          ],
          [
            "function getTotal(items) {\n  let total = 0;\n  for (const item of items) {\n    total += item.price;\n  }\n  return total;\n}\n\nconsole.log(formatPrice(getTotal(products)));",
            "функции собираются как детали: одна считает, другая форматирует"
          ],
          [
            "const withDiscount = (price, percent) => Math.round(price * (1 - percent / 100));\nconsole.log(withDiscount(2500, 20)); // 2000",
            "стрелочная функция с двумя параметрами; если тело — одно выражение, return не пишут"
          ],
          [
            "1. Напиши formatPrice и замени ей все выводы цен из прошлых уроков.\n2. Напиши getTotal(items) и выведи сумму.\n3. Напиши withDiscount и примени к первому товару.\n4. Вызови formatPrice без аргумента — прочитай ошибку (toLocaleString у undefined).\n5. Попробуй обратиться к total снаружи getTotal — убедись, что переменная не видна.",
            "Задание на Маке. «Cannot read properties of undefined» в функции — значит, её вызвали без нужного аргумента."
          ],
          [
            "Без образца: функция countInStock(items), которая возвращает число товаров с stock > 0, и функция isCheap(product), возвращающая true при цене до 2000.",
            "Самостоятельно. Критерий: обе вызываются в консоли и дают верные числа; у каждой есть return."
          ],
          [
            "Вот мои функции:\n[вставь]\nПроверь имена (глагол?), один ли результат у каждой, есть ли return во всех ветках. Не переписывай.",
            "Функция без return в одной из веток — классическая ошибка, вернёт undefined."
          ]
        ],
        "tip": "Готово, когда: все цены на странице идут через formatPrice с пробелом между тысячами, сумма считается getTotal, ты пишешь функции с параметрами и return и понимаешь, что переменные внутри — локальные."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Что отдаёт функция без return?",
          "options": [
            "undefined",
            "0",
            "пустую строку",
            "последнее значение"
          ]
        },
        {
          "k": "input",
          "q": "Ключевое слово, которое объявляет функцию (классическая запись)",
          "a": [
            "function"
          ]
        },
        {
          "k": "choice",
          "q": "Вызвать formatPrice для числа 2500",
          "options": [
            "formatPrice(2500)",
            "formatPrice = 2500",
            "call formatPrice 2500",
            "formatPrice[2500]"
          ]
        },
        {
          "k": "choice",
          "q": "Число 12500 в виде «12 500»",
          "options": [
            "value.toLocaleString(\"ru-RU\")",
            "value.toString(\" \")",
            "value.format()",
            "String(value).split()"
          ]
        },
        {
          "k": "choice",
          "q": "Переменная total объявлена внутри функции. Снаружи она",
          "options": [
            "не видна",
            "видна",
            "видна только в циклах",
            "становится глобальной после вызова"
          ]
        }
      ]
    },
    {
      "id": "vitrina-24",
      "t": "DOM: создать карточку кодом",
      "plan": "45 минут: карточки каталога создаёт скрипт из products; HTML-разметка карточек из файла удалена, добавить товар — значит добавить объект в массив.",
      "theory": {
        "rule": "**DOM** — дерево элементов страницы, которым управляет JavaScript. **Создать элемент:** const card = document.createElement(\"article\"); card.className = \"card\". **Вложить:** parent.append(child). **Наполнить:** textContent для текста; для картинки img.src и img.alt. Способ короче — **innerHTML** с шаблонной строкой: card.innerHTML = `<h3>${product.name}</h3>…` — но только для своих данных, не для того, что ввёл пользователь: иначе через поле ввода можно вставить чужой код (XSS). **Очистить контейнер:** catalog.innerHTML = \"\" перед перерисовкой. **Привязать данные к элементу:** card.dataset.id = product.id — потом событие узнает, какой товар нажали. Обычная схема: функция renderCatalog(items) — очищает контейнер, в цикле создаёт карточки, добавляет. Дай каждому товару поле id.",
        "ex": [
          [
            "function createCard(product) {\n  const card = document.createElement(\"article\");\n  card.className = \"card\";\n  card.dataset.id = product.id;\n  card.innerHTML = `\n    <img src=\"${product.image}\" alt=\"${product.name}\" width=\"600\" height=\"400\">\n    <h3>${product.name}</h3>\n    <p class=\"price\">${formatPrice(product.price)}</p>\n    <button type=\"button\">В корзину</button>\n  `;\n  return card;\n}",
            "одна карточка из одного объекта; dataset.id пригодится для кнопок"
          ],
          [
            "function renderCatalog(items) {\n  const catalog = document.querySelector(\"#catalog\");\n  catalog.innerHTML = \"\";\n  for (const product of items) {\n    catalog.append(createCard(product));\n  }\n}\n\nrenderCatalog(products);",
            "очистить, собрать заново: так же будет работать поиск и фильтры"
          ],
          [
            "const title = document.createElement(\"h3\");\ntitle.textContent = userText; // безопасно\n// card.innerHTML = userText;  // опасно: чужой HTML выполнится",
            "текст от пользователя — только через textContent"
          ],
          [
            "1. Добавь каждому товару в products поле id (1, 2, 3…).\n2. Напиши createCard и renderCatalog, вызови renderCatalog(products).\n3. Удали из index.html разметку карточек — оставь пустой section#catalog с h2.\n4. Добавь в products четвёртый товар — он появится без правок HTML.\n5. В DevTools → Elements посмотри созданные карточки и их data-id.",
            "Задание на Маке. Карточки не появились — проверь, что скрипт подключён после section#catalog и что renderCatalog вызван."
          ],
          [
            "Без образца: сделай так, чтобы у товаров со stock === 0 кнопка создавалась с disabled и карточка получала класс sold-out (используй условие из урока 21 внутри createCard).",
            "Самостоятельно. Критерий: при изменении stock в массиве и перезагрузке карточки меняются сами."
          ],
          [
            "Вот мой createCard:\n[вставь]\nПроверь: нет ли innerHTML с данными от пользователя, возвращает ли функция элемент, есть ли dataset.id. Назови одну проблему, не переписывай.",
            "Данные из products — твои, им можно доверять; данным из полей ввода — нет."
          ]
        ],
        "tip": "Готово, когда: каталог строится renderCatalog(products), разметки карточек в HTML нет, у карточек data-id, новый товар добавляется одной строкой в массив, а текст пользователя никогда не попадает в innerHTML."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Создать элемент article",
          "options": [
            "document.createElement(\"article\")",
            "document.new(\"article\")",
            "new Element(\"article\")",
            "document.append(\"article\")"
          ]
        },
        {
          "k": "input",
          "q": "Метод, который добавляет созданный элемент внутрь родителя (без скобок)",
          "a": [
            "append",
            "appendChild"
          ]
        },
        {
          "k": "choice",
          "q": "Текст, который ввёл пользователь, вставлять через",
          "options": [
            "textContent",
            "innerHTML",
            "eval",
            "document.write"
          ],
          "explanation": "innerHTML выполнит чужой HTML и скрипт."
        },
        {
          "k": "choice",
          "q": "Зачем card.dataset.id = product.id?",
          "options": [
            "Чтобы по клику узнать, какой товар нажали",
            "Чтобы карточка была видна",
            "Для CSS-анимации",
            "Без этого createElement не работает"
          ]
        },
        {
          "k": "choice",
          "q": "Перед перерисовкой каталога",
          "options": [
            "Очистить контейнер: catalog.innerHTML = \"\"",
            "Перезагрузить страницу",
            "Удалить products",
            "Ничего не делать"
          ]
        }
      ]
    },
    {
      "id": "vitrina-25",
      "t": "События: клик и ввод",
      "plan": "40 минут: страница отвечает на нажатия и ввод; кнопка «В корзину» знает, какой товар нажали, поле ввода сообщает каждую букву.",
      "theory": {
        "rule": "**Событие** — то, что случилось: клик, ввод, отправка формы. Подписка: element.addEventListener(\"click\", (event) => { … }). Внутри **event.target** — элемент, на котором произошло событие. Чтобы не вешать обработчик на каждую кнопку, вешай один на контейнер — **делегирование**: catalog.addEventListener(\"click\", …) и внутри проверяй event.target.closest(\"button\"); карточку находишь через closest(\".card\") и читаешь dataset.id. Для полей ввода — событие **input** (срабатывает на каждую букву), значение — event.target.value. Для форм — **submit** и event.preventDefault(), чтобы страница не перезагружалась. Обработчик вешают после того, как элемент создан; при делегировании это неважно — карточки могут пересоздаваться.",
        "ex": [
          [
            "const catalog = document.querySelector(\"#catalog\");\ncatalog.addEventListener(\"click\", (event) => {\n  const button = event.target.closest(\"button\");\n  if (!button) return;\n  const card = button.closest(\".card\");\n  const id = Number(card.dataset.id);\n  console.log(\"Нажали товар\", id);\n});",
            "один обработчик на весь каталог; клик не по кнопке игнорируется"
          ],
          [
            "const search = document.querySelector(\"#search\");\nsearch.addEventListener(\"input\", (event) => {\n  console.log(\"Ввели:\", event.target.value);\n});",
            "input срабатывает на каждую букву; value — текущий текст поля"
          ],
          [
            "const form = document.querySelector(\"#order\");\nform.addEventListener(\"submit\", (event) => {\n  event.preventDefault();\n  console.log(\"Форма отправлена без перезагрузки\");\n});",
            "preventDefault отменяет стандартное действие — перезагрузку страницы"
          ],
          [
            "1. Повесь обработчик клика на #catalog и выводи id нажатого товара.\n2. Добавь в HTML поле input id=\"search\" и выводи введённое.\n3. По клику меняй текст кнопки на «Добавлено» на 1 секунду (setTimeout(() => …, 1000)).\n4. Добавь товар в products, перерисуй каталог — клик по новой карточке тоже работает (делегирование).\n5. Нажми не по кнопке, а по фото — убедись, что ничего не происходит.",
            "Задание на Маке. Обработчик не срабатывает — проверь, что элемент существует в момент addEventListener, и что имя события в кавычках и строчными."
          ],
          [
            "Без образца: по клику на фото товара открывай его страницу: location.href = `products/${product.slug}.html` — добавь товарам поле slug.",
            "Самостоятельно. Критерий: клик по фото ведёт на нужную страницу у всех товаров."
          ],
          [
            "Вот мои обработчики:\n[вставь]\nПроверь: делегирование или по обработчику на кнопку, есть ли проверка closest, не теряется ли обработчик после перерисовки. Не переписывай.",
            "Обработчик на кнопке пропадает вместе с кнопкой при перерисовке — поэтому делегирование."
          ]
        ],
        "tip": "Готово, когда: клик по кнопке сообщает id товара через делегирование, поле ввода отдаёт текст на каждую букву, форма не перезагружает страницу, и всё работает после перерисовки каталога."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Подписаться на клик",
          "options": [
            "el.addEventListener(\"click\", (e) => { … })",
            "el.onclick(\"click\")",
            "el.click = () => { … }",
            "listen(el, click)"
          ]
        },
        {
          "k": "input",
          "q": "Свойство события, в котором лежит элемент, на котором оно произошло (без event.)",
          "a": [
            "target"
          ]
        },
        {
          "k": "choice",
          "q": "Один обработчик на контейнер вместо обработчика на каждую кнопку — это",
          "options": [
            "делегирование",
            "дублирование",
            "рекурсия",
            "замыкание"
          ]
        },
        {
          "k": "choice",
          "q": "Событие, которое срабатывает на каждую введённую букву",
          "options": [
            "input",
            "click",
            "submit",
            "change"
          ]
        },
        {
          "k": "choice",
          "q": "Форма перезагружает страницу при отправке. Что сделать?",
          "options": [
            "event.preventDefault() в обработчике submit",
            "Убрать кнопку",
            "Поставить return false в HTML",
            "Отключить JavaScript"
          ]
        }
      ]
    },
    {
      "id": "vitrina-26",
      "t": "Поиск по названию",
      "plan": "40 минут: поле поиска сужает каталог на лету; пустой запрос показывает всё, «ничего не найдено» — отдельное сообщение.",
      "theory": {
        "rule": "Поиск — это три шага: взять текст из поля, **отфильтровать** массив, **перерисовать** каталог. **filter** возвращает новый массив из элементов, для которых функция вернула true: products.filter((p) => p.name.toLowerCase().includes(query)). Запрос готовь как в уроке 18: trim() и toLowerCase(). Пустой запрос — показывать всё: if (!query) return products. Искать можно по нескольким полям: name или description. Если результат пустой — выводи «Ничего не найдено», а не пустой экран. Исходный массив products не меняй: filter его не трогает. Функция search(query) возвращает массив, renderCatalog его рисует — не смешивай поиск и рисование в одной функции.",
        "ex": [
          [
            "function search(query) {\n  const q = query.trim().toLowerCase();\n  if (!q) return products;\n  return products.filter((p) =>\n    p.name.toLowerCase().includes(q) ||\n    (p.description || \"\").toLowerCase().includes(q)\n  );\n}",
            "filter собирает подходящие товары; description может отсутствовать — на этот случай || \"\""
          ],
          [
            "const input = document.querySelector(\"#search\");\ninput.addEventListener(\"input\", () => {\n  renderCatalog(search(input.value));\n});",
            "каждая буква — новый список; renderCatalog из урока 24 очищает и рисует"
          ],
          [
            "function renderCatalog(items) {\n  const catalog = document.querySelector(\"#catalog\");\n  catalog.innerHTML = \"\";\n  if (items.length === 0) {\n    catalog.innerHTML = \"<p class=\\\"empty\\\">Ничего не найдено</p>\";\n    return;\n  }\n  for (const product of items) catalog.append(createCard(product));\n}",
            "пустой результат — сообщение; это свой HTML, не пользовательский, поэтому innerHTML допустим"
          ],
          [
            "1. Добавь поле input id=\"search\" с placeholder «Поиск» над каталогом.\n2. Напиши search(query) и подключи к событию input.\n3. Введи заглавными и с пробелами — поиск должен работать.\n4. Введи то, чего нет, — увидь «Ничего не найдено».\n5. Очисти поле — каталог полный.",
            "Задание на Маке. Поиск не находит товар с буквой ё? Сравни написание в products и в запросе: «ё» и «е» — разные символы."
          ],
          [
            "Без образца: добавь счётчик «Найдено: N» над каталогом и подсветку совпадения в названии (замена через replace на <mark>…</mark> — только для своих данных).",
            "Самостоятельно. Критерий: счётчик совпадает с числом карточек, подсветка не ломает текст."
          ],
          [
            "Вот мой поиск:\n[вставь]\nПроверь: не меняю ли products, обрабатываю ли пустой запрос и пустой результат, не рисую ли внутри search. Не переписывай.",
            "Разделение search и renderCatalog — то, что позволит в уроке 27 добавить фильтры без переписывания."
          ]
        ],
        "tip": "Готово, когда: поиск работает на каждую букву без учёта регистра и пробелов, пустой запрос возвращает всё, пустой результат показывает сообщение, products не меняется."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Метод массива, который возвращает новый массив по условию",
          "options": [
            "filter",
            "find",
            "forEach",
            "map"
          ]
        },
        {
          "k": "input",
          "q": "Что вернёт [1, 2, 3].filter((n) => n > 1).length?",
          "a": [
            "2"
          ]
        },
        {
          "k": "choice",
          "q": "Пустой запрос в поиске должен",
          "options": [
            "показывать все товары",
            "показывать «Ничего не найдено»",
            "очищать каталог",
            "вызывать ошибку"
          ]
        },
        {
          "k": "choice",
          "q": "Почему trim() и toLowerCase() перед поиском?",
          "options": [
            "Чтобы пробелы и регистр не мешали находить",
            "Чтобы ускорить поиск",
            "Чтобы изменить products",
            "Это требование filter"
          ]
        },
        {
          "k": "choice",
          "q": "filter меняет исходный массив?",
          "options": [
            "Нет, возвращает новый",
            "Да, удаляет лишнее",
            "Да, сортирует",
            "Зависит от браузера"
          ]
        }
      ]
    },
    {
      "id": "vitrina-27",
      "t": "Фильтры и сортировка",
      "plan": "45 минут: каталог фильтруется по категории и цене и сортируется «дешевле / дороже»; поиск, фильтры и сортировка работают вместе.",
      "theory": {
        "rule": "Дай товарам поле category. **Фильтр по категории:** select с вариантами и items.filter((p) => category === \"all\" || p.category === category). **По цене:** два поля min/max и p.price >= min && p.price <= max. **Сортировка:** sort с функцией сравнения: items.sort((a, b) => a.price - b.price) — по возрастанию; b.price - a.price — по убыванию; по названию — a.name.localeCompare(b.name). **Важно:** sort меняет массив на месте — сортируй копию: [...items].sort(…). Все условия хранят в одном объекте state = { query, category, min, max, sortBy }; одна функция applyFilters() берёт products, прогоняет через filter и sort и отдаёт renderCatalog. Любое изменение поля — обновить state и вызвать applyFilters.",
        "ex": [
          [
            "const state = { query: \"\", category: \"all\", max: Infinity, sortBy: \"default\" };\n\nfunction applyFilters() {\n  let items = search(state.query);\n  if (state.category !== \"all\") {\n    items = items.filter((p) => p.category === state.category);\n  }\n  items = items.filter((p) => p.price <= state.max);\n  if (state.sortBy === \"cheap\") items = [...items].sort((a, b) => a.price - b.price);\n  if (state.sortBy === \"expensive\") items = [...items].sort((a, b) => b.price - a.price);\n  renderCatalog(items);\n}",
            "одна функция собирает всё: поиск, категория, цена, сортировка — и рисует"
          ],
          [
            "<select id=\"category\">\n  <option value=\"all\">Все</option>\n  <option value=\"kitchen\">Кухня</option>\n  <option value=\"decor\">Декор</option>\n</select>\n<select id=\"sort\">\n  <option value=\"default\">По умолчанию</option>\n  <option value=\"cheap\">Дешевле</option>\n  <option value=\"expensive\">Дороже</option>\n</select>",
            "значения option — латиницей, они попадут в state"
          ],
          [
            "document.querySelector(\"#category\").addEventListener(\"change\", (e) => {\n  state.category = e.target.value;\n  applyFilters();\n});\ndocument.querySelector(\"#search\").addEventListener(\"input\", (e) => {\n  state.query = e.target.value;\n  applyFilters();\n});",
            "каждый элемент управления только меняет state и зовёт applyFilters; для select — событие change"
          ],
          [
            "1. Добавь товарам category и два select в HTML.\n2. Заведи state и applyFilters, переведи поиск на state.query.\n3. Подключи select категории и сортировки через change.\n4. Проверь сочетания: запрос + категория + сортировка.\n5. Отсортируй products напрямую без копии и посмотри, что порядок «по умолчанию» сломался; верни копию.",
            "Задание на Маке. Сортировка «сломала» порядок — sort изменил products; нужна копия [...items]."
          ],
          [
            "Без образца: добавь фильтр «только в наличии» (checkbox, событие change, state.inStock) и сортировку по названию через localeCompare.",
            "Самостоятельно. Критерий: чекбокс убирает товары со stock 0, сортировка по названию правильно ставит «Ё» и «Я»."
          ],
          [
            "Вот мой applyFilters:\n[вставь]\nПроверь порядок: сначала filter, потом sort; копия перед sort; один renderCatalog в конце. Не переписывай.",
            "Сортировать после фильтра — меньше работы и меньше ошибок."
          ]
        ],
        "tip": "Готово, когда: поиск, категория, цена и сортировка работают в любом сочетании через один state и applyFilters, products не меняется, порядок «по умолчанию» восстанавливается."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Сортировка по возрастанию цены",
          "options": [
            "items.sort((a, b) => a.price - b.price)",
            "items.sort(\"price\")",
            "items.sort((a, b) => a.price > b.price)",
            "items.order(price)"
          ]
        },
        {
          "k": "choice",
          "q": "sort меняет исходный массив?",
          "options": [
            "Да, сортирует на месте — сортируй копию",
            "Нет, возвращает новый",
            "Только числа",
            "Только строки"
          ]
        },
        {
          "k": "input",
          "q": "Событие для select, когда пользователь выбрал другой пункт",
          "a": [
            "change"
          ]
        },
        {
          "k": "choice",
          "q": "Где хранить все текущие условия?",
          "options": [
            "В одном объекте state",
            "В отдельных глобальных переменных",
            "В HTML",
            "В localStorage сразу"
          ]
        },
        {
          "k": "choice",
          "q": "Сравнить строки по-русски при сортировке",
          "options": [
            "a.name.localeCompare(b.name)",
            "a.name - b.name",
            "a.name > b.name",
            "a.name.sort(b.name)"
          ]
        }
      ]
    },
    {
      "id": "vitrina-28",
      "t": "Корзина: добавить, изменить, удалить",
      "plan": "50 минут: товары складываются в корзину, количество меняется, лишнее удаляется, сумма считается сама; корзина — массив объектов {id, qty}.",
      "theory": {
        "rule": "**Корзина** — массив записей { id, qty }, отдельно от products: let cart = []. **Добавить:** найти запись find((item) => item.id === id); есть — qty += 1, нет — push({ id, qty: 1 }). **Изменить:** qty = новое; если стало 0 — удалить. **Удалить:** cart = cart.filter((item) => item.id !== id). **Сумма:** для каждой записи найти товар в products по id и умножить price на qty. **Показать:** renderCart() — список строк «название × qty = сумма», кнопки +, −, ×, итог; кнопки — через делегирование с data-action и data-id. Все изменения — только через функции addToCart, changeQty, removeFromCart, и после каждой — renderCart(). Не храни в корзине цену: цена живёт в products.",
        "ex": [
          [
            "let cart = [];\n\nfunction addToCart(id) {\n  const item = cart.find((i) => i.id === id);\n  if (item) {\n    item.qty += 1;\n  } else {\n    cart.push({ id, qty: 1 });\n  }\n  renderCart();\n}",
            "одна функция на добавление: либо увеличить, либо создать запись"
          ],
          [
            "function changeQty(id, delta) {\n  const item = cart.find((i) => i.id === id);\n  if (!item) return;\n  item.qty += delta;\n  if (item.qty <= 0) removeFromCart(id);\n  else renderCart();\n}\n\nfunction removeFromCart(id) {\n  cart = cart.filter((i) => i.id !== id);\n  renderCart();\n}",
            "изменение на +1/−1; ноль — удаление"
          ],
          [
            "function getCartTotal() {\n  let total = 0;\n  for (const item of cart) {\n    const product = products.find((p) => p.id === item.id);\n    total += product.price * item.qty;\n  }\n  return total;\n}\n\nfunction renderCart() {\n  const box = document.querySelector(\"#cart\");\n  if (cart.length === 0) { box.textContent = \"Корзина пуста\"; return; }\n  box.innerHTML = cart.map((item) => {\n    const p = products.find((x) => x.id === item.id);\n    return `<div class=\"row\" data-id=\"${item.id}\">\n      ${p.name} × ${item.qty} = ${formatPrice(p.price * item.qty)}\n      <button data-action=\"minus\">−</button>\n      <button data-action=\"plus\">+</button>\n      <button data-action=\"remove\">×</button>\n    </div>`;\n  }).join(\"\") + `<p class=\"total\">Итого: ${formatPrice(getCartTotal())}</p>`;\n}",
            "цена берётся из products по id; map превращает записи в строки HTML (свои данные)"
          ],
          [
            "1. Добавь в HTML section#cart.\n2. Напиши cart, addToCart, changeQty, removeFromCart, getCartTotal, renderCart.\n3. В обработчике каталога по кнопке вызывай addToCart(id).\n4. Повесь делегирование на #cart: по data-action вызывай нужную функцию.\n5. Проверь: добавь товар трижды, убавь до нуля, удали другой — итог всегда верный.",
            "Задание на Маке. Сумма «NaN» — товар не найден по id: сравни типы, dataset даёт строку, в products число; Number() спасает."
          ],
          [
            "Без образца: ограничь qty остатком stock (не больше, чем есть), и показывай в шапке счётчик «Корзина (N)», где N — сумма qty.",
            "Самостоятельно. Критерий: нельзя добавить больше остатка, счётчик в шапке совпадает с корзиной."
          ],
          [
            "Вот мой код корзины:\n[вставь]\nПроверь: не храню ли цену в корзине, все ли изменения идут через функции, вызывается ли renderCart после каждого, Number у id. Не переписывай.",
            "Корзина — первое место, где ошибки стоят денег: проверяй итог калькулятором."
          ]
        ],
        "tip": "Готово, когда: добавление, +, −, удаление работают через функции, итог верный, пустая корзина показывает сообщение, цены берутся из products, в шапке счётчик."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Запись в корзине — это",
          "options": [
            "{ id, qty }",
            "{ name, price, image, stock }",
            "строка «Кружка × 2»",
            "число"
          ],
          "explanation": "Цена и название живут в products, корзине нужны только id и количество."
        },
        {
          "k": "choice",
          "q": "Найти запись корзины по id",
          "options": [
            "cart.find((i) => i.id === id)",
            "cart.filter(id)",
            "cart[id]",
            "cart.search(id)"
          ]
        },
        {
          "k": "choice",
          "q": "Удалить запись из корзины",
          "options": [
            "cart = cart.filter((i) => i.id !== id)",
            "cart.remove(id)",
            "delete cart[id]",
            "cart.pop(id)"
          ]
        },
        {
          "k": "input",
          "q": "Итог «NaN» при расчёте суммы. Какой функцией превратить строку из dataset в число?",
          "a": [
            "Number"
          ]
        },
        {
          "k": "choice",
          "q": "После каждого изменения корзины",
          "options": [
            "вызывать renderCart()",
            "перезагружать страницу",
            "ничего, страница обновится сама",
            "очищать products"
          ]
        }
      ]
    },
    {
      "id": "vitrina-29",
      "t": "Корзина не пропадает: localStorage",
      "plan": "40 минут: после перезагрузки страницы корзина на месте; данные сохраняются в браузере как JSON и безопасно читаются обратно.",
      "theory": {
        "rule": "**localStorage** — хранилище браузера: пары «ключ — строка», живут после перезагрузки и закрытия вкладки, отдельные для каждого сайта. Хранит только строки, поэтому массив превращают в текст: **JSON.stringify(cart)**, а обратно — **JSON.parse(text)**. Запись: localStorage.setItem(\"cart\", JSON.stringify(cart)); чтение: const raw = localStorage.getItem(\"cart\") — null, если ничего нет. Чтение оборачивай в **try … catch**: повреждённая строка или приватный режим не должны ломать магазин — тогда cart = []. Проверяй, что прочитанное — массив: Array.isArray. Сохраняй после каждого изменения — внутри renderCart или в отдельной saveCart(). Ключ называй с префиксом: \"vitrina-cart\", чтобы не пересечься с другими скриптами. Удалить: localStorage.removeItem(\"vitrina-cart\"). Посмотреть: DevTools → Application → Local Storage.",
        "ex": [
          [
            "const CART_KEY = \"vitrina-cart\";\n\nfunction saveCart() {\n  try {\n    localStorage.setItem(CART_KEY, JSON.stringify(cart));\n  } catch (e) {\n    console.warn(\"Не удалось сохранить корзину\", e);\n  }\n}",
            "stringify делает из массива строку; try/catch на случай заполненного или недоступного хранилища"
          ],
          [
            "function loadCart() {\n  try {\n    const raw = localStorage.getItem(CART_KEY);\n    const data = raw ? JSON.parse(raw) : [];\n    return Array.isArray(data) ? data : [];\n  } catch (e) {\n    return [];\n  }\n}\n\ncart = loadCart();\nrenderCart();",
            "при загрузке страницы корзина восстанавливается; что угодно сломанное → пустая корзина, без ошибок"
          ],
          [
            "function renderCart() {\n  saveCart();\n  // …дальше как раньше\n}",
            "одна строка в начале renderCart — и каждое изменение сохранено"
          ],
          [
            "1. Напиши saveCart и loadCart, вызови loadCart при старте.\n2. Добавь товары, перезагрузи страницу — корзина на месте.\n3. В DevTools → Application → Local Storage найди ключ и посмотри JSON.\n4. Испорти значение руками (сотри скобку) и перезагрузи — корзина должна стать пустой, а не упасть.\n5. Открой сайт в приватном окне — убедись, что ошибок нет.",
            "Задание на Маке. Сохранение в «Ростке» устроено точно так же; загляни в его код, если интересно."
          ],
          [
            "Без образца: сохраняй также state фильтров (урок 27) под отдельным ключом и восстанавливай при загрузке; товары, которых больше нет в products, из корзины выбрасывай при loadCart.",
            "Самостоятельно. Критерий: фильтры переживают перезагрузку; удалённый из products товар не ломает корзину."
          ],
          [
            "Вот мои saveCart/loadCart:\n[вставь]\nПроверь: try/catch на чтение и запись, Array.isArray, префикс в ключе, вызов save после каждого изменения. Не переписывай.",
            "localStorage хранит максимум около 5 МБ и только строки — для корзины достаточно, для фото нет."
          ]
        ],
        "tip": "Готово, когда: корзина переживает перезагрузку, повреждённые данные дают пустую корзину без ошибок, ключ с префиксом, сохранение идёт после каждого изменения, приватный режим не ломает сайт."
      },
      "ex": [
        {
          "k": "choice",
          "q": "localStorage хранит",
          "options": [
            "только строки",
            "любые объекты",
            "только числа",
            "файлы"
          ]
        },
        {
          "k": "input",
          "q": "Функция, которая превращает массив в строку JSON (без скобок)",
          "a": [
            "JSON.stringify"
          ]
        },
        {
          "k": "choice",
          "q": "getItem вернул null. Это значит",
          "options": [
            "Такого ключа нет",
            "Хранилище сломано",
            "Корзина пуста, но ключ есть",
            "Ошибка JSON"
          ]
        },
        {
          "k": "choice",
          "q": "Зачем try … catch вокруг JSON.parse?",
          "options": [
            "Повреждённая строка не должна уронить сайт",
            "Чтобы ускорить чтение",
            "Это требование браузера",
            "Чтобы данные не удалялись"
          ]
        },
        {
          "k": "choice",
          "q": "Где в DevTools смотреть localStorage?",
          "options": [
            "Application → Local Storage",
            "Elements",
            "Network",
            "Console → Storage"
          ]
        }
      ]
    },
    {
      "id": "vitrina-30",
      "t": "Проект 2: каталог с корзиной",
      "plan": "60 минут: каталог строится из данных, поиск, фильтры и рабочая корзина с итогом переживают перезагрузку; проверены крайние случаи.",
      "theory": {
        "rule": "Проект собирает уроки 16–29. **Чек-лист:** 1) products — массив объектов с одинаковыми ключами (id, name, price, image, stock, category); 2) каталог рисует renderCatalog, в HTML разметки карточек нет; 3) поиск, категория, сортировка работают вместе через state; 4) корзина: добавить, +, −, удалить, итог, счётчик в шапке, ограничение по остатку; 5) корзина и фильтры сохраняются; 6) **крайние случаи**: пустой каталог, «ничего не найдено», товар с stock 0, повреждённый localStorage, приватный режим, удалённый товар в сохранённой корзине; 7) Console чистая на всех сценариях; 8) цены везде через formatPrice; 9) textContent для всего, что вводит пользователь; 10) два человека попробовали купить и ничего не сломали. Что не входит: оформление заказа и сервер — модуль 5.",
        "ex": [
          [
            "Чек-лист проекта 2:\n[ ] products с одинаковыми ключами и id\n[ ] каталог из renderCatalog, без карточек в HTML\n[ ] поиск + категория + сортировка через state\n[ ] корзина: + − × итог, счётчик, лимит по stock\n[ ] localStorage для корзины и фильтров\n[ ] крайние случаи: пусто, не найдено, stock 0, битый JSON, приватный режим\n[ ] Console без ошибок\n[ ] formatPrice везде, textContent для ввода\n[ ] 2 человека попробовали купить",
            "скопируй в заметки; отмечай по ходу"
          ],
          [
            "Сценарий проверки:\n1. Открыть сайт → каталог полный.\n2. Ввести «кру» → один товар; стереть → все.\n3. Категория + «дешевле» → порядок верный.\n4. Добавить 3 кружки, 1 вазу → итог = 3×цена + цена.\n5. Убавить кружки до 0 → строка исчезла.\n6. Перезагрузить → корзина та же.\n7. DevTools → удалить ключ → корзина пуста без ошибок.",
            "семь шагов, которые ты проходишь руками перед сдачей; в модуле 4 это станет автотестом"
          ],
          [
            "// Проверка крайнего случая: товар удалили из products\nfunction loadCart() {\n  const data = /* …как в уроке 29… */;\n  return data.filter((item) => products.some((p) => p.id === item.id));\n}",
            "some — есть ли хоть один товар с таким id; чужие записи отбрасываются"
          ],
          [
            "1. Пройди чек-лист и сценарий проверки.\n2. На каждом шаге смотри Console.\n3. Поправь крайние случаи, которые упали.\n4. Дай двум людям задание «купи кружку и вазу» — смотри, куда они нажимают, не подсказывай.\n5. Запиши замечания и исправь главное за 20 минут.",
            "Задание на Маке. Если человек ищет кнопку дольше трёх секунд — это ошибка интерфейса, а не человека."
          ],
          [
            "Без образца: напиши в заметках три правила, которые ты вывел для себя про JavaScript за модуль (например, «одна функция — одно дело»), и один баг, который искал дольше всего, с причиной.",
            "Самостоятельно. Это итог модуля: собственные правила запоминаются лучше чужих."
          ],
          [
            "Вот мой app.js целиком:\n[вставь]\nСделай ревью как старший разработчик: 5 главных замечаний по убыванию важности (структура, имена, дублирование, безопасность innerHTML, крайние случаи). Не переписывай код.",
            "Ревью — чтобы понять, что улучшить в модуле 3, а не чтобы переделать всё сейчас."
          ]
        ],
        "tip": "Готово, когда: весь чек-лист отмечен, сценарий проверки проходит без ошибок в Console, два человека купили, замечания записаны. Модуль 2 закрыт — впереди Git и публикация."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Товар удалили из products, а в сохранённой корзине он остался. Что делать при loadCart?",
          "options": [
            "Отфильтровать записи, для которых нет товара в products",
            "Ничего: корзина сама разберётся",
            "Удалить localStorage целиком",
            "Добавить товар обратно"
          ]
        },
        {
          "k": "choice",
          "q": "Проверка «есть ли хоть один товар с таким id»",
          "options": [
            "products.some((p) => p.id === id)",
            "products.includes(id)",
            "products.has(id)",
            "products.find(id) === true"
          ]
        },
        {
          "k": "choice",
          "q": "Человек не находит кнопку «В корзину» три секунды. Это",
          "options": [
            "ошибка интерфейса — исправить",
            "ошибка человека",
            "нормально",
            "проблема телефона"
          ]
        },
        {
          "k": "input",
          "q": "Через что вставлять текст, который ввёл пользователь?",
          "a": [
            "textContent"
          ]
        },
        {
          "k": "choice",
          "q": "Что НЕ входит в проект 2?",
          "options": [
            "Оформление заказа и сервер",
            "Поиск",
            "Корзина",
            "localStorage"
          ],
          "explanation": "Заказы и сервер — модуль 5."
        }
      ]
    },
    {
      "id": "vitrina-x5",
      "exam": true,
      "t": "Экзамен: JavaScript, уроки 22–30",
      "covers": [
        "vitrina-22",
        "vitrina-23",
        "vitrina-24",
        "vitrina-25",
        "vitrina-26",
        "vitrina-27",
        "vitrina-28",
        "vitrina-29",
        "vitrina-30"
      ],
      "pass": 0.8,
      "q": [
        {
          "k": "choice",
          "s": "vitrina-22",
          "q": "Перебрать массив без индекса",
          "options": [
            "for (const p of products)",
            "for (p in products)",
            "while (products)",
            "each (products)"
          ]
        },
        {
          "k": "input",
          "s": "vitrina-22",
          "q": "Ключевое слово, которое прерывает цикл",
          "a": [
            "break"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-23",
          "q": "Функция, которая возвращает цену со скидкой",
          "options": [
            "function withDiscount(p, d) { return Math.round(p * (1 - d / 100)); }",
            "function withDiscount(p, d) { Math.round(p * (1 - d / 100)); }",
            "withDiscount(p, d) => p - d",
            "function withDiscount { return p * d; }"
          ]
        },
        {
          "k": "input",
          "s": "vitrina-23",
          "q": "Что вернёт функция, в которой нет return?",
          "a": [
            "undefined"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-24",
          "q": "Вставить HTML-строку из своих данных в элемент",
          "options": [
            "el.innerHTML = `…`",
            "el.textContent = `…`",
            "el.html(`…`)",
            "el = `…`"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-24",
          "q": "Привязать id товара к карточке",
          "options": [
            "card.dataset.id = product.id",
            "card.id = product",
            "card.data = id",
            "card.setId(product.id)"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-25",
          "q": "Найти ближайшего родителя с классом card",
          "options": [
            "event.target.closest(\".card\")",
            "event.target.parent(\".card\")",
            "event.closest(\"card\")",
            "document.closest(\".card\")"
          ]
        },
        {
          "k": "input",
          "s": "vitrina-25",
          "q": "Метод события, который отменяет перезагрузку страницы при submit (без скобок)",
          "a": [
            "preventDefault"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-26",
          "q": "Товары с названием, содержащим query",
          "options": [
            "products.filter((p) => p.name.toLowerCase().includes(query))",
            "products.find(query)",
            "products.includes(query)",
            "products.search(query)"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-26",
          "q": "Результат поиска пуст. Показать",
          "options": [
            "сообщение «Ничего не найдено»",
            "пустой экран",
            "все товары",
            "ошибку в консоли"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-27",
          "q": "Сортировка «дороже»",
          "options": [
            "[...items].sort((a, b) => b.price - a.price)",
            "items.sort((a, b) => a.price - b.price)",
            "items.reverse()",
            "items.sort(\"desc\")"
          ]
        },
        {
          "k": "input",
          "s": "vitrina-27",
          "q": "Объект, где хранятся все текущие условия поиска, фильтров и сортировки (имя из урока)",
          "a": [
            "state"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-28",
          "q": "В корзине хранить",
          "options": [
            "id и qty",
            "name и price",
            "весь объект товара",
            "строку с описанием"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-28",
          "q": "Увеличить количество, если запись уже есть",
          "options": [
            "item.qty += 1",
            "cart.push(item)",
            "item.qty = 1",
            "cart.qty++"
          ]
        },
        {
          "k": "input",
          "s": "vitrina-29",
          "q": "Функция, которая превращает строку JSON обратно в массив (без скобок)",
          "a": [
            "JSON.parse"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-29",
          "q": "Повреждённые данные в localStorage. Корзина должна",
          "options": [
            "стать пустой без ошибок",
            "уронить сайт",
            "показать JSON",
            "перезагрузить страницу"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-30",
          "q": "«Крайний случай» — это",
          "options": [
            "пустой каталог, битый JSON, товар без остатка",
            "самый дорогой товар",
            "ошибка в CSS",
            "медленный интернет"
          ]
        },
        {
          "k": "order",
          "s": "vitrina-30",
          "q": "Порядок работы с данными в каталоге",
          "words": [
            "products",
            "filter",
            "sort",
            "render"
          ],
          "a": "products filter sort render"
        }
      ]
    },
    {
      "id": "vitrina-31",
      "t": "Что такое Git",
      "plan": "30 минут: папка витрины под контролем Git, сделан первый коммит, ты понимаешь, зачем история изменений и как вернуться назад.",
      "theory": {
        "rule": "**Git** — история изменений папки. Ты делаешь **коммит** — снимок всех файлов с подписью «что сделал». К любому коммиту можно вернуться, видно, что менялось и когда. Папка с историей — **репозиторий**. Команды в Терминале из папки vitrina: git init — включить историю; git status — что изменилось; git add . — отметить все изменения для снимка; git commit -m \"Сообщение\" — сделать снимок; git log --oneline — список снимков. Сообщение — по-русски, глаголом в прошедшем или инфинитивом, коротко: «Добавил страницы товаров». Файлы, которым не место в истории (служебные .DS_Store, черновики), перечисляют в .gitignore. Первый раз Git попросит имя и почту: git config --global user.name и user.email — они попадут в подписи коммитов.",
        "ex": [
          [
            "cd ~/vitrina\ngit init\ngit status",
            "init создаёт скрытую папку .git — там живёт история; status показывает, что ещё не сохранено"
          ],
          [
            "git add .\ngit commit -m \"Витрина: каталог, страницы товаров, корзина\"\ngit log --oneline",
            "add отмечает файлы, commit делает снимок, log показывает список снимков с короткими номерами"
          ],
          [
            ".DS_Store\n*.log\nnode_modules/",
            "содержимое .gitignore: системный мусор macOS и служебные папки в историю не попадают"
          ],
          [
            "1. Открой Терминал, перейди в папку vitrina (cd и перетащи папку в окно).\n2. git config --global user.name \"Имя\" и user.email \"почта\" — один раз.\n3. git init, git status.\n4. Создай .gitignore с .DS_Store.\n5. git add . и первый коммит.\n6. Измени цену в products, git status — увидишь изменённый файл; сделай второй коммит.",
            "Задание на Маке. Если Терминал пишет «git: command not found» — установи Command Line Tools: xcode-select --install."
          ],
          [
            "Без образца: сделай три коммита за три маленьких правки и посмотри разницу между двумя последними: git diff HEAD~1.",
            "Самостоятельно. Критерий: в git log три осмысленных сообщения, diff показывает именно твои строки."
          ],
          [
            "Вот мой git log:\n[вставь]\nОцени сообщения коммитов: понятно ли через месяц, что менялось? Предложи, как переформулировать два худших. Не трогай файлы.",
            "Хорошее сообщение отвечает на вопрос «что изменилось и зачем», а не «поправил»."
          ]
        ],
        "tip": "Готово, когда: в папке vitrina есть .git, .gitignore, не меньше трёх коммитов с понятными сообщениями, git status чистый, и ты можешь объяснить, что такое коммит."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Коммит — это",
          "options": [
            "снимок файлов с подписью, к которому можно вернуться",
            "копия папки на флешке",
            "публикация сайта",
            "файл стилей"
          ]
        },
        {
          "k": "input",
          "q": "Команда, которая показывает, какие файлы изменились (две слова через пробел)",
          "a": [
            "git status"
          ]
        },
        {
          "k": "choice",
          "q": "Порядок первого сохранения",
          "options": [
            "git init → git add . → git commit -m \"…\"",
            "git commit → git add → git init",
            "git push → git init",
            "git add → git init → git commit"
          ]
        },
        {
          "k": "choice",
          "q": "Зачем .gitignore?",
          "options": [
            "Чтобы служебные файлы не попадали в историю",
            "Чтобы ускорить сайт",
            "Чтобы спрятать сайт от поиска",
            "Без него git init не работает"
          ]
        },
        {
          "k": "choice",
          "q": "Хорошее сообщение коммита",
          "options": [
            "Добавил страницы товаров и ссылки на них",
            "поправил",
            "123",
            "коммит"
          ]
        }
      ]
    },
    {
      "id": "vitrina-32",
      "t": "GitHub: репозиторий и коммиты",
      "plan": "40 минут: код витрины лежит на GitHub, каждая правка отправляется командой push; ты различаешь локальный репозиторий и удалённый.",
      "theory": {
        "rule": "**GitHub** — сайт, где хранятся репозитории. Локальная история остаётся на Маке, копия — на GitHub: так код не потеряется и его можно опубликовать. Порядок: на github.com → New repository → имя латиницей (vitrina), Public, без README (у тебя уже есть файлы). Потом в Терминале: git remote add origin https://github.com/ИМЯ/vitrina.git — связать; git branch -M main — назвать основную ветку; git push -u origin main — отправить. Дальше после каждого коммита просто git push. При первом push GitHub попросит войти: пароль не подходит — нужен **personal access token** (Settings → Developer settings → Tokens) или приложение **GitHub Desktop**, где всё то же делается кнопками. **Никогда** не клади в репозиторий пароли, токены, ключи платёжных систем — Public видят все, а из истории удалить трудно.",
        "ex": [
          [
            "git remote add origin https://github.com/ИМЯ/vitrina.git\ngit branch -M main\ngit push -u origin main",
            "три команды один раз; потом только git push"
          ],
          [
            "git add .\ngit commit -m \"Добавил сортировку каталога\"\ngit push",
            "обычный цикл: изменил — закоммитил — отправил"
          ],
          [
            "git pull",
            "забрать изменения с GitHub, если правил с другого компьютера или через сайт"
          ],
          [
            "1. Создай репозиторий vitrina на github.com.\n2. Свяжи папку с ним и сделай первый push.\n3. Открой репозиторий в браузере — файлы на месте.\n4. Сделай правку, коммит, push — обнови страницу на GitHub, появился новый коммит.\n5. Открой вкладку Commits — увидишь всю историю с Мака.",
            "Задание на Маке. push отклонён с «authentication failed» — пароль не подходит, нужен токен или GitHub Desktop."
          ],
          [
            "Без образца: установи GitHub Desktop, открой в нём папку vitrina и сделай коммит с push кнопками; сравни с Терминалом и выбери, что удобнее.",
            "Самостоятельно. Критерий: коммит из Desktop виден на GitHub, история не раздвоилась."
          ],
          [
            "Вот список файлов в моём репозитории:\n[вставь]\nЕсть ли там что-то, чего не должно быть на публичном GitHub: токены, пароли, личные данные, большие бинарники? Назови и объясни риск. Ничего не удаляй за меня.",
            "Проверка перед первым push важнее, чем после: из истории секрет уже не вычистить простым удалением."
          ]
        ],
        "tip": "Готово, когда: репозиторий vitrina на GitHub, push работает после каждого коммита, в репозитории нет секретов, ты понимаешь разницу между локальным репозиторием и GitHub."
      },
      "ex": [
        {
          "k": "choice",
          "q": "git push делает",
          "options": [
            "отправляет коммиты с Мака на GitHub",
            "сохраняет файлы на Маке",
            "публикует сайт",
            "удаляет историю"
          ]
        },
        {
          "k": "input",
          "q": "Команда, которая забирает изменения с GitHub на Мак (два слова)",
          "a": [
            "git pull"
          ]
        },
        {
          "k": "choice",
          "q": "При первом push GitHub не принимает пароль. Что нужно?",
          "options": [
            "Personal access token или GitHub Desktop",
            "Другой браузер",
            "Платный аккаунт",
            "Переустановить Git"
          ]
        },
        {
          "k": "choice",
          "q": "Что нельзя класть в публичный репозиторий?",
          "options": [
            "Пароли, токены, ключи платёжных систем",
            "index.html",
            "styles.css",
            "фото товаров"
          ]
        },
        {
          "k": "choice",
          "q": "Порядок связывания папки с GitHub",
          "options": [
            "remote add → branch -M main → push -u",
            "push → remote add → init",
            "clone → push → commit",
            "pull → push → remote"
          ]
        }
      ]
    },
    {
      "id": "vitrina-33",
      "t": "GitHub Pages: витрина в интернете",
      "plan": "35 минут: витрина открывается по ссылке с любого телефона; ты знаешь, где включается публикация и почему пути должны быть относительными.",
      "theory": {
        "rule": "**GitHub Pages** — бесплатная публикация статических сайтов (HTML, CSS, JavaScript) прямо из репозитория. Включение: репозиторий → Settings → Pages → Source: Deploy from a branch → ветка main, папка / (root) → Save. Через 1–3 минуты сайт доступен по адресу https://ИМЯ.github.io/vitrina/ — в корне обязателен index.html. HTTPS включается сам. Пути в коде должны быть **относительными** (img/cup.jpg, products/cup.html, ../styles.css), не начинаться с / — на Pages сайт лежит не в корне домена, а в папке /vitrina/, и абсолютные пути сломаются. Имена файлов на сервере различают регистр: Cup.jpg и cup.jpg — разные. Что Pages не умеет: сервер, база данных, приём заказов — это модуль 5 и другой хостинг. Свой домен подключается там же, в Pages → Custom domain.",
        "ex": [
          [
            "Settings → Pages → Build and deployment\nSource: Deploy from a branch\nBranch: main   /(root)   Save",
            "единственная настройка; адрес появится на той же странице после сборки"
          ],
          [
            "https://ИМЯ.github.io/vitrina/\nhttps://ИМЯ.github.io/vitrina/products/cup.html",
            "адрес сайта и адрес страницы товара — папки повторяют структуру репозитория"
          ],
          [
            "<img src=\"img/cup.jpg\">          ✓ относительный\n<img src=\"/img/cup.jpg\">         ✗ сломается в /vitrina/\n<link href=\"../styles.css\">     ✓ из подпапки",
            "относительные пути работают и на Маке, и на Pages, и после переноса"
          ],
          [
            "1. Включи Pages в Settings репозитория.\n2. Подожди сборку, открой адрес на Маке и на телефоне.\n3. Пройди по страницам товаров и проверь фото — Network без 404.\n4. Если что-то не грузится — проверь регистр в именах файлов и пути со /.\n5. Отправь ссылку другу — пусть откроет с телефона.",
            "Задание на Маке. Сайт показывает 404 — проверь, что index.html лежит в корне репозитория, а не в подпапке."
          ],
          [
            "Без образца: добавь в репозиторий README.md с описанием магазина и ссылкой на сайт; GitHub покажет его на главной странице репозитория.",
            "Самостоятельно. Критерий: README виден на GitHub, ссылка в нём открывает витрину."
          ],
          [
            "Вот адрес моей витрины:\n[вставь]\nи список файлов. Какие пути в коде сломаются на GitHub Pages, если я переименую репозиторий? Объясни, не исправляй.",
            "Абсолютные пути привязаны к адресу; относительные переживут любой переезд."
          ]
        ],
        "tip": "Готово, когда: витрина открывается по https://ИМЯ.github.io/vitrina/ с телефона, все страницы и фото грузятся, пути относительные, README есть."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Где включается GitHub Pages?",
          "options": [
            "Settings → Pages → Deploy from a branch → main / root",
            "В index.html",
            "В git push",
            "В .gitignore"
          ]
        },
        {
          "k": "choice",
          "q": "Адрес сайта после публикации",
          "options": [
            "https://ИМЯ.github.io/vitrina/",
            "https://github.com/ИМЯ/vitrina",
            "https://vitrina.github.io/ИМЯ",
            "https://pages.github.com/vitrina"
          ]
        },
        {
          "k": "choice",
          "q": "Почему src=\"/img/cup.jpg\" сломается на Pages?",
          "options": [
            "Сайт лежит в папке /vitrina/, а путь с / ведёт в корень домена",
            "Pages не поддерживает картинки",
            "Нужен формат webp",
            "Слэш запрещён в HTML"
          ]
        },
        {
          "k": "input",
          "q": "Какой файл обязан лежать в корне, чтобы сайт открылся?",
          "a": [
            "index.html"
          ]
        },
        {
          "k": "choice",
          "q": "Что GitHub Pages НЕ умеет?",
          "options": [
            "Принимать заказы и хранить базу данных",
            "Показывать HTML",
            "Включать HTTPS",
            "Отдавать картинки"
          ]
        }
      ]
    },
    {
      "id": "vitrina-34",
      "t": "Обновления и кеш: ?v=N",
      "plan": "25 минут: после каждой публикации покупатели видят новую версию сразу; ты понимаешь, почему браузер показывает старое, и умеешь это обходить.",
      "theory": {
        "rule": "Браузер **кеширует** файлы — хранит копию styles.css и app.js и не скачивает заново, чтобы было быстрее. После публикации правки пользователь может видеть старую версию часами. Проверенный приём: добавить к файлу **номер версии** в адресе — styles.css?v=2, app.js?v=2. Браузер считает это новым адресом и скачивает заново. Правило выпуска: изменил css или js → подними ?v= во всех местах в index.html и на страницах товаров → коммит с сообщением «v2: …» → push. У себя проверять: Shift+Обновить (жёсткая перезагрузка) или DevTools → Network → Disable cache. Картинкам версия не нужна, пока не меняешь файл с тем же именем. «Росток» устроен так же: ?v=N у app.js, courses.js и в кеше офлайн-режима.",
        "ex": [
          [
            "<link rel=\"stylesheet\" href=\"styles.css?v=3\">\n<script src=\"app.js?v=3\"></script>",
            "одна и та же цифра у всех подключаемых файлов; при выпуске меняется на 4"
          ],
          [
            "git add .\ngit commit -m \"v4: исправил сортировку и цвета кнопок\"\ngit push",
            "номер версии в сообщении коммита — потом легко найти, что вошло в какой выпуск"
          ],
          [
            "Проверка без кеша на Маке:\nShift + кнопка «Обновить» в Chrome\nили DevTools → Network → Disable cache",
            "так ты видишь новую версию сразу; покупатели получат её благодаря ?v="
          ],
          [
            "1. Добавь ?v=1 к styles.css и app.js на всех страницах.\n2. Поменяй цвет кнопок, подними до ?v=2, коммит, push.\n3. Открой сайт на телефоне без жёсткой перезагрузки — новый цвет виден.\n4. Сделай правку без поднятия версии и проверь на телефоне — скорее всего, увидишь старую.\n5. Исправь: ?v=3, push.",
            "Задание на Маке. Забыл поднять версию на одной из страниц товаров — там останется старый CSS; поиск по проекту «?v=» спасает."
          ],
          [
            "Без образца: напиши себе чек-лист выпуска из пяти пунктов и положи в README (раздел «Как выпускать версию»).",
            "Самостоятельно. Критерий: по чек-листу выпуск делается без вопросов; «Росток» в HANDOFF.md хранит такой же."
          ],
          [
            "Вот мой index.html и страница товара:\n[вставь]\nНайди подключения css и js без ?v= или с разными номерами. Перечисли, не исправляй.",
            "Разные номера на разных страницах — самая частая ошибка; проверяй поиском по проекту."
          ]
        ],
        "tip": "Готово, когда: у всех css и js стоит ?v=N, одинаковый на всех страницах, в README есть чек-лист выпуска, и правка видна на телефоне сразу после push."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Почему после push телефон показывает старую версию?",
          "options": [
            "Браузер взял styles.css и app.js из кеша",
            "GitHub не сохранил файлы",
            "Телефон не поддерживает CSS",
            "Нужно платить за обновления"
          ]
        },
        {
          "k": "input",
          "q": "Что добавить к адресу файла, чтобы браузер скачал его заново (например, к styles.css)? Напиши только добавку для версии 2",
          "a": [
            "?v=2"
          ]
        },
        {
          "k": "choice",
          "q": "Где менять ?v= при выпуске?",
          "options": [
            "Во всех HTML-файлах, где подключены css и js",
            "Только в index.html",
            "Только в app.js",
            "В .gitignore"
          ]
        },
        {
          "k": "choice",
          "q": "Жёсткая перезагрузка в Chrome на Маке",
          "options": [
            "Shift + Обновить",
            "Обычное обновление",
            "Закрыть вкладку",
            "Очистить историю посещений"
          ]
        },
        {
          "k": "choice",
          "q": "Нужна ли версия картинкам?",
          "options": [
            "Нет, пока не меняешь файл с тем же именем",
            "Да, всегда",
            "Только png",
            "Только на телефоне"
          ]
        }
      ]
    },
    {
      "id": "vitrina-35",
      "t": "Проект 3: витрина опубликована",
      "plan": "45 минут: ссылка на витрину работает с любого телефона, README описывает проект и порядок выпуска, собраны первые отзывы о дизайне и записан план доработок.",
      "theory": {
        "rule": "Проект закрывает модуль 3. **Чек-лист:** 1) репозиторий vitrina на GitHub, история из осмысленных коммитов, секретов нет; 2) Pages включён, адрес открывается с телефона по HTTPS, все страницы и фото грузятся; 3) пути относительные, регистр имён совпадает; 4) ?v=N на всех страницах, чек-лист выпуска в README; 5) README: что за магазин, ссылка, как запустить локально, как выпускать; 6) ссылка отправлена трём людям, записаны отзывы о дизайне и удобстве; 7) список доработок заведён в Issues репозитория — по одной задаче на issue. Что дальше: модуль 4 — работа с ИИ над этим списком, модуль 5 — заказы и сервер.",
        "ex": [
          [
            "Чек-лист проекта 3:\n[ ] репозиторий, коммиты, нет секретов\n[ ] Pages, HTTPS, открывается с телефона\n[ ] пути относительные, регистр совпадает\n[ ] ?v=N везде, чек-лист выпуска в README\n[ ] README: описание, ссылка, запуск, выпуск\n[ ] 3 отзыва записаны\n[ ] доработки в Issues",
            "скопируй в заметки"
          ],
          [
            "# Моя витрина\n\nМагазин керамики ручной работы. Сайт: https://ИМЯ.github.io/vitrina/\n\n## Запуск локально\npython3 -m http.server 8000 в папке проекта\n\n## Как выпускать версию\n1. Поднять ?v= во всех HTML\n2. git add . && git commit -m \"vN: что сделано\"\n3. git push, подождать 1–3 минуты\n4. Проверить на телефоне",
            "README в Markdown: заголовки через #, списки через цифры; GitHub покажет его красиво"
          ],
          [
            "Issues → New issue\nЗаголовок: «Кнопка „В корзину“ сливается с фоном на телефоне»\nТекст: где, как воспроизвести, что ожидал",
            "одна задача — один issue; потом их можно закрывать коммитами"
          ],
          [
            "1. Пройди чек-лист.\n2. Напиши README.\n3. Отправь ссылку трём людям с просьбой «найди товар и положи в корзину с телефона».\n4. Запиши отзывы, заведи по issue на каждую доработку.\n5. Выбери три issue для модуля 4.",
            "Задание на Маке. Отзывы записывай дословно, оценивать будешь потом."
          ],
          [
            "Без образца: сделай один issue до конца — правка, коммит с «Closes #1» в сообщении, push — и посмотри, как GitHub закрыл задачу сам.",
            "Самостоятельно. Критерий: issue закрыт автоматически, коммит виден в его истории."
          ],
          [
            "Вот три отзыва о моей витрине:\n[вставь]\nРазбери каждый: это про удобство, дизайн или ошибку? Что стоит делать первым и почему? Не предлагай переделать всё.",
            "Отзывы противоречат друг другу — это нормально; решение за тобой."
          ]
        ],
        "tip": "Готово, когда: витрина в интернете, README полный, три отзыва записаны, доработки в Issues, один issue закрыт коммитом. Модуль 3 закрыт."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Зачем README?",
          "options": [
            "Чтобы ты и другие поняли, что это, как запустить и выпустить",
            "Без него Pages не работает",
            "Для красоты",
            "Это требование Git"
          ]
        },
        {
          "k": "choice",
          "q": "Где вести список доработок?",
          "options": [
            "Issues репозитория, одна задача — один issue",
            "В заметках телефона",
            "В комментариях в коде",
            "В названии репозитория"
          ]
        },
        {
          "k": "input",
          "q": "Слово в сообщении коммита, после которого номер issue, чтобы GitHub закрыл задачу сам",
          "a": [
            "Closes",
            "closes",
            "Fixes",
            "fixes"
          ]
        },
        {
          "k": "choice",
          "q": "Просьба к тестировщику",
          "options": [
            "Найди товар и положи в корзину с телефона",
            "Посмотри сайт",
            "Скажи, нравится ли",
            "Проверь код"
          ]
        },
        {
          "k": "choice",
          "q": "Отзывы противоречат друг другу. Что делать?",
          "options": [
            "Записать все, решить самому, что важнее для магазина",
            "Сделать всё",
            "Не делать ничего",
            "Удалить сайт"
          ]
        }
      ]
    },
    {
      "id": "vitrina-x6",
      "exam": true,
      "t": "Экзамен: Git и публикация",
      "covers": [
        "vitrina-31",
        "vitrina-32",
        "vitrina-33",
        "vitrina-34",
        "vitrina-35"
      ],
      "pass": 0.8,
      "q": [
        {
          "k": "choice",
          "s": "vitrina-31",
          "q": "Снимок файлов с подписью в Git",
          "options": [
            "коммит",
            "push",
            "репозиторий",
            "ветка"
          ]
        },
        {
          "k": "input",
          "s": "vitrina-31",
          "q": "Команда, которая включает историю в папке (два слова)",
          "a": [
            "git init"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-32",
          "q": "Отправить коммиты на GitHub",
          "options": [
            "git push",
            "git pull",
            "git commit",
            "git init"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-32",
          "q": "Токен платёжной системы случайно закоммичен в публичный репозиторий",
          "options": [
            "Отозвать токен у платёжной системы и выпустить новый",
            "Удалить файл следующим коммитом — этого достаточно",
            "Ничего страшного",
            "Переименовать файл"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-33",
          "q": "Путь, который сломается на GitHub Pages",
          "options": [
            "/img/cup.jpg",
            "img/cup.jpg",
            "../img/cup.jpg",
            "products/cup.html"
          ]
        },
        {
          "k": "input",
          "s": "vitrina-33",
          "q": "В Settings → Pages источник — ветка main и папка «/ (…)». Напиши слово в скобках латиницей",
          "a": [
            "root"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-34",
          "q": "Правка не видна на телефоне после push",
          "options": [
            "Не поднят ?v= у css/js",
            "GitHub удалил файл",
            "Телефон не поддерживает сайт",
            "Нужен платный хостинг"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-34",
          "q": "Сообщение коммита при выпуске",
          "options": [
            "v5: добавил фильтр по цене",
            "правки",
            "update",
            "new version"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-35",
          "q": "Одна доработка — это",
          "options": [
            "один issue",
            "один коммит без описания",
            "одна ветка",
            "одно письмо"
          ]
        },
        {
          "k": "order",
          "s": "vitrina-35",
          "q": "Порядок выпуска версии",
          "words": [
            "?v=",
            "commit",
            "push",
            "телефон"
          ],
          "a": "?v= commit push телефон"
        }
      ]
    },
    {
      "id": "vitrina-36",
      "t": "Как ставить задачу ИИ",
      "plan": "35 минут: запрос к ИИ содержит контекст, цель, ограничения и критерий готовности; ответ приходит с первого раза и его можно проверить.",
      "theory": {
        "rule": "Хороший запрос — как задание подрядчику. **Контекст:** что за проект, какой стек (HTML, CSS, JavaScript без библиотек), какой файл и фрагмент кода. **Цель:** одно конкретное изменение, не «сделай лучше». **Ограничения:** не менять другие части, не добавлять библиотеки, сохранить имена функций, объяснять по-русски. **Критерий готовности:** как ты проверишь результат. Прикладывай сам код, а не описание кода. Проси одно изменение за раз и объяснение — что и почему изменено. Если ответ большой — проси разбить на шаги. Плохой запрос: «почини корзину». Хороший: «В функции changeQty при qty 0 запись не удаляется. Вот код: … Найди причину, предложи исправление в одном месте, объясни».",
        "ex": [
          [
            "Контекст: витрина на чистом HTML/CSS/JS, файл app.js.\nЦель: при вводе в поле поиска показывать «Найдено: N» над каталогом.\nОграничения: не менять search и renderCatalog, без библиотек.\nКритерий: ввожу «кру» — вижу «Найдено: 1», очищаю — «Найдено: 4».\nКод:\n[вставь applyFilters и HTML над каталогом]",
            "четыре части запроса плюс код; ИИ не гадает, что у тебя есть"
          ],
          [
            "Объясни, что ты изменил и почему, по строкам. Не переписывай функции, которые я не просил трогать.",
            "вторая половина запроса — рамки: без неё ИИ «улучшит» всё подряд"
          ],
          [
            "Сделай только шаг 1 из плана. Покажи diff: что было, что стало.",
            "большая задача — по шагам; diff проще проверить, чем новый файл целиком"
          ],
          [
            "1. Возьми один issue из проекта 3 и напиши к нему запрос по четырём частям.\n2. Отправь Claude, получи ответ.\n3. Проверь по критерию готовности.\n4. Перепиши запрос без контекста и критерия — сравни, насколько хуже ответ.\n5. Сохрани удачный запрос как шаблон в заметки.",
            "Задание на Маке. Ответ не подошёл — чаще виноват запрос: добавь код и критерий."
          ],
          [
            "Без образца: напиши шаблон запроса для правок CSS и шаблон для правок JavaScript; чем они отличаются?",
            "Самостоятельно. Критерий: по каждому шаблону Claude с первого раза даёт проверяемый ответ."
          ],
          [
            "Вот мой запрос к ИИ:\n[вставь]\nОцени его по четырём частям: контекст, цель, ограничения, критерий. Чего не хватает? Не выполняй сам запрос.",
            "Проверка запроса до отправки экономит больше времени, чем любая правка после."
          ]
        ],
        "tip": "Готово, когда: у тебя есть шаблон запроса из четырёх частей, один issue решён через ИИ и проверен по критерию, ты видишь разницу между «почини» и конкретной задачей."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Четыре части хорошего запроса",
          "options": [
            "контекст, цель, ограничения, критерий готовности",
            "вежливость, длина, смайлы, срочность",
            "код, код, код, код",
            "цель и всё"
          ]
        },
        {
          "k": "choice",
          "q": "Лучший запрос",
          "options": [
            "«В changeQty при qty 0 запись не удаляется. Вот код: … Найди причину и исправь в одном месте»",
            "«почини корзину»",
            "«сделай сайт лучше»",
            "«напиши магазин»"
          ]
        },
        {
          "k": "input",
          "q": "Что прикладывать к запросу вместо описания кода?",
          "a": [
            "код",
            "сам код"
          ]
        },
        {
          "k": "choice",
          "q": "ИИ переписал функции, которые ты не просил трогать. Что было не так в запросе?",
          "options": [
            "Не было ограничений",
            "Слишком много кода",
            "Не было вежливости",
            "Запрос по-русски"
          ]
        },
        {
          "k": "choice",
          "q": "Большая задача. Как просить?",
          "options": [
            "По шагам, по одному изменению за раз",
            "Всё сразу одним сообщением",
            "Без кода, чтобы не путать",
            "Только голосом"
          ]
        }
      ]
    },
    {
      "id": "vitrina-37",
      "t": "Читать чужой код",
      "plan": "40 минут: ты пересказываешь по шагам, что делает код от ИИ, и только потом вставляешь его; незнакомые конструкции разбираешь до того, как они попали в проект.",
      "theory": {
        "rule": "Код от ИИ — чужой код: не вставляй, пока не можешь пересказать его своими словами. **Порядок чтения:** 1) что на входе и что на выходе; 2) имена функций и переменных — понятны ли; 3) каждая строка — «эта строка делает …»; 4) незнакомое слово (например, reduce, async, ??) — спроси ИИ объяснить на твоём примере; 5) есть ли внешние зависимости (библиотеки, другие функции), которых у тебя нет; 6) что будет при пустом массиве, null, нуле. Вставляй по частям и проверяй в консоли после каждой. Если проще написать самому, чем понять, — пиши сам: цель учёбы — твой код, а не рабочий. Код, который ты не можешь пересказать, в проект не попадает.",
        "ex": [
          [
            "const total = cart.reduce((sum, item) => sum + item.qty, 0);",
            "незнакомый reduce: «пройти по массиву, накапливая sum, начав с 0, прибавляя qty каждого». Если не можешь так пересказать — спроси или замени циклом"
          ],
          [
            "Объясни эту строку на примере массива cart = [{id:1, qty:2}, {id:2, qty:3}]: что будет в sum на каждом шаге?\n[вставь строку]",
            "запрос на объяснение незнакомой конструкции — с конкретными данными, чтобы ответ можно было проверить руками"
          ],
          [
            "Вход: массив items и query (строка).\nВыход: новый массив.\nШаги: 1) чистим query 2) пустой — вернуть всё 3) filter по includes.\nКрайние случаи: пустой items → []; query из пробелов → всё.",
            "пересказ функции search по шаблону вход — выход — шаги — крайние случаи"
          ],
          [
            "1. Возьми ответ ИИ из урока 36 и перескажи его код по шаблону.\n2. Выпиши незнакомые конструкции, спроси объяснение на своих данных.\n3. Вставь код по частям, проверяя консоль после каждой.\n4. Найди в ответе хотя бы одну строку, которая не нужна, — удали.\n5. Сравни: твой пересказ и объяснение ИИ совпали?",
            "Задание на Маке. Лишние строки в ответах ИИ — норма; удаляй то, что не можешь объяснить."
          ],
          [
            "Без образца: попроси ИИ написать функцию с reduce для суммы корзины, затем перепиши её сам циклом for…of без подсказок и проверь, что результаты равны.",
            "Самостоятельно. Критерий: обе версии дают одно число на трёх разных корзинах."
          ],
          [
            "Вот код, который мне предложили:\n[вставь]\nНе объясняй его сразу. Задай мне три вопроса, по которым видно, понял ли я его. После моих ответов скажи, где я ошибся.",
            "Проверка понимания вопросами — честнее, чем чтение объяснения."
          ]
        ],
        "tip": "Готово, когда: у каждого вставленного куска кода есть твой пересказ (вход, выход, шаги, крайние случаи), незнакомые конструкции разобраны на твоих данных, лишнее удалено."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Когда код от ИИ можно вставлять в проект?",
          "options": [
            "Когда ты можешь пересказать его своими словами",
            "Сразу, если нет ошибок",
            "Когда ИИ сказал, что он правильный",
            "Никогда"
          ]
        },
        {
          "k": "choice",
          "q": "Незнакомая конструкция в коде. Что делать?",
          "options": [
            "Спросить объяснение на своих данных или заменить понятной",
            "Вставить, раз работает",
            "Удалить весь ответ",
            "Пропустить урок"
          ]
        },
        {
          "k": "input",
          "q": "Шаблон пересказа: вход, выход, шаги и … (крайние что?)",
          "a": [
            "случаи",
            "крайние случаи"
          ]
        },
        {
          "k": "choice",
          "q": "Вставлять код",
          "options": [
            "по частям, проверяя консоль после каждой",
            "целиком и сразу",
            "только в HTML",
            "в конец файла без проверки"
          ]
        },
        {
          "k": "choice",
          "q": "Понять код сложнее, чем написать самому. Что выбрать?",
          "options": [
            "Написать самому: цель — твой код",
            "Вставить и не думать",
            "Попросить ИИ объяснить ещё раз десять раз",
            "Отложить проект"
          ]
        }
      ]
    },
    {
      "id": "vitrina-38",
      "t": "Проверять результат: DevTools и консоль",
      "plan": "40 минут: ты находишь ошибку по сообщению в консоли, останавливаешь код в нужной строке и смотришь значения переменных; «работает» — значит проверено, а не сказано.",
      "theory": {
        "rule": "**Console:** красное сообщение = ошибка; читай текст и номер строки (app.js:42) — клик переносит в код. Частые: ReferenceError — имя не объявлено (опечатка), TypeError … of null/undefined — элемент или поле не найдены, SyntaxError — скобка или кавычка. **Sources:** открой app.js, кликни по номеру строки — **точка останова**; при выполнении код замрёт, справа видны переменные, кнопки «шаг» ведут по строкам. Слово debugger; в коде делает то же. **Elements:** живой DOM — проверь, создались ли карточки и какие классы. **Network:** 404 — файл не найден. **Application:** localStorage. Правило проверки: воспроизвести ошибку → понять причину → исправить → повторить сценарий → убедиться, что ничего рядом не сломалось. Утверждение ИИ «теперь работает» проверяется так же.",
        "ex": [
          [
            "Uncaught TypeError: Cannot read properties of undefined (reading 'price')\n    at getCartTotal (app.js:58)",
            "читаем: в строке 58 у чего-то нет поля price — скорее всего, products.find не нашёл товар по id; проверь типы id"
          ],
          [
            "function getCartTotal() {\n  let total = 0;\n  for (const item of cart) {\n    const product = products.find((p) => p.id === item.id);\n    debugger;\n    total += product.price * item.qty;\n  }\n  return total;\n}",
            "debugger остановит код на каждой записи корзины; справа увидишь item, product и поймёшь, где undefined"
          ],
          [
            "console.log(\"id из dataset:\", card.dataset.id, typeof card.dataset.id);\n// id из dataset: 2 string",
            "typeof показывает тип; строка «2» не равна числу 2 при ===, отсюда и undefined"
          ],
          [
            "1. Специально сломай getCartTotal (сравни id без Number) и прочитай ошибку в консоли.\n2. Поставь точку останова в Sources, пройди по шагам, найди undefined.\n3. Исправь, повтори сценарий: добавить, убавить, удалить.\n4. Проверь Elements: карточки, классы sold-out.\n5. Проверь Network после жёсткой перезагрузки: нет 404.",
            "Задание на Маке. Точка останова не срабатывает — код до этой строки не доходит: поставь раньше."
          ],
          [
            "Без образца: попроси ИИ исправить любой баг, а потом докажи себе, что исправление работает: воспроизведи сценарий до и после, запиши шаги.",
            "Самостоятельно. Критерий: записанный сценарий «до — ошибка, после — нет» из конкретных шагов."
          ],
          [
            "Вот ошибка из консоли и строка кода:\n[вставь]\nНазови вероятную причину и какой console.log или точку останова поставить, чтобы её подтвердить. Не исправляй.",
            "Сначала доказательство причины, потом исправление: иначе лечишь симптом."
          ]
        ],
        "tip": "Готово, когда: ты читаешь ошибки консоли с номером строки, умеешь остановить код в точке и посмотреть переменные, проверяешь каждую правку повторением сценария и не веришь слову «работает» без проверки."
      },
      "ex": [
        {
          "k": "choice",
          "q": "«Cannot read properties of undefined (reading 'price')»",
          "options": [
            "У объекта нет поля price: скорее всего, товар не найден",
            "Нет интернета",
            "CSS не подключён",
            "Браузер старый"
          ]
        },
        {
          "k": "input",
          "q": "Слово в коде, которое останавливает выполнение в DevTools",
          "a": [
            "debugger"
          ]
        },
        {
          "k": "choice",
          "q": "Где поставить точку останова мышью?",
          "options": [
            "Sources → клик по номеру строки",
            "Console → клик по ошибке",
            "Elements → клик по тегу",
            "Network → клик по файлу"
          ]
        },
        {
          "k": "choice",
          "q": "ИИ написал «теперь работает». Что делать?",
          "options": [
            "Повторить сценарий до и после самому",
            "Поверить",
            "Закоммитить",
            "Спросить ещё раз"
          ]
        },
        {
          "k": "choice",
          "q": "typeof card.dataset.id вернул \"string\". Что это объясняет?",
          "options": [
            "Почему === с числом даёт false и товар не находится",
            "Почему сайт медленный",
            "Почему нет стилей",
            "Ничего"
          ]
        }
      ]
    },
    {
      "id": "vitrina-39",
      "t": "Как ИИ ошибается",
      "plan": "30 минут: ты узнаёшь выдуманные функции, устаревшие советы и уверенные ошибки, проверяешь по документации и тестом, а не на слово.",
      "theory": {
        "rule": "ИИ ошибается уверенно. **Типичные ошибки:** 1) **выдуманные функции и свойства** — array.contains(), element.setText() не существуют; 2) **устаревшие советы** — var вместо const/let, document.write, jQuery для простой задачи; 3) **чужой стек** — код для React или Node там, где у тебя чистый браузер; 4) **уверенность без проверки** — «это точно работает» о коде, который никто не запускал; 5) **потеря контекста** в длинном разговоре — забыл твои ограничения. **Как проверять:** незнакомое имя — поиск на MDN (developer.mozilla.org); «работает» — запуск в консоли; совет — спроси «на чём основано, есть ли более современный способ»; длинный диалог — повтори ограничения. ИИ — быстрый помощник, который иногда уверенно врёт; последнее слово за DevTools.",
        "ex": [
          [
            "// ИИ предложил:\nif (names.contains(\"Ваза\")) { … }\n// Консоль: TypeError: names.contains is not a function\n// Верно:\nif (names.includes(\"Ваза\")) { … }",
            "выдуманный метод; проверка — запуск или MDN: Array.prototype.includes"
          ],
          [
            "// Устаревший совет:\nvar total = 0;\ndocument.write(\"<p>\" + total + \"</p>\");\n// Современно:\nlet total = 0;\nel.textContent = total;",
            "работает, но так не пишут с 2015 года; спроси ИИ про современный способ"
          ],
          [
            "Проверка на MDN: developer.mozilla.org → поиск «Array includes» → раздел Browser compatibility",
            "MDN — справочник по браузерному JavaScript; если метода там нет, его нет"
          ],
          [
            "1. Попроси ИИ написать функцию с тремя методами массива и проверь каждый на MDN.\n2. Попроси «самый простой способ» для вывода текста — узнай, предложит ли он innerHTML там, где нужен textContent.\n3. В длинном диалоге с ограничением «без библиотек» задай 5 вопросов подряд и проверь, не появилась ли библиотека.\n4. Запиши в заметки три ошибки ИИ, которые поймал.",
            "Задание на Маке. Чем увереннее тон ответа, тем внимательнее проверяй."
          ],
          [
            "Без образца: найди в своих прошлых диалогах с ИИ один совет, который ты принял без проверки, проверь его сейчас по MDN и консоли.",
            "Самостоятельно. Критерий: записано, что совет подтвердился или нет, и чем."
          ],
          [
            "Ты предложил метод/подход:\n[вставь]\nНа чём это основано? Есть ли у этого метода страница на MDN? Есть ли более современный или простой способ? Если не уверен — скажи прямо.",
            "Запрос, который вынуждает ИИ показать основания; «не уверен» — полезный ответ."
          ]
        ],
        "tip": "Готово, когда: ты проверяешь незнакомые имена по MDN, запускаешь код до того, как поверить «работает», повторяешь ограничения в длинных диалогах и ведёшь список пойманных ошибок ИИ."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Метод, которого нет в JavaScript",
          "options": [
            "array.contains()",
            "array.includes()",
            "array.push()",
            "array.filter()"
          ]
        },
        {
          "k": "input",
          "q": "Справочник по браузерному JavaScript, где проверять методы (одно слово)",
          "a": [
            "MDN"
          ]
        },
        {
          "k": "choice",
          "q": "ИИ пишет «это точно работает». Что это значит?",
          "options": [
            "Ничего, пока ты не запустил код",
            "Код проверен",
            "Можно коммитить",
            "Ошибок нет"
          ]
        },
        {
          "k": "choice",
          "q": "Устаревший совет",
          "options": [
            "var и document.write",
            "const и textContent",
            "addEventListener",
            "fetch"
          ]
        },
        {
          "k": "choice",
          "q": "Длинный диалог, ИИ начал предлагать библиотеку, хотя ты просил без них",
          "options": [
            "Повторить ограничения в новом сообщении",
            "Согласиться",
            "Удалить проект",
            "Это невозможно"
          ]
        }
      ]
    },
    {
      "id": "vitrina-40",
      "t": "Безопасность: ключи, пароли, чужой код",
      "plan": "30 минут: ты знаешь, что нельзя вставлять в чат и на сайт, как хранить ключи и чем опасны чужие скрипты и данные покупателей.",
      "theory": {
        "rule": "**В чат с ИИ и в публичный репозиторий не попадают:** пароли, токены, ключи API и платёжных систем, данные покупателей (телефоны, адреса), содержимое .env. Нужен пример — замени на XXX. **Ключи хранят** в файле .env на сервере, который в .gitignore; в браузерном коде секретов быть не может — всё, что в app.js, видит любой покупатель. **Чужой код:** не запускай скрипты и команды из интернета, не понимая, что они делают — особенно curl … | sh и команды с sudo; npm-пакеты ставь только известные, с миллионами загрузок и свежими обновлениями. **Данные покупателей:** собирай минимум, храни не в localStorage на чужом устройстве, а на сервере (модуль 5), и помни про закон о персональных данных — согласие и политика обязательны (урок 55). **Если секрет утёк:** отозвать и выпустить новый, удаление из истории не спасает. GitHub сам предупреждает о найденных токенах — читай письма.",
        "ex": [
          [
            "STRIPE_SECRET_KEY=sk_live_XXXXXXXX   ← .env, только на сервере\n# .gitignore\n.env",
            "секрет живёт в .env, а .env — в .gitignore; в браузер уходит только публичный ключ"
          ],
          [
            "Плохо в чате: «вот мой ключ sk_live_abc123, почему не работает оплата?»\nХорошо: «ключ вида sk_live_XXX, ошибка 401 Unauthorized при запросе к /charges»",
            "смысл тот же, секрета нет"
          ],
          [
            "curl https://example.com/install.sh | sh     ← не запускать, не прочитав скрипт\nsudo rm -rf …                             ← не запускать по совету из чата",
            "команды, которые делают что угодно с правами администратора; сначала читать, потом думать"
          ],
          [
            "1. Проверь репозиторий и чаты: нет ли там ключей и телефонов; найденное — заменить и отозвать.\n2. Создай .env с тестовым значением и убедись, что git status его не видит.\n3. Открой app.js на опубликованном сайте через «Просмотр кода» — пойми, что видит покупатель.\n4. Найди в истории Терминала команды с sudo и curl | sh — вспомни, откуда они.\n5. Включи двухфакторную защиту на GitHub.",
            "Задание на Маке. Двухфакторная защита — Settings → Password and authentication; без неё аккаунт с твоим магазином уводят по одному паролю."
          ],
          [
            "Без образца: напиши в README раздел «Безопасность» из пяти правил для себя будущего.",
            "Самостоятельно. Критерий: правила конкретные («ключи только в .env»), а не общие («быть осторожным»)."
          ],
          [
            "Вот фрагмент моего кода или запроса:\n[вставь с заменой секретов на XXX]\nЕсть ли здесь что-то, что нельзя показывать или класть в браузер? Что сделать, если секрет уже утёк?",
            "Проверка «можно ли это показать» — привычка, которая дешевле любой утечки."
          ]
        ],
        "tip": "Готово, когда: в репозитории и чатах нет секретов и личных данных, .env в .gitignore, ты понимаешь, что весь браузерный код публичен, не запускаешь чужие команды не глядя, на GitHub включена двухфакторная защита."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Куда нельзя вставлять ключ платёжной системы?",
          "options": [
            "В чат с ИИ, в app.js и в публичный репозиторий",
            "В .env на сервере",
            "В менеджер паролей",
            "Никуда нельзя, ключи не нужны"
          ]
        },
        {
          "k": "input",
          "q": "Файл, где хранят секреты на сервере и который добавляют в .gitignore",
          "a": [
            ".env"
          ]
        },
        {
          "k": "choice",
          "q": "Секрет попал в публичный репозиторий. Первое действие",
          "options": [
            "Отозвать и выпустить новый",
            "Удалить файл коммитом",
            "Сделать репозиторий приватным",
            "Ничего"
          ]
        },
        {
          "k": "choice",
          "q": "Команда curl … | sh из интернета",
          "options": [
            "Сначала прочитать скрипт, потом решать",
            "Запустить, раз советуют",
            "Запустить с sudo",
            "Это безопасно всегда"
          ]
        },
        {
          "k": "choice",
          "q": "Что видит покупатель на опубликованном сайте?",
          "options": [
            "Весь HTML, CSS и JavaScript",
            "Только HTML",
            "Ничего, код скрыт",
            "Только картинки"
          ]
        }
      ]
    },
    {
      "id": "vitrina-41",
      "t": "Проект 4: доработка через ИИ по своему ТЗ",
      "plan": "60 минут: новая функция магазина сделана с ИИ по твоему ТЗ, прочитана, проверена в DevTools, закоммичена и опубликована; ты можешь объяснить каждую строку.",
      "theory": {
        "rule": "Проект закрывает модуль 4: берёшь один issue из проекта 3 и доводишь до публикации по правилам модуля. **Порядок:** 1) ТЗ по четырём частям (урок 36) — записать до обращения к ИИ; 2) запрос с кодом, одно изменение за раз; 3) пересказ полученного кода (урок 37), незнакомое — разобрать; 4) вставка по частям с проверкой консоли, сценарий до/после (урок 38); 5) проверка незнакомых методов по MDN (урок 39); 6) проверка на секреты и чужие команды (урок 40); 7) коммит «vN: …», ?v=, push, проверка на телефоне, закрыть issue. **Сдача:** в README раздел «Что сделано с ИИ» — ТЗ, что переписал сам, что проверил и как. Хорошие кандидаты: «Найдено: N», сортировка по названию, счётчик корзины в шапке, подсветка совпадения в поиске.",
        "ex": [
          [
            "ТЗ #1 — счётчик в шапке\nКонтекст: app.js, корзина cart = [{id, qty}], функция renderCart.\nЦель: в header элемент #cart-count показывает сумму qty.\nОграничения: не менять addToCart/changeQty; считать в renderCart.\nКритерий: 3 кружки + 1 ваза → «4»; пустая корзина → «0».",
            "ТЗ записано до запроса — потом по нему же проверяешь"
          ],
          [
            "Сценарий проверки #1:\nдо: счётчика нет\nпосле: добавить 3 кружки → 3; добавить вазу → 4; удалить вазу → 3; перезагрузить → 3; очистить localStorage → 0",
            "пять шагов, которые повторяешь руками после вставки кода"
          ],
          [
            "## Что сделано с ИИ\n- #1 Счётчик корзины: ТЗ выше; код от ИИ прочитан, reduce заменён на for…of; проверен сценарий из 5 шагов; v6.",
            "запись в README — короткая, но с тем, что ты сделал сам"
          ],
          [
            "1. Выбери issue, напиши ТЗ и сценарий проверки.\n2. Получи код от ИИ, перескажи, замени непонятное.\n3. Вставь по частям, пройди сценарий в DevTools.\n4. Проверь методы по MDN и код на секреты.\n5. Коммит, ?v=, push, телефон, закрой issue.\n6. Запиши в README.",
            "Задание на Маке. Если на любом шаге не можешь объяснить строку — шаг назад, а не вперёд."
          ],
          [
            "Без образца: сделай второй issue полностью сам, без ИИ, и сравни время и качество с первым. Запиши вывод.",
            "Самостоятельно. Критерий: оба issue закрыты, вывод записан честно."
          ],
          [
            "Вот моё ТЗ и код, который получился:\n[вставь]\nПроверь, соответствует ли код ТЗ по каждому пункту ограничений и критерия. Где расхождение — покажи строку. Не дописывай функционал.",
            "Ревью по ТЗ, а не по вкусу: расхождение с ТЗ — ошибка, даже если код «лучше»."
          ]
        ],
        "tip": "Готово, когда: issue закрыт по полному порядку из семи шагов, функция опубликована и проверена на телефоне, в README запись «Что сделано с ИИ», и ты можешь объяснить каждую строку нового кода. Модуль 4 закрыт — впереди сервер и заказы."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Что писать до обращения к ИИ?",
          "options": [
            "ТЗ по четырём частям и сценарий проверки",
            "Ничего, ИИ сам разберётся",
            "Только название issue",
            "Готовый код"
          ]
        },
        {
          "k": "choice",
          "q": "Код от ИИ содержит reduce, который ты не понимаешь",
          "options": [
            "Разобрать или заменить на цикл, который можешь объяснить",
            "Вставить, раз работает",
            "Удалить весь проект",
            "Попросить ещё больше кода"
          ]
        },
        {
          "k": "input",
          "q": "Сколько шагов в полном порядке доработки (число)",
          "a": [
            "7"
          ]
        },
        {
          "k": "choice",
          "q": "Когда закрывать issue?",
          "options": [
            "После публикации и проверки на телефоне",
            "После ответа ИИ",
            "После коммита без push",
            "Сразу при создании"
          ]
        },
        {
          "k": "choice",
          "q": "Что записать в README про работу с ИИ?",
          "options": [
            "ТЗ, что переписал сам, что и как проверил",
            "Полный диалог с ИИ",
            "Ничего",
            "Только ссылку на чат"
          ]
        }
      ]
    },
    {
      "id": "vitrina-x7",
      "exam": true,
      "t": "Экзамен: работа с ИИ",
      "covers": [
        "vitrina-36",
        "vitrina-37",
        "vitrina-38",
        "vitrina-39",
        "vitrina-40",
        "vitrina-41"
      ],
      "pass": 0.8,
      "q": [
        {
          "k": "choice",
          "s": "vitrina-36",
          "q": "Чего не хватает в запросе «сделай поиск лучше»?",
          "options": [
            "контекста, конкретной цели, ограничений и критерия",
            "вежливости",
            "смайлов",
            "ничего"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-36",
          "q": "Сколько изменений просить за раз?",
          "options": [
            "одно",
            "все сразу",
            "не меньше пяти",
            "сколько угодно"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-37",
          "q": "Пересказ кода: вход, выход, шаги и",
          "options": [
            "крайние случаи",
            "автор",
            "дата",
            "язык"
          ]
        },
        {
          "k": "input",
          "s": "vitrina-37",
          "q": "Куда попадает код, который ты не можешь пересказать? (в проект / никуда — напиши «никуда»)",
          "a": [
            "никуда",
            "в никуда"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-38",
          "q": "ReferenceError: formatPrise is not defined",
          "options": [
            "Опечатка в имени функции",
            "Нет интернета",
            "CSS сломан",
            "Нужен сервер"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-38",
          "q": "Доказать, что правка работает",
          "options": [
            "Повторить сценарий до и после",
            "Прочитать код",
            "Спросить ИИ",
            "Закоммитить"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-39",
          "q": "Незнакомый метод в коде от ИИ. Проверить",
          "options": [
            "на MDN и запуском в консоли",
            "у того же ИИ",
            "в комментариях кода",
            "никак"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-39",
          "q": "Признак выдуманного метода",
          "options": [
            "TypeError: … is not a function при запуске",
            "Красивое имя",
            "Длинный ответ",
            "Ответ по-английски"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-40",
          "q": "Весь код в app.js",
          "options": [
            "видит любой покупатель",
            "скрыт от всех",
            "виден только владельцу",
            "виден только GitHub"
          ]
        },
        {
          "k": "input",
          "s": "vitrina-40",
          "q": "Чем заменять секреты в примерах для чата (три буквы)",
          "a": [
            "XXX",
            "xxx"
          ]
        },
        {
          "k": "choice",
          "s": "vitrina-41",
          "q": "Последний шаг доработки",
          "options": [
            "проверка на телефоне и закрытие issue",
            "ответ ИИ",
            "git add",
            "написание ТЗ"
          ]
        },
        {
          "k": "order",
          "s": "vitrina-41",
          "q": "Порядок доработки через ИИ",
          "words": [
            "ТЗ",
            "запрос",
            "пересказ",
            "проверка",
            "push"
          ],
          "a": "ТЗ запрос пересказ проверка push"
        }
      ]
    }
  ]
},
{
  "id": "wordpress",
  "cat": "code",
  "name": "WordPress: сайт и магазин с нуля",
  "type": "path",
  "unit": "урок",
  "exampleFormat": "text",
  "goal": "24 урока: WordPress, WooCommerce, товары, оплата и доставка в России. Практика — свой учебный магазин.",
  "prompt": "Проведи урок WordPress №{n}: «{t}». Я учусь с нуля и создаю учебный магазин кроссовок для России на WordPress.org и WooCommerce. План: {plan}. Объясни простыми словами, дай практическое задание и критерии проверки. Уточняй версии интерфейса по официальной документации. Не проси пароли, ключи и данные покупателей; работаем в тестовой среде.",
  "resources": [
    {
      "href": "wordpress/guide.html",
      "label": "Учебник, плагины для России и оценка блока программирования"
    },
    {
      "href": "https://learn.wordpress.org/",
      "label": "Официальные уроки WordPress"
    },
    {
      "href": "https://woocommerce.com/documentation/woocommerce/",
      "label": "Официальная документация WooCommerce"
    },
    {
      "href": "https://yookassa.ru/docs/support/payments/onboarding/integration/cms-module/woocommerce",
      "label": "ЮKassa: настройка модуля WooCommerce"
    }
  ],
  "steps": [
    {
      "id": "wp-01",
      "t": "WordPress: программа, хостинг и будущий магазин",
      "plan": "Разобраться в WordPress.org и WordPress.com; составить паспорт учебного обувного магазина.",
      "theory": {
        "rule": "WordPress — система управления содержимым сайта. Она хранит страницы, помогает их редактировать и собирает результат для посетителя. Тема задаёт оформление, плагины добавляют возможности. WooCommerce позже превратит учебный сайт в магазин с товарами, корзиной и заказами. Само название WordPress ещё не означает, что магазин уже умеет продавать.\nWordPress.org — сайт проекта, где доступны программа, документация и каталог расширений. Выражение «самостоятельно размещённый WordPress» означает установку программы в выбранной среде. Это может быть собственный сервер или управляемый хостинг: самостоятельно размещённый не означает, что владелец обязан обслуживать сервер вручную. WordPress.com — отдельный сервис размещения, использующий WordPress. Возможности его предложений проверяют на сайте сервиса, поскольку условия меняются. В этом курсе рабочая модель — WordPress с выбранным размещением; первые упражнения выполняются в браузерной песочнице.\nПредставьте обувной магазин: домен похож на адрес, хостинг предоставляет место и вычисления, WordPress управляет содержимым, тема оформляет витрину. Фотографии и описания принадлежат содержимому, а остатки по размерам относятся к будущей торговой системе. Учётная запись на WordPress.org сама по себе не создаёт магазин и не является входом в его панель.\nДо оформления составьте паспорт проекта: кому продаёте, какую обувь показываете, какие пять страниц нужны, что считается готовым результатом. Используйте вымышленные сведения и собственные либо разрешённые изображения. Условия оплаты и доставки пока обозначайте как учебные, не обещайте реальную продажу. Такой паспорт позволяет проверять решения по потребности покупателя: сможет ли он понять ассортимент, найти контакты и узнать порядок получения обуви. Результат урока — понятная схема будущего сайта, которую можно объяснить без специальных терминов.",
        "ex": [
          [
            "1. Откройте обычный текстовый документ и назовите его «Паспорт учебного магазина».\n2. Запишите название вымышленного обувного магазина и пометку «Учебный проект».\n3. Опишите одного покупателя: например, человек ищет удобную обувь для ежедневной ходьбы.\n4. Перечислите пять страниц: Главная, Каталог, О нас, Контакты, Доставка.\n5. Напротив каждой страницы укажите один вопрос покупателя, на который она отвечает.\n6. Нарисуйте цепочку «домен → размещение → WordPress → тема и содержимое»; отдельно подпишите будущий WooCommerce.\n7. Запишите выбранную модель: самостоятельное размещение WordPress; для обучения — Playground.\n8. Сохраните документ и проверьте его: объясните вслух разницу программы и сервиса, не читая определения.",
            "Практика с подсказками — 8 шагов"
          ],
          [
            "Создайте второй вариант паспорта для другой аудитории обувного магазина. Самостоятельно сформулируйте ценность каждой страницы и три критерия готовности сайта. Не копируйте пример про ежедневную ходьбу. Артефакт — сохранённый паспорт с двумя вариантами аудитории и выбранным направлением.",
            "Самостоятельная работа"
          ],
          [
            "В паспорте есть аудитория, ассортимент, пять страниц и критерии готовности. WordPress.org указан как проект и источник программы, WordPress.com — как сервис размещения. WooCommerce отмечен как будущий торговый слой. Тест: другой человек по документу объясняет, где живёт сайт и зачем нужен каталог; если путается, перепишите схему.",
            "Проверка результата"
          ],
          [
            "Ошибка: «Я зарегистрировался на WordPress.org, почему нет панели магазина?» Диагноз: создан профиль сообщества, а отдельная установка сайта ещё не создана. Проверьте адрес, который открываете, и назначение каждой учётной записи. В этом модуле продолжайте в Playground; домен и платное размещение для упражнений не нужны.",
            "Типичная ошибка и диагностика"
          ],
          [
            "Проверь мой паспорт учебного обувного магазина: [вставить текст]. Найди смешение WordPress.org, WordPress.com, хостинга, темы и WooCommerce. Для каждого замечания предложи проверку по официальной документации WordPress и дай ссылку. Не придумывай условия сервисов, обозначай неизвестное. Не запрашивай пароли, токены, персональные данные или доступ к аккаунтам.",
            "Запрос к ИИ для проверки"
          ]
        ],
        "tip": "WordPress — программа; размещение — среда её работы. Источник: https://wordpress.org/documentation/article/difference-between-wordpress-org-and-wordpress-com/"
      },
      "ex": [
        {
          "q": "Владелец скачал WordPress с WordPress.org. Что ещё необходимо, чтобы сайт работал в интернете?",
          "options": [
            "Среда размещения с установленным WordPress и настроенным адресом",
            "Только профиль участника WordPress.org",
            "Публикация пяти записей в документе",
            "Название магазина в настройках браузера"
          ],
          "why": "Скачанный архив содержит программу. Для доступного сайта её нужно запустить в подходящей среде и настроить доступ.",
          "k": "choice"
        },
        {
          "q": "Подрядчик говорит: «У вас самостоятельное размещение, значит сервер обязательно обслуживать вручную». Что уточнить?",
          "options": [
            "Хостинг может управлять сервером, сохраняя выбранную модель размещения WordPress",
            "WordPress.org всегда обслуживает сервер магазина",
            "Самостоятельное размещение запрещает службу поддержки",
            "Управляемый хостинг автоматически превращает сайт в WordPress.com"
          ],
          "why": "Self-hosted описывает размещение WordPress у выбранного провайдера, а степень обслуживания определяется услугой хостинга.",
          "k": "choice"
        },
        {
          "q": "Для обувного проекта уже готовы страницы и тема. Что из этого ещё не следует?",
          "options": [
            "Что настроены товары, корзина и приём заказов",
            "Что текст страниц можно редактировать",
            "Что тема влияет на внешний вид",
            "Что сайт может содержать страницу контактов"
          ],
          "why": "Обычные страницы не создают торговые процессы. Их добавляют и проверяют в последующих уроках WooCommerce.",
          "k": "choice"
        },
        {
          "q": "В паспорте написано только «красивый магазин». Как сделать результат проверяемым?",
          "options": [
            "Указать аудиторию и действия: найти обувь, контакты и условия доставки",
            "Выбрать как можно больше цветов",
            "Назначить всему проекту один заголовок",
            "Переименовать документ в «Готово»"
          ],
          "why": "Проверяемый критерий описывает конкретное действие посетителя, а субъективное слово «красивый» не определяет готовность.",
          "k": "choice"
        },
        {
          "q": "Укажите домен официального проекта, откуда получают самостоятельно размещаемый WordPress. Без https:// и пути.",
          "a": [
            "wordpress.org"
          ],
          "why": "WordPress.org представляет проект и программу. WordPress.com — отдельный сервис размещения.",
          "k": "input"
        },
        {
          "q": "Начинающий хочет пройти первый модуль без покупки хостинга. Какой план соответствует курсу?",
          "options": [
            "Составить паспорт и использовать WordPress Playground для упражнений",
            "Указать настоящий магазин как готовый без проверки",
            "Купить домен вместо установки WordPress",
            "Зарегистрироваться на WordPress.org и считать сайт созданным"
          ],
          "why": "Песочница даёт среду для практики, а паспорт задаёт цель. Покупка услуг не требуется для учебных действий.",
          "k": "choice"
        }
      ]
    },
    {
      "id": "wp-02",
      "t": "Playground: безопасная песочница и сохранение работы",
      "plan": "Запустить временный WordPress, создать контрольную страницу и проверить восстановление из ZIP.",
      "theory": {
        "rule": "WordPress Playground запускает WordPress прямо в браузере. Здесь можно учиться создавать страницы и менять оформление без покупки размещения. Это учебная среда, а не опубликованный магазин для покупателей. Не вводите реальные заказы, платёжные сведения или секреты. Ограничения браузера и особенности окружения означают, что успешное упражнение ещё не подтверждает работу будущего магазина на сервере.\nПоведение сохранения зависит от режима. Адрес с параметром storage=temp создаёт временную среду: обновление всей вкладки браузера или её закрытие уничтожает изменения. Обычный запуск при доступном хранилище может автоматически сохранять последние среды. Автосохранение не стоит считать архивом курса: количество таких точек ограничено, данные браузера можно очистить, а другой профиль их не увидит. Явно сохранённая среда удобнее для продолжения, но также зависит от выбранного хранилища.\nОсновная привычка ученика — экспортировать ZIP после значимого результата. Такой архив переносим и хранится отдельно от данных браузера. Не путайте экспорт всей песочницы с экспортом записей WordPress: файл содержимого не равен полной копии среды. Копия считается пригодной только после проверки восстановления. Восстанавливайте её в отдельной учебной среде, чтобы не заменить единственный рабочий вариант.\nВ интерфейсе Playground есть собственные элементы управления вокруг сайта; они отличаются от панели WordPress внутри. Кнопка обновления страницы сайта в Playground и обновление всей вкладки браузера действуют по-разному. Перед экспериментом проверьте режим хранения, сохраните архив и запишите его имя в журнал. Работайте короткими этапами: действие, просмотр результата, сохранение, контрольное восстановление. Результат этого урока — первый архив с узнаваемой контрольной страницей и подтверждение, что она появилась после импорта, а не только осталась в старой вкладке.",
        "ex": [
          [
            "1. Откройте https://playground.wordpress.net/?storage=temp в отдельной вкладке и дождитесь WordPress.\n2. В адресном поле Dock самого Playground откройте путь /wp-admin/ — появится панель WordPress внутри песочницы.\n3. Откройте «Страницы → Добавить новую» и введите заголовок «Контроль сохранения».\n4. Добавьте абзац с уникальной меткой, например «Учебная пара 02», и сохраните черновик.\n5. Вернитесь к управлению Playground, откройте Export и скачайте ZIP через Download as .zip; подписи могут переводиться.\n6. Сохраните архив под понятным именем с датой; убедитесь, что файл действительно появился в загрузках.\n7. В Dock откройте New → Import zip и выберите ZIP. Дождитесь нового Playground с восстановленными данными; исходную среду сохраните отдельно.\n8. Откройте список страниц импортированной среды: найдите черновик и уникальную метку; запишите успешное восстановление в паспорт проекта.",
            "Практика с подсказками — 8 шагов"
          ],
          [
            "Восстановите свой архив в ещё одной чистой песочнице и создайте там другую контрольную метку. Экспортируйте новый ZIP с отличающимся именем. Самостоятельно запишите, какие изменения находятся в первом архиве, а какие — только во втором. Артефакты — два архива и журнал проверки.",
            "Самостоятельная работа"
          ],
          [
            "Есть два различимых ZIP, исходная контрольная страница и запись о проверенном импорте. В журнале указан режим среды. Тест: после импорта первого архива в чистой среде видна первая метка, но отсутствует добавленная позднее вторая. Во время проверки не заменяйте единственный рабочий вариант.",
            "Проверка результата"
          ],
          [
            "Ошибка: после F5 работа исчезла. Сначала проверьте наличие storage=temp в адресе. Временная среда не переживает перезагрузку вкладки. Восстановите последний ZIP; если его нет, изменения временной среды обычно не вернуть. Для обычной сохраняемой среды дополнительно проверьте профиль браузера, очистку данных и список Your Playgrounds; автосохранения не заменяют резервную копию.",
            "Типичная ошибка и диагностика"
          ],
          [
            "Помоги проверить сохранение моего учебного Playground. Режим: [temp или сохранённый], архив: [имя], метка: [текст], результат импорта: [наблюдение]. Предложи проверяемую последовательность диагностики по актуальному Playground Handbook. Не утверждай, что видел файл или восстановил сайт. Не запрашивай пароли, токены и доступ; исключи реальные персональные данные.",
            "Запрос к ИИ для проверки"
          ]
        ],
        "tip": "Экспортируйте ZIP и проверяйте восстановление через New → Import zip. Источник: https://developer.wordpress.org/playground/handbook/quick-start-guide/"
      },
      "ex": [
        {
          "q": "Вы работаете по адресу с storage=temp и собираетесь нажать F5. Что сначала сделать?",
          "options": [
            "Экспортировать ZIP и убедиться, что он сохранён вне браузерного хранилища сайта",
            "Добавить ещё один абзац без сохранения",
            "Скопировать только адрес вкладки",
            "Назвать страницу «Резервная копия»"
          ],
          "why": "Временная среда исчезает при перезагрузке всей вкладки. Ссылка и название страницы не содержат её изменённые данные.",
          "k": "choice"
        },
        {
          "q": "Playground появился в списке автосохранений. Как оценить надёжность этого состояния?",
          "options": [
            "Это удобная точка продолжения, но нужен отдельный ZIP для переносимой копии",
            "Это бессрочный архив в любой учётной записи",
            "Это публикация магазина на сервере",
            "Это гарантия сохранения после очистки данных браузера"
          ],
          "why": "Автосохранения ограничены и зависят от браузерного хранилища. Переносимый архив хранится отдельно.",
          "k": "choice"
        },
        {
          "q": "В папке есть ZIP. Как подтвердить пригодность копии?",
          "options": [
            "Импортировать его в чистую отдельную среду и найти контрольную метку",
            "Проверить только красивое имя файла",
            "Повторно открыть старую рабочую вкладку",
            "Сделать снимок названия архива"
          ],
          "why": "Наличие файла не доказывает восстановимость. Контрольная метка в новой среде показывает, что восстановлены нужные данные.",
          "k": "choice"
        },
        {
          "q": "После импорта ученик видит правильную страницу только в исходной вкладке. Что не проверено?",
          "options": [
            "Что контрольная страница присутствует именно в восстановленной среде",
            "Что WordPress способен показывать текст вообще",
            "Что браузер умеет открывать вкладки",
            "Что исходная страница имеет название"
          ],
          "why": "Открытая исходная среда не является доказательством успешного импорта. Нужен просмотр нового экземпляра.",
          "k": "choice"
        },
        {
          "q": "Как называется параметр вместе со значением, явно включающий временный Playground? Введите без вопросительного знака.",
          "a": [
            "storage=temp"
          ],
          "why": "Этот параметр создаёт временную среду, теряемую при обновлении браузерной вкладки или её закрытии.",
          "k": "input"
        },
        {
          "q": "Для уроков нужно использовать фотографии обуви и тренировочные данные. Что безопасно помещать в Playground?",
          "options": [
            "Собственные разрешённые фото и вымышленные сведения",
            "Рабочий пароль платёжного кабинета",
            "Базу реальных покупателей",
            "Действующие секретные ключи доставки"
          ],
          "why": "Учебная песочница не требует секретов или реальных данных покупателей. Использование вымышленных материалов позволяет упражняться без доступа к рабочему магазину.",
          "k": "choice"
        }
      ]
    },
    {
      "id": "wp-03",
      "t": "Размещение: домен, HTTPS и установка WordPress",
      "plan": "Собрать паспорт размещения, понять установку и отрепетировать первый запуск без покупки услуг.",
      "theory": {
        "rule": "Домен — понятное человеку имя сайта. DNS связывает это имя с инфраструктурой размещения. Хостинг выполняет программу WordPress и хранит её данные. HTTPS защищает передачу данных между браузером и сайтом, но сам по себе не проверяет честность магазина и не заменяет обновления. Для рабочего адреса нужен действующий сертификат, соответствующий имени сайта, и корректная настройка сервера.\nОбычная серверная установка WordPress использует PHP и базу MySQL либо MariaDB. Требования к поддерживаемым версиям меняются, поэтому выбирайте среду по актуальной странице Requirements на WordPress.org и требованиям будущих расширений. «Запускается на старой версии» и «рекомендуется для нового магазина» — разные критерии. Playground устроен иначе и не является проверкой совместимости выбранного сервера.\nУстановка через мастер хостинга и ручная установка приводят к одному результату: файлы программы находятся в правильном каталоге, WordPress подключается к своей базе, создаётся администратор. В ручном варианте нужны имя базы, её пользователь, пароль и адрес сервера базы; последний не всегда localhost. Эти значения выдаёт среда размещения. Не вставляйте их в учебные отчёты и переписку с ИИ. У каждого провайдера своя панель, поэтому универсальной кнопки установки нет.\nВ этом уроке вы готовите паспорт размещения, а не покупаете услуги. Отметьте домен как пример, состояние HTTPS как «проверить», требования как ссылку с датой, резервное копирование как обязательную возможность. На настоящем сервере сначала выберите пустую учебную площадку, проверьте адрес и наличие чужих данных, затем запускайте установку. После неё проверьте открытие сайта, вход в панель и сохранение страницы. Результат урока — проверяемая схема запуска и репетиция последнего этапа в песочнице.\n\nПереход к магазину требует работающего WordPress на отдельном тестовом поддомене с HTTPS: Playground не заменяет публичный сервер и обработку уведомлений оплаты. В этом уроке есть два уровня. Без хостинга выполните паспорт размещения и репетицию, но отметьте развёртывание как незавершённое. До урока 9 выполните установку по шагам ниже. Для выбора тарифа нужны поддерживаемые WordPress версии PHP/базы, HTTPS, копии и изолированный тестовый сайт; актуальные требования проверяются на wordpress.org/about/requirements/. Здесь не нужно оплачивать услуги ради теста Ростка.",
        "ex": [
          [
            "1. Учебная репетиция: заполни паспорт размещения и сохрани архив Playground. Если хостинга пока нет, не называй репетицию готовым сервером.\n2. На выбранном хостинге по его документации создай отдельный тестовый поддомен и каталог. Домен или поддомен должен указывать на этот сервер через DNS; дождись применения записей. Не работай в каталоге действующего магазина.\n3. В панели хостинга выпусти сертификат и проверь адрес https://тестовый-домен без предупреждений браузера. Защити учебный сайт от посторонних паролем среды, а не только запретом индексации.\n4. Если хостинг предлагает установщик WordPress, выбери тестовый адрес, язык, название и уникальные данные администратора. Если установщика нет: скачай WordPress с wordpress.org, распакуй в тестовый каталог, создай базу данных и пользователя базы по инструкции провайдера, открой адрес сайта и введи параметры базы в мастер установки. Секреты остаются в панели и конфигурации сервера.\n5. Заверши мастер, открой /wp-admin/, войди своим администратором; сохрани параметры доступа в менеджере паролей.\n6. Установи ту же блочную тему. После урока 8 перенеси страницы: в исходной среде Инструменты → Экспорт → содержимое, в целевой Инструменты → Импорт → WordPress по официальной инструкции. Это импорт контента, а не полная миграция темы, настроек и плагинов.\n7. Если импорт не перенёс локальные изображения Playground, загрузи исходные файлы заново и пересоздай их связи. Повтори настройки шапки/меню/главной и перенеси свои блоки; для пяти страниц допустима ручная сборка. ZIP Playground не загружается как плагин на хостинге.\n8. Проверь пять страниц, меню, картинки и HTTPS в приватном окне, сделай копию файлов и базы на хостинге. Только после этого переходи к WooCommerce и внешним платёжным уведомлениям.",
            "Практика: репетиция и установка на тестовый хостинг"
          ],
          [
            "Составьте карточку готовности размещения: шесть проверок, источник ответа на каждую и отметка «подтверждено» либо «не проверено». Разведите установку WordPress и подключение домена. Объясните своими словами, какие данные понадобятся мастеру ручной установки; реальные значения не записывайте. Артефакт — карточка и контрольный черновик.",
            "Самостоятельная работа"
          ],
          [
            "Карточка отдельно описывает домен/DNS, HTTPS, PHP, базу, резервную копию и восстановление. Есть дата проверки официальных требований. Учебный адрес не выдан за работающий. Тест: черновик вновь открывается с меткой, а карточка честно отмечает, что успешный Playground не доказывает готовность хостинга.",
            "Проверка результата"
          ],
          [
            "Ошибка: «Ошибка установки соединения с базой данных». Проверьте, какой экземпляр сайта открыт, затем сверяйте имя базы, пользователя, адрес сервера и права по инструкции среды. Не заменяйте все поля на localhost и не публикуйте пароль. На Playground причина может быть связана с его отдельным механизмом базы; для него используйте Playground Handbook, а не инструкции сервера MySQL.",
            "Типичная ошибка и диагностика"
          ],
          [
            "Проверь паспорт размещения учебного WordPress: [поля без секретов]. Отдели подтверждённые факты от неизвестных; сверь требования с официальной страницей WordPress и предложи тест HTTPS и сохранения записи. Не советуй покупать услуги и не выдумывай кнопки панели хостинга. Не запрашивай пароли базы, токены, ключи или доступ к аккаунтам.",
            "Запрос к ИИ для проверки"
          ]
        ],
        "tip": "Сверяйте требования перед установкой; номер версии из старого урока не является рекомендацией. Источник: https://wordpress.org/about/requirements/ Установка: https://learn.wordpress.org/lesson/wordpress-installation/ Экспорт страниц: https://wordpress.org/documentation/article/tools-export-screen/"
      },
      "ex": [
        {
          "k": "choice",
          "q": "На хостинге есть старая версия PHP, на которой WordPress ещё запускается. Как выбирать среду нового магазина?",
          "options": [
            "Сверить актуальные рекомендуемые требования WordPress и будущих расширений",
            "Выбрать минимально запускающуюся версию навсегда",
            "Ориентироваться только на год регистрации домена",
            "Проверить лишь цвет установщика"
          ],
          "why": "Работоспособность старой версии не означает её актуальную поддержку и пригодность. Нужна сверка текущих требований и совместимости."
        },
        {
          "k": "choice",
          "q": "Сайт открывается по HTTPS. Что это подтверждает при корректном сертификате?",
          "options": [
            "Защищено соединение браузера с сайтом по этому адресу",
            "Все плагины уже обновлены",
            "Продавец обязательно исполнит заказ",
            "Резервная копия проверена восстановлением"
          ],
          "why": "HTTPS защищает канал передачи данных. Обновления, честность продавца и резервные копии проверяются отдельно."
        },
        {
          "k": "choice",
          "q": "Мастер ручной установки просит адрес сервера базы. Где получить правильное значение?",
          "options": [
            "В настройках созданной базы или инструкции выбранной среды размещения",
            "Всегда использовать домен магазина без проверки",
            "Вставить адрес WordPress.org",
            "Указать логин администратора WordPress"
          ],
          "why": "Адрес базы задаётся конкретной средой. Он может отличаться от домена сайта и localhost."
        },
        {
          "k": "choice",
          "q": "Ученик успешно сохранил страницу в Playground. Какую отметку поставить в карточке хостинга?",
          "options": [
            "«Работа с WordPress проверена в песочнице; хостинг ещё не проверен»",
            "«Сертификат будущего домена проверен»",
            "«Версия базы на сервере подтверждена»",
            "«DNS реального домена настроен»"
          ],
          "why": "Playground работает в браузерной среде и не обращается к ещё не проверенному хостингу или будущему домену."
        },
        {
          "k": "input",
          "q": "Какой протокол нужен для защищённого соединения браузера с сайтом? Введите аббревиатуру латиницей.",
          "a": [
            "HTTPS"
          ],
          "why": "HTTPS — HTTP поверх защищённого соединения. Его необходимо корректно настроить для фактического адреса сайта."
        },
        {
          "k": "choice",
          "q": "Перед установкой в выбранный каталог обнаружен чужой сайт. Как продолжить?",
          "options": [
            "Остановить установку в этом каталоге и выбрать подтверждённо пустую учебную площадку",
            "Перезаписать файлы: установка всегда безопасна",
            "Удалить базу с самым коротким именем",
            "Поменять заголовок чужого сайта на свой"
          ],
          "why": "Установка может затронуть существующие файлы и данные. Сначала требуется безопасная отдельная площадка."
        }
      ]
    },
    {
      "id": "wp-04",
      "t": "Панель, роли и безопасный вход",
      "plan": "Освоить панель управления, проверить свою роль и подготовить безопасный порядок обновлений.",
      "theory": {
        "rule": "Панель WordPress — рабочее место владельца и редактора. Раздел «Страницы» управляет постоянными материалами, «Записи» — публикациями, «Медиафайлы» — загрузками, «Внешний вид» — оформлением. Набор пунктов зависит от роли, темы и расширений. Если у ученика нет знакомой кнопки, это повод проверить среду и права, а не сразу переустанавливать сайт. Перевод и расположение отдельных элементов могут отличаться.\nРоль определяет разрешённые действия. Администратор управляет настройками отдельного сайта и расширениями. Редактор работает со страницами и публикациями, включая чужие, но по умолчанию не управляет установкой плагинов. Автор занимается собственными записями. Для человека, который только исправляет тексты страниц, обычно достаточно роли редактора. Доступы выдавайте каждому отдельно: общий логин мешает понимать, кто внёс изменение, и затрудняет отзыв доступа.\nНа реальном сайте используйте уникальный длинный пароль, созданный генератором, и храните его в менеджере паролей. Не переносите тестовые данные входа Playground на рабочий магазин. Двухфакторная защита полезна, но её наличие зависит от настройки среды и дополнительных средств; не ищите обязательный переключатель в чистом ядре WordPress. В этом уроке ничего устанавливать для неё не требуется.\nОбновления закрывают ошибки и поддерживают совместимость. Перед изменением важного сайта подготовьте копию файлов и базы, проверьте восстановление и протестируйте изменение в отдельной среде. Затем проверьте ключевые страницы и вход; для магазина позднее добавятся корзина и оформление заказа. Не обновляйте всё одновременно без возможности понять причину сбоя. В песочнице достаточно изучить доступные сведения, зафиксировать состояние и экспортировать ZIP. Результат — карта панели и краткий регламент доступа и обновлений, основанный на фактической роли, а не на догадке.",
        "ex": [
          [
            "1. Откройте панель своего учебного WordPress.\n2. По очереди откройте «Страницы», «Записи» и «Медиафайлы»; запишите, где лежит контрольная страница.\n3. Откройте «Пользователи» и найдите собственный профиль; если списка нет, используйте доступный пункт профиля и отметьте ограничение.\n4. Установите свою роль по видимым данным списка пользователей либо владельца среды; не меняйте роль единственного администратора.\n5. Откройте профиль и найдите управление паролем; изучите его, не вставляя пароль в отчёт и не меняя тестовый вход без сохранённого способа продолжить работу.\n6. Откройте «Консоль → Обновления», если раздел доступен; запишите фактическое состояние, ничего не устанавливая.\n7. Создайте документ «Доступ и обновления»: роль для текстового редактора, хранение паролей, копия перед изменением, тест после изменения.\n8. Экспортируйте ZIP песочницы и проверьте, что контрольный черновик по-прежнему открывается. Сохраните карту панели вместе с документом.",
            "Практика с подсказками — 8 шагов"
          ],
          [
            "Составьте правила для вымышленной команды из владельца, редактора страниц и автора новостей. Выберите минимально достаточные стандартные роли и объясните каждое решение. Отдельно запишите действия при исчезновении раздела «Плагины» и порядок проверки после обновления. Не создавайте реальные аккаунты.",
            "Самостоятельная работа"
          ],
          [
            "У каждой задачи есть роль с объяснением. В документе отсутствуют пароли и общие учётные записи. Перед обновлением предусмотрены копия и проверка восстановления, после — функциональная проверка. Тест: по сценарию «редактор не видит установку плагинов» вы объясняете, почему это ожидаемо, и не предлагаете повысить роль без необходимости.",
            "Проверка результата"
          ],
          [
            "Ошибка: человеку для правки одной страницы выдали администратора, потому что так проще. Диагноз: полномочия выбраны по удобству, а не по задаче. Сопоставьте необходимые действия со стандартными ролями. Отсутствие управления плагинами у редактора нормально. Не понижайте единственного владельца в ходе учебного эксперимента.",
            "Типичная ошибка и диагностика"
          ],
          [
            "Проверь мой регламент доступа и обновлений: [текст без данных входа]. Сопоставь задачи с официальными ролями WordPress, укажи лишние полномочия и предложи проверяемые действия до и после обновления. Не утверждай, что обновление проверено без результата теста. Не запрашивай пароли, резервные коды, токены или доступ к аккаунтам.",
            "Запрос к ИИ для проверки"
          ]
        ],
        "tip": "Права выдаются под задачу; копия полезна вместе с проверкой восстановления. Источник: https://wordpress.org/documentation/article/roles-and-capabilities/"
      },
      "ex": [
        {
          "k": "choice",
          "q": "Сотрудник должен редактировать все страницы и публикации, но не устанавливать расширения. Какая стандартная роль подходит?",
          "options": [
            "Редактор",
            "Автор",
            "Участник",
            "Подписчик"
          ],
          "why": "Редактор управляет страницами и публикациями, включая чужие. Автор ограничен собственными записями, а участник и подписчик не выполняют всю задачу."
        },
        {
          "k": "choice",
          "q": "У редактора нет пункта установки плагинов. Что проверить первым?",
          "options": [
            "Его роль и соответствие задачи выданным правам",
            "Нужно ли немедленно переустановить ядро",
            "Нужно ли удалить все страницы",
            "Достаточно ли крупных фотографий на главной"
          ],
          "why": "Стандартный редактор не устанавливает плагины. Отсутствие раздела может быть нормальным ограничением прав."
        },
        {
          "k": "choice",
          "q": "Перед важным обновлением есть архив, который никогда не восстанавливали. Как усилить подготовку?",
          "options": [
            "Проверить восстановление копии в отдельной среде и затем тестировать обновление",
            "Переименовать архив в «Надёжный»",
            "Сначала обновить всё на рабочем сайте",
            "Сделать скриншот кнопки обновления"
          ],
          "why": "Рабочая копия должна восстанавливаться. Тест в отдельной среде помогает обнаружить проблемы до изменения рабочего сайта."
        },
        {
          "k": "choice",
          "q": "В чистом WordPress ученик не находит обязательную настройку двухфакторного входа. Что корректно?",
          "options": [
            "Её наличие зависит от дополнительных средств и среды; не выдумывать переключатель ядра",
            "Она всегда находится в «Постоянных ссылках»",
            "Она включается изменением цвета темы",
            "Она гарантированно активна в любом новом сайте"
          ],
          "why": "Двухфакторная защита требует соответствующего решения. Чистое ядро не даёт универсальной обязательной настройки этой функции."
        },
        {
          "k": "input",
          "q": "Какой стандартный путь обычно открывает панель WordPress после домена? Введите путь с начальным слешем, без завершающего.",
          "a": [
            "/wp-admin"
          ],
          "why": "Путь /wp-admin ведёт в административную область; при отсутствии сессии сайт обычно предложит вход."
        },
        {
          "k": "choice",
          "q": "Три сотрудника используют один пароль администратора. Как исправить организацию доступа?",
          "options": [
            "Создать отдельные учётные записи с правами под задачи на рабочем этапе настройки",
            "Сделать пароль короче для удобства",
            "Публиковать пароль в каждом рабочем документе",
            "Переименовать все учётные записи одинаково"
          ],
          "why": "Отдельные записи позволяют ограничивать и отзывать доступ каждого участника. Общий администратор скрывает ответственность и выдаёт лишние права."
        }
      ]
    },
    {
      "id": "wp-05",
      "t": "Страницы, записи и фотографии обуви",
      "plan": "Создать постоянную страницу и новость, подготовить фотографию и проверить её альтернативный текст.",
      "theory": {
        "rule": "В WordPress страница подходит для постоянного раздела: «О нас», «Контакты», «Доставка». Запись подходит для материала во времени: новости коллекции или заметки об уходе за обувью. Дата у страницы тоже существует, но смысл различия не в наличии даты, а в организации содержимого. Карточку продаваемой обуви позже будем создавать как товар WooCommerce, а не как случайную запись блога.\nМедиатека хранит загруженные файлы. Один файл можно использовать на нескольких страницах; удаление из медиатеки способно нарушить эти вставки. Удалить блок изображения со страницы и удалить исходный файл — разные действия. Перед удалением проверяйте, где используется материал. Загружайте только разрешённые изображения без реальных данных клиентов.\nПодготовьте фотографию до загрузки: обрежьте лишний фон, выберите разумные размеры, сожмите файл и сравните качество с оригиналом. Уменьшение картинки мышью в редакторе меняет отображение, но не гарантирует уменьшения исходного файла. Для упражнения выберите собственный ориентир размера и веса, затем оцените читаемость деталей обуви. Универсального числа килобайт для всех фотографий нет: миниатюра и крупный обзор требуют разного качества.\nАльтернативный текст передаёт смысл изображения в конкретном месте. Для значимой фотографии обуви опишите видимые признаки, которые важны читателю, а не перечисляйте поисковые слова. Чисто декоративное изображение может иметь пустой alt. Подпись видна на странице и не заменяет альтернативный текст. Значение из медиатеки становится исходным при новых вставках; уже размещённый блок проверяйте отдельно, потому что его настройки могут отличаться.\nСохранённый черновик позволяет проверять материал до публикации. После вставки осмотрите изображение на узком экране: обувь не должна растягиваться, важная часть не должна исчезать при обрезке. Результат урока — два осмысленно выбранных типа материала и подготовленная фотография с проверенным контекстом использования.",
        "ex": [
          [
            "1. Подготовьте собственную или разрешённую фотографию обуви; сохраните исходник отдельно.\n2. В доступном редакторе изображений сделайте обрезанную и сжатую копию, запишите размеры и вес до и после; убедитесь, что детали различимы.\n3. В WordPress откройте «Медиафайлы → Добавить новый» и загрузите подготовленную копию.\n4. Откройте её сведения и заполните исходный альтернативный текст по видимым признакам, например цвету и типу обуви, если это соответствует фото.\n5. Создайте страницу «О нас — черновик» с коротким описанием учебного магазина и вставьте изображение из медиатеки.\n6. Выделите блок изображения и проверьте его alt в настройках; добавьте отдельную видимую подпись только при необходимости.\n7. Создайте запись «Новости учебной коллекции» с датируемым сообщением; сохраните оба материала черновиками.\n8. Откройте предпросмотр страницы на узкой ширине и повторно откройте оба черновика из списков. Экспортируйте ZIP и сохраните сравнение файлов.",
            "Практика с подсказками — 8 шагов"
          ],
          [
            "Возьмите другую разрешённую фотографию. Самостоятельно выберите кадрирование и степень сжатия, составьте alt для информационной фотографии и объясните, в каком другом контексте эта картинка могла бы быть декоративной. Создайте страницу с новой вставкой и проверьте её, не копируя текст практики. Артефакт — черновик и таблица «оригинал/копия».",
            "Самостоятельная работа"
          ],
          [
            "Есть отдельные страница и запись, изображение хранится в медиатеке, исходник сохранён. Подготовленная копия легче оригинала и остаётся читаемой. Alt проверен именно у вставленного блока. Тест: на узком предпросмотре обувь не искажена; описание помогает понять значимый кадр без изображения. Страница не выдаёт учебный материал за действующее предложение.",
            "Проверка результата"
          ],
          [
            "Ошибка: ученик уменьшил ширину фото в редакторе и решил, что файл стал лёгким. Диагноз: изменён размер отображения. Сравните вес исходного и подготовленного файла до загрузки и проверьте сведения медиатеки. Другая частая ошибка — изменение alt в медиатеке с ожиданием автоматического исправления всех старых вставок: проверьте каждую нужную вставку отдельно.",
            "Типичная ошибка и диагностика"
          ],
          [
            "Проверь учебную страницу обувного магазина: [текст, описание изображения, размеры и вес до/после, alt блока]. Объясни выбор страницы или записи и оцени, передаёт ли alt нужный смысл. Не выдумывай видимые детали без изображения; перечисли, что проверить вручную в предпросмотре. Ссылайся на официальные инструкции WordPress. Не запрашивай пароли, токены, аккаунты или реальные данные покупателей.",
            "Запрос к ИИ для проверки"
          ]
        ],
        "tip": "Сжатие файла, размер отображения и alt решают разные задачи. Источник: https://wordpress.org/documentation/article/image-block/"
      },
      "ex": [
        {
          "k": "choice",
          "q": "Нужно разместить постоянные контакты магазина. Какой тип содержимого выбрать на этом этапе?",
          "options": [
            "Страницу",
            "Запись с еженедельным повтором",
            "Категорию новостей вместо текста",
            "Файл изображения без страницы"
          ],
          "why": "Страницы подходят для постоянных разделов вне хронологии блога. Контакты должны оставаться доступными по стабильной структуре."
        },
        {
          "k": "choice",
          "q": "Фотография весила несколько мегабайт; в редакторе её растянули до меньшей ширины. Что проверить?",
          "options": [
            "Был ли подготовлен более лёгкий файл, а не только изменён размер отображения",
            "Изменилось ли имя пользователя автора",
            "Выбрана ли дата публикации в будущем",
            "Стало ли название страницы короче"
          ],
          "why": "Видимая ширина не гарантирует уменьшения исходного файла. Размеры и сжатие подготовленной копии проверяют отдельно."
        },
        {
          "k": "choice",
          "q": "На фото важен вид коричневых ботинок сбоку. Какой alt лучше соответствует задаче?",
          "options": [
            "Коричневые ботинки со шнуровкой, вид сбоку",
            "Купить обувь недорого обувь магазин обувь",
            "Изображение номер 872",
            "Самая качественная обувь в мире"
          ],
          "why": "Альтернативный текст описывает значимый видимый смысл, а не поисковые запросы, имя файла или неподтверждённые преимущества."
        },
        {
          "k": "choice",
          "q": "Один файл вставлен в три страницы. Ученик хочет убрать фото только с одной. Что сделать?",
          "options": [
            "Удалить блок изображения с нужной страницы, сохранив файл в медиатеке",
            "Удалить исходный файл из медиатеки",
            "Удалить все три страницы",
            "Переименовать файл в «Скрыто»"
          ],
          "why": "Удаление блока убирает конкретную вставку. Удаление общего файла может повредить остальные страницы."
        },
        {
          "k": "input",
          "q": "Как называется HTML-атрибут альтернативного текста изображения? Введите короткое имя латиницей.",
          "a": [
            "alt"
          ],
          "why": "Атрибут alt передаёт текстовую альтернативу. Видимая подпись и имя файла не заменяют его."
        },
        {
          "k": "choice",
          "q": "В медиатеке исправили alt, но старый блок страницы сохраняет прежнее описание. Что сделать?",
          "options": [
            "Проверить и исправить альтернативный текст именно у блока на этой странице",
            "Удалить весь сайт и импортировать тему",
            "Повторить alt десять раз в подписи",
            "Изменить дату страницы"
          ],
          "why": "У вставленного блока может быть собственное значение alt. Редактирование исходных сведений медиатеки не гарантирует изменения прежних вставок."
        }
      ]
    },
    {
      "id": "wp-06",
      "t": "Блоки, список структуры и паттерны",
      "plan": "Собрать секцию страницы, управлять вложенностью и проверить различие синхронизированного и обычного паттерна.",
      "theory": {
        "rule": "Блочный редактор собирает страницу из отдельных элементов: абзацев, заголовков, изображений, групп и кнопок. Когда выделен блок, его панель и настройки относятся к этому элементу. Настройки страницы управляют всей страницей. Перед изменением проверьте выделение: похожие кнопки не означают одинаковый масштаб действия. Текстовый абзац не нужно превращать в заголовок только ради крупного шрифта; заголовки показывают структуру смысла.\nСписок блоков раскрывает вложенность. Например, группа содержит заголовок, абзац и кнопку, а не существует рядом с ними. Через список легче выбрать родительскую группу, переместить секцию целиком и заметить случайно вложенный элемент. Начинайте с простой структуры, проверяйте порядок чтения и только затем настраивайте отступы. Не исправляйте каждый промежуток пустыми абзацами: используйте доступные настройки блока или группы.\nПаттерн — подготовленная комбинация блоков. Обычный несинхронизированный паттерн даёт независимые копии раскладки: изменения одной вставки не должны менять другую. Синхронизированный паттерн хранит общее содержимое, поэтому изменение исходного варианта отражается во всех его связанных вставках. Он подходит, например, для одинаковой учебной памятки. Для разных описаний моделей обуви общий синхронизированный текст обычно не подходит. В старых материалах похожую функцию называли многоразовыми блоками.\nРедактор показывает предварительный результат, но окончательную проверку проводите в предпросмотре страницы. Кнопка должна вести по понятной ссылке; если настоящая страница назначения ещё не создана, не имитируйте рабочий переход случайным адресом. Размещайте тренировочные секции в черновиках, чтобы спокойно проверять поведение. После изменения общего паттерна откройте обе страницы и убедитесь, что обновилась именно ожидаемая часть. Результат урока — две проверенные страницы, демонстрирующие разницу независимого оформления и общего содержимого, плюс понятное дерево блоков.",
        "ex": [
          [
            "1. Создайте черновик «Проверка блоков А» и откройте список блоков кнопкой List View («Обзор документа» или «Список» в переводе).\n2. Добавьте группу, а внутри — заголовок второго уровня, абзац и список из трёх признаков учебной коллекции.\n3. Через список выделите всю группу, переместите её и проверьте, что все дочерние блоки двигаются вместе.\n4. Через меню выбранной группы создайте паттерн без синхронизации; назовите его «Независимая секция».\n5. Вставьте этот паттерн дважды и измените текст только в одной копии; сравните их в предпросмотре.\n6. Создайте новую группу с короткой учебной памяткой и через её меню сохраните другой паттерн с включённой синхронизацией.\n7. Вставьте синхронизированный паттерн в черновик «Проверка блоков А» и сохраните страницу. Создайте и сохраните черновик «Проверка блоков Б» с той же вставкой; выберите «Редактировать оригинал» у паттерна, измените текст и сохраните его.\n8. Откройте предпросмотр обоих черновиков: общая памятка должна совпасть, независимые секции — сохранить отличия. Экспортируйте ZIP.",
            "Практика с подсказками — 8 шагов"
          ],
          [
            "Соберите самостоятельную секцию для страницы «О нас» из трёх разных типов блоков. Решите, какая информация магазина должна повторяться одинаково, а какая меняться на каждой странице; обоснуйте выбор режима паттерна. Покажите результат на двух черновиках и сохраните снимок списка блоков либо текстовое дерево.",
            "Самостоятельная работа"
          ],
          [
            "В дереве видно, какие блоки вложены в группу. У заголовков есть логичный порядок. Независимые копии различаются после правки одной. У синхронизированной памятки одинаковый новый текст на двух страницах. Тест: измените одну фразу общего паттерна и подтвердите обновление обеих вставок в предпросмотре после сохранения.",
            "Проверка результата"
          ],
          [
            "Ошибка: заменили текст «для кроссовок», а он изменился и на странице ботинок. Проверьте, не использован ли синхронизированный паттерн. Если тексты должны различаться, отсоедините нужную вставку от общего паттерна доступным действием редактора либо создайте независимую секцию. Перед исправлением сохраните копию; затем проверьте обе страницы, а не только текущую.",
            "Типичная ошибка и диагностика"
          ],
          [
            "Проверь мою структуру блоков и план паттернов: [дерево, где вставлены, что изменилось после теста]. Найди ненужную вложенность и риск непреднамеренного общего редактирования. Для каждой рекомендации назови наблюдаемый тест и официальный источник WordPress. Не считай тест выполненным без моего результата. Не запрашивай пароли, токены, реальные данные покупателей и доступ к аккаунтам.",
            "Запрос к ИИ для проверки"
          ]
        ],
        "tip": "Несинхронизированный паттерн копирует раскладку; синхронизированный связывает содержимое. Источник: https://wordpress.org/documentation/article/work-with-blocks/"
      },
      "ex": [
        {
          "k": "choice",
          "q": "При переносе секции двигается только её заголовок. Как перенести заголовок, текст и список вместе?",
          "options": [
            "В списке блоков выбрать их родительскую группу и переместить её",
            "Увеличить шрифт заголовка",
            "Сохранить страницу под другим названием",
            "Изменить альтернативный текст картинки"
          ],
          "why": "Группа объединяет дочерние блоки. Выбор родителя позволяет перемещать всю секцию целиком."
        },
        {
          "k": "choice",
          "q": "Одинаковая памятка должна обновляться на пяти страницах одной правкой. Что выбрать?",
          "options": [
            "Синхронизированный паттерн",
            "Пять независимых копий абзаца",
            "Пять отдельных скриншотов текста",
            "Обычный паттерн без синхронизации"
          ],
          "why": "Синхронизированный паттерн связывает вставки общим содержимым. Его правка распространяется на все связанные экземпляры."
        },
        {
          "k": "choice",
          "q": "Нужна одинаковая раскладка для разных описаний обуви, но текст каждой секции свой. Что выбрать?",
          "options": [
            "Несинхронизированный паттерн",
            "Один общий синхронизированный текст",
            "Одну страницу со всеми одинаковыми описаниями",
            "Общий шаблон с вписанным названием одной модели"
          ],
          "why": "Обычный паттерн служит заготовкой независимых блоков. После вставки их содержимое можно менять отдельно."
        },
        {
          "k": "choice",
          "q": "Ученик делает крупным каждый абзац через блок «Заголовок». Почему это стоит исправить?",
          "options": [
            "Уровни заголовков должны отражать смысловую структуру, а размер настраивается оформлением",
            "Каждый заголовок обязательно удаляет изображение",
            "Заголовки разрешены только в записях",
            "В WordPress нельзя менять размер обычного текста"
          ],
          "why": "Заголовки помогают навигации и пониманию иерархии. Использовать их только ради размера значит искажать структуру документа."
        },
        {
          "k": "input",
          "q": "Укажите английское имя инструмента, показывающего дерево блоков редактора. Два слова.",
          "a": [
            "List View"
          ],
          "why": "List View показывает порядок и вложенность блоков, помогает выбрать группу и её дочерние элементы."
        },
        {
          "k": "choice",
          "q": "После правки общего паттерна ученик проверил только текущую страницу. Как завершить проверку?",
          "options": [
            "Сохранить изменения и открыть обе страницы со связанными вставками",
            "Сменить название темы",
            "Добавить на каждую страницу пустой абзац",
            "Удалить список блоков"
          ],
          "why": "Цель проверки — убедиться в общем обновлении. Просмотр обеих страниц подтверждает поведение связанных вставок."
        }
      ]
    },
    {
      "id": "wp-07",
      "t": "Тема, шаблон и общая шапка сайта",
      "plan": "Различить тему и содержимое, настроить общую шапку и проверить навигацию на двух страницах.",
      "theory": {
        "rule": "Тема задаёт визуальные правила и структуру вывода сайта. Смена темы не равна удалению текстов страниц, но может изменить их отображение, расположение навигации и доступные настройки. Поэтому тему выбирают на учебной копии и проверяют несколько страниц, а не только красивую главную. В этом модуле используем уже доступную блочную тему без покупки или установки дополнительных инструментов.\nБлочная тема позволяет редактировать не только содержимое страницы, но и шаблоны сайта в редакторе сайта через «Внешний вид → Редактор». У классической темы обычно другой набор средств, например настройщик и отдельные меню; редактор сайта для неё недоступен. При этом классическая тема может поддерживать блочный редактор содержимого. Наличие блоков в тексте ещё не доказывает, что тема блочная.\nСтраница хранит конкретный материал. Шаблон определяет рамку его показа: где находятся заголовок, содержимое, шапка и подвал. Общая часть шаблона, например шапка, может использоваться на многих страницах. Если вписать в общий шаблон историю одной модели обуви, она может появиться там, где не нужна. Если удалить блок вывода содержимого, сама страница сохранится в панели, но её текст может исчезнуть из видимого результата.\nНавигация — набор переходов для посетителя. В блочной теме им управляет блок Navigation, то есть «Навигация». Он может показывать автоматический список страниц либо явно выбранные ссылки. Автоматическое добавление удобно при пробе, но способно вывести тестовые страницы. Для витрины лучше проверить состав и порядок вручную. Удаление ссылки меню не удаляет саму страницу.\nРаботайте с общей шапкой осознанно: перед сохранением прочитайте перечень изменённых объектов. После сохранения откройте две страницы, нажмите каждую ссылку и проверьте мобильное раскрытие меню. Результат урока — единая шапка и подтверждение, что оформление повторяется, а содержимое страниц остаётся разным.",
        "ex": [
          [
            "1. Экспортируйте ZIP перед изменением оформления; откройте «Внешний вид → Темы» и запишите активную тему.\n2. Проверьте наличие редактора сайта. Если тема классическая, используйте отдельный свежий Playground с уже установленной блочной темой либо активируйте уже установленную блочную тему в учебной копии.\n3. Подготовьте две страницы: переименуйте свой черновик о магазине в «О нас», создайте «Контакты» и опубликуйте их только внутри учебной песочницы.\n4. Откройте «Внешний вид → Редактор», найдите общую шапку через части шаблонов либо через шапку открытого шаблона; проверьте выбранный объект в списке блоков.\n5. Измените название учебного сайта в соответствующем блоке, а не вписывайте его заново в содержимое каждой страницы.\n6. Выберите блок «Навигация» и настройте две явные ссылки на «О нас» и «Контакты». Если показан автоматический список страниц, используйте доступное действие его редактирования перед ручной настройкой.\n7. Сохраните изменения, внимательно прочитав список затронутых шапок, шаблонов и меню; затем откройте обе страницы.\n8. Перейдите по обеим ссылкам, проверьте общую шапку и разное содержимое, сузьте окно и откройте меню. Запишите результат и экспортируйте ZIP.",
            "Практика с подсказками — 8 шагов"
          ],
          [
            "Добавьте в общую шапку собственную короткую учебную подпись, затем измените абзац только на странице «О нас». Самостоятельно проверьте обе страницы и опишите, какая правка распространилась на весь сайт, а какая осталась локальной. Артефакт — две страницы и протокол четырёх наблюдений: шапка, текст, ссылки, мобильное меню.",
            "Самостоятельная работа"
          ],
          [
            "Известны активная тема и тип редактора. Шапка общая для обеих проверяемых страниц; их содержимое различается. Меню ведёт на правильные страницы, тестовых ссылок нет. Тест: измените подпись шапки и абзац «О нас», сохраните и подтвердите общий и локальный эффект. На узкой ширине меню открывается и закрывается, все пункты доступны.",
            "Проверка результата"
          ],
          [
            "Ошибка: текст «О нас» появился и в контактах. Сначала проверьте, где была сделана правка: в самой странице, общем шаблоне или синхронизированном паттерне. Если текст попал в общий шаблон, перенесите его в содержимое страницы и восстановите блок вывода содержимого при необходимости. Не меняйте тему наугад: сравните выбранный объект и результат на двух страницах.",
            "Типичная ошибка и диагностика"
          ],
          [
            "Помоги проверить область действия изменений WordPress: активная тема [название], редактировал [страницу/шаблон/шапку], результаты на двух страницах [описание]. Предложи диагностику по официальной документации Site Editor и Navigation. Не придумывай отсутствующие пункты меню, укажи, что проверить в списке блоков. Не запрашивай пароли, токены или доступ к аккаунтам.",
            "Запрос к ИИ для проверки"
          ]
        ],
        "tip": "Страница хранит материал; шаблон задаёт его рамку; общая шапка повторяется. Источник: https://wordpress.org/documentation/article/site-editor/"
      },
      "ex": [
        {
          "k": "choice",
          "q": "Блоки доступны в тексте, но редактора сайта нет. Что это может означать?",
          "options": [
            "Активна классическая тема, поддерживающая блочный редактор содержимого",
            "WordPress обязательно повреждён",
            "Все страницы автоматически удалены",
            "Нужно публиковать каждую запись дважды"
          ],
          "why": "Классические темы могут использовать блоки в содержимом, но не предоставляют полноценный Site Editor блочной темы."
        },
        {
          "k": "choice",
          "q": "Название магазина должно одинаково измениться в шапке всех страниц. Где править?",
          "options": [
            "В общем блоке названия сайта или общей шапке, используемой этими страницами",
            "В каждом абзаце каждой страницы отдельно",
            "Только в заголовке одной записи",
            "В имени загруженной фотографии"
          ],
          "why": "Общая шапка и данные названия сайта обеспечивают повторяемое оформление. После сохранения всё равно проверяют несколько страниц."
        },
        {
          "k": "choice",
          "q": "После правки шаблона страница существует в панели, но её текст не виден. Что проверить?",
          "options": [
            "Сохранился ли в шаблоне блок вывода содержимого страницы",
            "Какого цвета значок браузера",
            "Достаточно ли короткое имя автора",
            "Создана ли категория для каждой страницы"
          ],
          "why": "Шаблон должен выводить содержимое. Если соответствующий блок удалён, сохранённый текст может не отображаться."
        },
        {
          "k": "choice",
          "q": "В меню внезапно появились все новые тренировочные страницы. Где искать причину?",
          "options": [
            "В навигации используется автоматический список страниц",
            "У каждой страницы слишком длинный alt",
            "Главная страница содержит изображение",
            "Пароль администратора сгенерирован автоматически"
          ],
          "why": "Автоматический список включает опубликованные страницы. Для контролируемого меню настройте явные ссылки и проверьте результат."
        },
        {
          "k": "input",
          "q": "Как называется английский блок меню в блочной теме? Введите одно слово.",
          "a": [
            "Navigation"
          ],
          "why": "Navigation — блок навигации; внутри него располагаются ссылки и при необходимости подменю."
        },
        {
          "k": "choice",
          "q": "Ученик убрал ссылку «Контакты» из меню. Что стало со страницей?",
          "options": [
            "Страница сохраняется; удалён только переход из этого меню",
            "Страница и все её изображения обязательно удалены",
            "Страница автоматически стала товаром",
            "Страница переместилась в базу WordPress.com"
          ],
          "why": "Меню хранит ссылки. Удаление пункта навигации само по себе не удаляет связанный материал."
        }
      ]
    },
    {
      "id": "wp-08",
      "t": "Пять страниц и мобильная приёмка",
      "plan": "Собрать основу учебного магазина, назначить главную страницу и проверить путь посетителя на узком экране.",
      "theory": {
        "rule": "Основа учебного магазина состоит из пяти страниц: «Главная», «Каталог», «О нас», «Контакты» и «Доставка». Главная объясняет, кому подходит обувь и куда перейти дальше. «О нас» даёт краткий контекст, контакты показывают учебный способ связи, доставка отвечает на вопрос о получении. Пока условия не подтверждены, помечайте сведения как вымышленные и не обещайте реальные сроки, стоимость или доступность товара.\n«Каталог» на этом этапе — подготовленная страница с честной пометкой о будущей настройке WooCommerce. В ней ещё нет работающего выбора размеров, корзины и оформления заказа. Не имитируйте покупку кнопкой, которая никуда не ведёт. Сохраните адрес этой страницы: позднее её можно будет назначить страницей магазина либо согласовать с автоматически созданной страницей WooCommerce, избежав двух конкурирующих каталогов.\nВ WordPress по умолчанию главная может показывать последние записи. Создать страницу с названием «Главная» недостаточно: её нужно назначить в «Настройки → Чтение» как статическую главную. В блочной теме на результат также влияет шаблон главной; если содержимое не совпало с ожиданием, проверьте настройки и шаблон, а не создавайте дубликат страницы. Отдельная страница записей нужна только при выбранной структуре блога.\nМобильная приёмка проверяет действия человека, а не только уменьшенную картинку. Прочитайте первый экран, раскройте меню, перейдите в каждый раздел и вернитесь на главную. Проверьте отсутствие горизонтальной прокрутки, обрезанных подписей, наложения блоков и недоступных ссылок. Предпросмотр полезен, но окончательный вывод о телефоне требует открытия на реальном устройстве в доступной для него среде; локальная песочница не становится публичной от публикации страницы. Результат урока — связанный каркас сайта и журнал наблюдений с исправлениями, который позже дополнится проверками магазина.",
        "ex": [
          [
            "1. Откройте список страниц и используйте готовые «О нас» и «Контакты»; создайте недостающие «Главная», «Каталог» и «Доставка» без дубликатов.\n2. На главной добавьте понятное описание учебного магазина и ссылку на существующую страницу каталога.\n3. На странице «Каталог» оставьте честное сообщение «Учебный каталог: товары и покупка будут настроены позднее»; не добавляйте ложную кнопку заказа.\n4. Заполните остальные страницы вымышленными сведениями с учебной пометкой. На доставке обозначьте, какие условия ещё предстоит подтвердить.\n5. Опубликуйте пять страниц внутри песочницы и в «Настройки → Чтение» выберите статическую страницу «Главная»; сохраните настройки.\n6. В общей навигации добавьте явные ссылки на пять страниц, проверьте порядок и сохраните связанные изменения.\n7. Откройте корневую страницу сайта, затем каждую ссылку; сузьте окно примерно до 360 пикселей и проверьте меню, тексты, изображения и отсутствие горизонтальной прокрутки.\n8. Запишите результаты по пяти страницам, исправьте найденное и повторите проблемные переходы. Экспортируйте ZIP; отдельно отметьте, выполнялся ли тест на реальном телефоне.",
            "Практика с подсказками — 8 шагов"
          ],
          [
            "Без подсказок пройдите путь нового посетителя: главная → каталог → доставка → контакты → главная. Исправьте минимум один обнаруженный недостаток либо обоснуйте результат каждой проверки, если дефектов нет. Артефакт — пять связанных страниц и журнал «действие / ожидание / наблюдение / исправление / повторный тест».",
            "Самостоятельная работа"
          ],
          [
            "В навигации ровно пять целевых страниц без дублей, главная назначена и открывается по корневому адресу. Каталог честно обозначен как будущий магазин. Все ссылки ведут в нужные разделы. На ширине около 360 пикселей нет обрезанных слов и боковой прокрутки, меню открывается и закрывается. Тест: выполнен полный путь посетителя; ограничения проверки на реальном телефоне записаны честно. Перед уроком 9 повтори шаги развёртывания из урока 3: тестовый хостинг с HTTPS, страницы и медиа, заново проверенные тема, главная и навигация. Один ZIP Playground не доказывает готовность размещения.",
            "Проверка результата"
          ],
          [
            "Ошибка: по корневому адресу открываются новости, хотя страница «Главная» уже создана. Сначала проверьте назначение статической главной в «Настройки → Чтение» и сохранение настройки. Если в блочной теме результат всё ещё иной, проверьте шаблон главной и вывод содержимого. Не создавайте вторую «Главную»: сначала выясните, какой объект показывается.",
            "Типичная ошибка и диагностика"
          ],
          [
            "Проверь журнал приёмки учебного обувного сайта: [пять страниц, путь посетителя, ширина проверки и наблюдения]. Найди непроверенные переходы и неподтверждённые обещания. Дай конкретные повторные тесты со ссылками на официальные инструкции WordPress. Не объявляй сайт готовым к продажам и не утверждай, что проверил телефон без данных. Не запрашивай пароли, токены, доступ или реальные данные покупателей.",
            "Запрос к ИИ для проверки"
          ]
        ],
        "tip": "Название страницы не назначает её главной; каркас сайта проверяют переходами. Источник: https://wordpress.org/documentation/article/create-a-static-front-page/"
      },
      "ex": [
        {
          "k": "choice",
          "q": "Страница «Главная» опубликована, но корневой адрес показывает записи. Что сделать первым?",
          "options": [
            "Назначить её статической главной в «Настройки → Чтение» и сохранить",
            "Создать ещё три страницы с тем же названием",
            "Удалить все записи без резервной копии",
            "Переименовать тему в «Магазин»"
          ],
          "why": "Название не определяет назначение страницы. Настройка чтения выбирает, что показывать по корневому адресу."
        },
        {
          "k": "choice",
          "q": "На этапе каркаса WooCommerce ещё не настроен. Как оформить страницу каталога?",
          "options": [
            "Честно указать учебный статус и будущую настройку товаров и покупки",
            "Показать кнопку «Оплатить», ведущую на пустую страницу",
            "Утверждать, что все размеры есть на складе",
            "Скопировать сроки доставки другого магазина как свои"
          ],
          "why": "Пользователь должен понимать фактические возможности. Каркас ещё не подтверждает продажу, остатки и оформление заказа."
        },
        {
          "k": "choice",
          "q": "Страница красиво выглядит в мобильном предпросмотре. Какой тест всё ещё нужен?",
          "options": [
            "Открыть меню и пройти реальные переходы, проверяя читаемость и прокрутку",
            "Оценить только размер логотипа",
            "Изменить все заголовки на прописные буквы",
            "Проверить лишь наличие пяти названий в панели"
          ],
          "why": "Внешнего вида недостаточно: на узкой ширине должны работать навигация и переходы, а содержимое оставаться доступным."
        },
        {
          "k": "choice",
          "q": "В песочнице нажали «Опубликовать» для пяти страниц. Что можно заключить?",
          "options": [
            "Страницы опубликованы внутри этой среды, но публичный магазин этим не создан",
            "Любой покупатель уже может оформить реальный заказ",
            "Домен автоматически зарегистрирован",
            "На телефоне другого человека гарантированно открывается тот же сайт"
          ],
          "why": "Публикация в WordPress меняет состояние материалов внутри текущей среды. Playground остаётся учебным браузерным окружением."
        },
        {
          "k": "input",
          "q": "Укажите английское имя настройки WordPress, через которую назначают статическую главную: Settings → ___. Одно слово.",
          "a": [
            "Reading"
          ],
          "why": "В настройках Reading выбирают отображение главной и назначают существующую статическую страницу."
        },
        {
          "k": "choice",
          "q": "После подключения WooCommerce позже появилась ещё одна страница магазина. Как сохранить понятную структуру?",
          "options": [
            "Согласовать назначение страницы магазина и оставить один основной путь каталога в навигации",
            "Показывать два одинаковых пункта «Каталог» без пояснения",
            "Удалить обе страницы до проверки назначения",
            "Назначить страницу «Контакты» корзиной"
          ],
          "why": "Страница магазина WooCommerce имеет специальное назначение. Его нужно согласовать с ранее созданным каркасом и проверить ссылки, чтобы посетитель не попадал в два конкурирующих каталога."
        }
      ]
    },
    {
      "id": "wp-x1",
      "t": "Экзамен 1: WordPress и первый сайт",
      "exam": true,
      "pass": 0.8,
      "covers": [
        "wp-01",
        "wp-02",
        "wp-03",
        "wp-04",
        "wp-05",
        "wp-06",
        "wp-07",
        "wp-08"
      ],
      "q": [
        {
          "q": "Владелец скачал WordPress с WordPress.org. Что ещё необходимо, чтобы сайт работал в интернете?",
          "options": [
            "Среда размещения с установленным WordPress и настроенным адресом",
            "Только профиль участника WordPress.org",
            "Публикация пяти записей в документе",
            "Название магазина в настройках браузера"
          ],
          "why": "Скачанный архив содержит программу. Для доступного сайта её нужно запустить в подходящей среде и настроить доступ.",
          "k": "choice",
          "s": "wp-01"
        },
        {
          "q": "Подрядчик говорит: «У вас самостоятельное размещение, значит сервер обязательно обслуживать вручную». Что уточнить?",
          "options": [
            "Хостинг может управлять сервером, сохраняя выбранную модель размещения WordPress",
            "WordPress.org всегда обслуживает сервер магазина",
            "Самостоятельное размещение запрещает службу поддержки",
            "Управляемый хостинг автоматически превращает сайт в WordPress.com"
          ],
          "why": "Self-hosted описывает размещение WordPress у выбранного провайдера, а степень обслуживания определяется услугой хостинга.",
          "k": "choice",
          "s": "wp-01"
        },
        {
          "q": "Вы работаете по адресу с storage=temp и собираетесь нажать F5. Что сначала сделать?",
          "options": [
            "Экспортировать ZIP и убедиться, что он сохранён вне браузерного хранилища сайта",
            "Добавить ещё один абзац без сохранения",
            "Скопировать только адрес вкладки",
            "Назвать страницу «Резервная копия»"
          ],
          "why": "Временная среда исчезает при перезагрузке всей вкладки. Ссылка и название страницы не содержат её изменённые данные.",
          "k": "choice",
          "s": "wp-02"
        },
        {
          "q": "Playground появился в списке автосохранений. Как оценить надёжность этого состояния?",
          "options": [
            "Это удобная точка продолжения, но нужен отдельный ZIP для переносимой копии",
            "Это бессрочный архив в любой учётной записи",
            "Это публикация магазина на сервере",
            "Это гарантия сохранения после очистки данных браузера"
          ],
          "why": "Автосохранения ограничены и зависят от браузерного хранилища. Переносимый архив хранится отдельно.",
          "k": "choice",
          "s": "wp-02"
        },
        {
          "k": "choice",
          "q": "На хостинге есть старая версия PHP, на которой WordPress ещё запускается. Как выбирать среду нового магазина?",
          "options": [
            "Сверить актуальные рекомендуемые требования WordPress и будущих расширений",
            "Выбрать минимально запускающуюся версию навсегда",
            "Ориентироваться только на год регистрации домена",
            "Проверить лишь цвет установщика"
          ],
          "why": "Работоспособность старой версии не означает её актуальную поддержку и пригодность. Нужна сверка текущих требований и совместимости.",
          "s": "wp-03"
        },
        {
          "k": "choice",
          "q": "Сайт открывается по HTTPS. Что это подтверждает при корректном сертификате?",
          "options": [
            "Защищено соединение браузера с сайтом по этому адресу",
            "Все плагины уже обновлены",
            "Продавец обязательно исполнит заказ",
            "Резервная копия проверена восстановлением"
          ],
          "why": "HTTPS защищает канал передачи данных. Обновления, честность продавца и резервные копии проверяются отдельно.",
          "s": "wp-03"
        },
        {
          "k": "choice",
          "q": "Сотрудник должен редактировать все страницы и публикации, но не устанавливать расширения. Какая стандартная роль подходит?",
          "options": [
            "Редактор",
            "Автор",
            "Участник",
            "Подписчик"
          ],
          "why": "Редактор управляет страницами и публикациями, включая чужие. Автор ограничен собственными записями, а участник и подписчик не выполняют всю задачу.",
          "s": "wp-04"
        },
        {
          "k": "choice",
          "q": "У редактора нет пункта установки плагинов. Что проверить первым?",
          "options": [
            "Его роль и соответствие задачи выданным правам",
            "Нужно ли немедленно переустановить ядро",
            "Нужно ли удалить все страницы",
            "Достаточно ли крупных фотографий на главной"
          ],
          "why": "Стандартный редактор не устанавливает плагины. Отсутствие раздела может быть нормальным ограничением прав.",
          "s": "wp-04"
        },
        {
          "k": "choice",
          "q": "Нужно разместить постоянные контакты магазина. Какой тип содержимого выбрать на этом этапе?",
          "options": [
            "Страницу",
            "Запись с еженедельным повтором",
            "Категорию новостей вместо текста",
            "Файл изображения без страницы"
          ],
          "why": "Страницы подходят для постоянных разделов вне хронологии блога. Контакты должны оставаться доступными по стабильной структуре.",
          "s": "wp-05"
        },
        {
          "k": "choice",
          "q": "Фотография весила несколько мегабайт; в редакторе её растянули до меньшей ширины. Что проверить?",
          "options": [
            "Был ли подготовлен более лёгкий файл, а не только изменён размер отображения",
            "Изменилось ли имя пользователя автора",
            "Выбрана ли дата публикации в будущем",
            "Стало ли название страницы короче"
          ],
          "why": "Видимая ширина не гарантирует уменьшения исходного файла. Размеры и сжатие подготовленной копии проверяют отдельно.",
          "s": "wp-05"
        },
        {
          "k": "choice",
          "q": "При переносе секции двигается только её заголовок. Как перенести заголовок, текст и список вместе?",
          "options": [
            "В списке блоков выбрать их родительскую группу и переместить её",
            "Увеличить шрифт заголовка",
            "Сохранить страницу под другим названием",
            "Изменить альтернативный текст картинки"
          ],
          "why": "Группа объединяет дочерние блоки. Выбор родителя позволяет перемещать всю секцию целиком.",
          "s": "wp-06"
        },
        {
          "k": "choice",
          "q": "Одинаковая памятка должна обновляться на пяти страницах одной правкой. Что выбрать?",
          "options": [
            "Синхронизированный паттерн",
            "Пять независимых копий абзаца",
            "Пять отдельных скриншотов текста",
            "Обычный паттерн без синхронизации"
          ],
          "why": "Синхронизированный паттерн связывает вставки общим содержимым. Его правка распространяется на все связанные экземпляры.",
          "s": "wp-06"
        },
        {
          "k": "choice",
          "q": "Блоки доступны в тексте, но редактора сайта нет. Что это может означать?",
          "options": [
            "Активна классическая тема, поддерживающая блочный редактор содержимого",
            "WordPress обязательно повреждён",
            "Все страницы автоматически удалены",
            "Нужно публиковать каждую запись дважды"
          ],
          "why": "Классические темы могут использовать блоки в содержимом, но не предоставляют полноценный Site Editor блочной темы.",
          "s": "wp-07"
        },
        {
          "k": "choice",
          "q": "Название магазина должно одинаково измениться в шапке всех страниц. Где править?",
          "options": [
            "В общем блоке названия сайта или общей шапке, используемой этими страницами",
            "В каждом абзаце каждой страницы отдельно",
            "Только в заголовке одной записи",
            "В имени загруженной фотографии"
          ],
          "why": "Общая шапка и данные названия сайта обеспечивают повторяемое оформление. После сохранения всё равно проверяют несколько страниц.",
          "s": "wp-07"
        },
        {
          "k": "choice",
          "q": "Страница «Главная» опубликована, но корневой адрес показывает записи. Что сделать первым?",
          "options": [
            "Назначить её статической главной в «Настройки → Чтение» и сохранить",
            "Создать ещё три страницы с тем же названием",
            "Удалить все записи без резервной копии",
            "Переименовать тему в «Магазин»"
          ],
          "why": "Название не определяет назначение страницы. Настройка чтения выбирает, что показывать по корневому адресу.",
          "s": "wp-08"
        },
        {
          "k": "choice",
          "q": "На этапе каркаса WooCommerce ещё не настроен. Как оформить страницу каталога?",
          "options": [
            "Честно указать учебный статус и будущую настройку товаров и покупки",
            "Показать кнопку «Оплатить», ведущую на пустую страницу",
            "Утверждать, что все размеры есть на складе",
            "Скопировать сроки доставки другого магазина как свои"
          ],
          "why": "Пользователь должен понимать фактические возможности. Каркас ещё не подтверждает продажу, остатки и оформление заказа.",
          "s": "wp-08"
        },
        {
          "q": "Как называется параметр вместе со значением, явно включающий временный Playground? Введите без вопросительного знака.",
          "a": [
            "storage=temp"
          ],
          "why": "Этот параметр создаёт временную среду, теряемую при обновлении браузерной вкладки или её закрытии.",
          "k": "input",
          "s": "wp-02"
        },
        {
          "k": "input",
          "q": "Какой стандартный путь обычно открывает панель WordPress после домена? Введите путь с начальным слешем, без завершающего.",
          "a": [
            "/wp-admin"
          ],
          "why": "Путь /wp-admin ведёт в административную область; при отсутствии сессии сайт обычно предложит вход.",
          "s": "wp-04"
        },
        {
          "k": "input",
          "q": "Укажите английское имя инструмента, показывающего дерево блоков редактора. Два слова.",
          "a": [
            "List View"
          ],
          "why": "List View показывает порядок и вложенность блоков, помогает выбрать группу и её дочерние элементы.",
          "s": "wp-06"
        },
        {
          "k": "input",
          "q": "Укажите английское имя настройки WordPress, через которую назначают статическую главную: Settings → ___. Одно слово.",
          "a": [
            "Reading"
          ],
          "why": "В настройках Reading выбирают отображение главной и назначают существующую статическую страницу.",
          "s": "wp-08"
        }
      ]
    },
    {
      "id": "wp-09",
      "t": "WooCommerce: основа учебного магазина",
      "plan": "Установить WooCommerce, выбрать рубли, назначить служебные страницы и закрыть витрину на время разработки.",
      "theory": {
        "rule": "WooCommerce добавляет к WordPress товары, корзину, оформление заказов и управление продажами. В нашем проекте это учебный магазин обуви: все цены, остатки и заказы служат упражнениями. Самостоятельный WordPress.org уже должен работать на хостинге с HTTPS, а блочная тема — быть активной. Перед установкой сделай резервную копию файлов и базы данных, чтобы можно было вернуться к предыдущему состоянию.\n\nУстанавливай основной WooCommerce из официального каталога плагинов. Мастер первого запуска помогает заполнить сведения о магазине, но его рекомендации дополнительных сервисов не становятся обязательными. Для учебного проекта достаточно самого WooCommerce. Не подключай платные услуги и боевой приём денег по предложению мастера. Названия экранов меняются между версиями; нужные параметры всегда проверяй в настройках магазина.\n\nВ общих настройках выбери российский рубль, обозначаемый кодом RUB, и учебные регионы продаж и доставки. Валюта относится к числовым ценам товаров: замена символа на странице сама по себе её не меняет. Не назначай налоговые ставки наугад; юридические и налоговые настройки разбираются отдельно перед реальным запуском.\n\nПроверь страницы «Магазин», «Корзина», «Оформление заказа» и «Мой аккаунт». Существование страницы ещё не означает, что WooCommerce использует именно её. Магазин назначается в настройках товаров, остальные основные страницы — в дополнительных настройках. Не создавай дубликаты без проверки назначений.\n\nПока витрина не готова, включи Coming soon в разделе видимости сайта. Можно закрыть весь сайт или только магазин. Проверяй результат в приватном окне без входа администратора. Закрытие витрины управляет доступом посетителей, а платёжный тестовый режим управляет операциями: эти настройки решают разные задачи и понадобятся одновременно.",
        "ex": [
          [
            "1. Сделай резервную копию учебного сайта и запиши способ восстановления.\n2. Открой «Плагины → Добавить новый», найди официальный WooCommerce и проверь карточку разработчика.\n3. Установи и активируй плагин; пройди мастер без покупки дополнительных услуг.\n4. В «WooCommerce → Настройки → Основные» выбери российский рубль RUB и учебные регионы.\n5. В «Товары» проверь назначение страницы магазина.\n6. В «Дополнительно» проверь назначения корзины, оформления заказа и аккаунта; открой сами страницы.\n7. В «Видимость сайта» включи Coming soon для магазина и сохрани настройки.\n8. Открой магазин в приватном окне: посетитель видит заглушку, а администратор может проверять витрину.",
            "Практика с подсказками: 8 шагов"
          ],
          [
            "Заполни паспорт демомагазина: название, валюта, разрешённые регионы и четыре назначенные страницы. Проверь ссылки из меню. Запиши, какие необязательные предложения мастера ты пропустил, и оставь магазин в Coming soon.",
            "Самостоятельная работа"
          ],
          [
            "Готово, если: WooCommerce активен; валюта в настройках — RUB; четыре служебные страницы существуют и назначены по назначению; случайных дублей нет; в приватном окне каталог закрыт заглушкой; резервная копия доступна; боевые платежи не подключены.",
            "Критерии готовности"
          ],
          [
            "Симптом: администратор видит товары и решает, что Coming soon не работает. Диагностика: открой магазин в новом приватном окне без авторизации и без приватной ссылки. Если каталог доступен, проверь сохранение режима и ограничение «только страницы магазина». Если сломаны переходы корзины, сначала сравни назначения страниц, затем их содержимое.",
            "Ошибка и диагностика"
          ],
          [
            "Помоги проверить начальную настройку учебного WooCommerce на WordPress.org с блочной темой. Мои несекретные данные: валюта [код], названия назначенных страниц [список], режим видимости [режим], результат в приватном окне [наблюдение]. Составь порядок проверки без установки дополнительных плагинов. Не проси пароль администратора, приватную ссылку, ключи или доступ к хостингу.",
            "Запрос к ИИ"
          ]
        ],
        "tip": "Результат урока — закрытый учебный магазин с рублями и рабочими назначениями страниц. Источники: https://woocommerce.com/document/configuring-woocommerce-settings/ ; https://woocommerce.com/document/configuring-woocommerce-settings/coming-soon-mode/"
      },
      "ex": [
        {
          "k": "choice",
          "q": "Где задаётся валюта цен магазина?",
          "options": [
            "В общих настройках WooCommerce",
            "В названии страницы магазина",
            "В подписи кнопки «Купить»",
            "В альтернативном тексте изображения"
          ],
          "why": "Валюта — настройка WooCommerce. Текстовая подпись на странице не меняет валюту расчётов."
        },
        {
          "k": "choice",
          "q": "Что нужно проверить после появления страницы «Корзина»?",
          "options": [
            "Назначена ли она страницей корзины в WooCommerce",
            "Есть ли у неё родительская страница",
            "Совпадает ли её заголовок с названием темы",
            "Добавлена ли она в категорию товаров"
          ],
          "why": "WooCommerce связывает свои функции с назначенными страницами; одного заголовка недостаточно."
        },
        {
          "k": "choice",
          "q": "Как проверить закрытие магазина для посетителей?",
          "options": [
            "Открыть его без авторизации в приватном окне",
            "Посмотреть витрину в сессии администратора",
            "Убедиться, что плагин WooCommerce активен",
            "Проверить наличие логотипа магазина"
          ],
          "why": "Администратор может видеть закрытую витрину. Нужна проверка со стороны обычного посетителя."
        },
        {
          "k": "choice",
          "q": "Мастер предлагает дополнительные платные сервисы. Что выбрать для нашего демопроекта?",
          "options": [
            "Пропустить необязательные предложения и настроить ядро магазина",
            "Подключить каждое предложение для работы корзины",
            "Включить боевой эквайринг перед созданием товара",
            "Заменить блочную тему платным конструктором"
          ],
          "why": "Учебный каталог и корзина работают на основном WooCommerce без обязательной покупки рекомендаций мастера."
        },
        {
          "k": "input",
          "q": "Введи трёхбуквенный код российского рубля латиницей.",
          "a": [
            "RUB"
          ],
          "why": "RUB — код валюты российского рубля; символ ₽ — обозначение, а не трёхбуквенный код."
        },
        {
          "k": "choice",
          "q": "Что обеспечивает Coming soon?",
          "options": [
            "Ограничение доступа посетителей к готовящейся витрине",
            "Перевод всех платежей в тестовый режим",
            "Автоматический возврат оплаченных заказов",
            "Проверку налоговых настроек магазина"
          ],
          "why": "Coming soon относится к видимости сайта. Настройки тестовых платежей выполняются отдельно."
        }
      ]
    },
    {
      "id": "wp-10",
      "t": "Простой товар: цена, артикул, остаток и фотографии",
      "plan": "Создать простой физический товар, включить количественный учёт и проверить карточку и корзину.",
      "theory": {
        "rule": "Простой товар подходит для позиции, которую покупают без выбора размера или цвета внутри карточки. В учебном магазине такой позицией будет одна конкретная пара «Кеды Старт, белые, размер 40». Покупатель сразу понимает, какую пару получит. Если размеры должны выбираться в одной карточке, понадобится вариативный товар из следующего урока.\n\nУ товара есть название, описание, краткое описание, цена и изображения. Название помогает найти модель, краткое описание отвечает на основные вопросы рядом с покупкой, полное раскрывает материал, уход и особенности посадки. Не выдумывай характеристики реального бренда: работаем с вымышленной моделью и собственными либо разрешёнными фотографиями. Основное изображение представляет позицию в каталоге, галерея показывает её с других сторон. Альтернативный текст описывает видимое содержание изображения.\n\nАртикул, или SKU, идентифицирует товар в учёте. Это отдельное поле, которое должно содержать уникальное значение по магазину. Придумай понятную схему, например DEMO-START-WHT-40. Не используй название модели вместо уникального артикула для нескольких разных позиций.\n\nЦена хранится числом; рубли определяются настройкой валюты. Пустая цена отличается от нулевой: ноль означает бесплатный товар. Для упражнения поставь обычную цену 3900 и оставь распродажную пустой. Обувь физическая, поэтому признаки виртуального и скачиваемого товара нам не подходят.\n\nКоличество начинает учитываться, когда управление запасами включено в настройках магазина и у конкретного товара. Задай три пары и запрети предзаказы. Проверяй число в карточке администратора и поведение корзины, а не только надпись «В наличии». Доступность также зависит от публикации, видимости каталога и цены. Сохранение карточки завершается проверкой витрины, где покупатель должен увидеть согласованные название, фото, сумму и остаток.",
        "ex": [
          [
            "1. В «Товары → Добавить новый» создай «Кеды Старт, белые, размер 40».\n2. Выбери тип «Простой товар» и оставь признаки виртуального и скачиваемого товара выключенными.\n3. Напиши краткое описание и отдельное полное описание с вымышленными характеристиками.\n4. Укажи обычную цену 3900, распродажную оставь пустой; проверь RUB в настройках магазина.\n5. Заполни SKU значением DEMO-START-WHT-40.\n6. Включи общий и товарный учёт запасов, укажи остаток 3 и запрети предзаказы.\n7. Добавь основное изображение и два других ракурса в галерею, заполни осмысленный alt.\n8. Опубликуй внутри закрытой витрины, открой карточку и добавь одну пару в корзину; затем очисти корзину.",
            "Практика с подсказками: 8 шагов"
          ],
          [
            "Самостоятельно создай второй простой товар «Кеды Старт, чёрные, размер 41» за 4100 ₽, с остатком 2 и отдельным SKU. Сними или подготовь собственные иллюстративные фото. Сравни две карточки: покупатель должен отличать их без чтения артикула.",
            "Самостоятельная работа"
          ],
          [
            "Готово, если: тип товара простой и физический; SKU уникален; цена 3900 ₽ у первого товара; остаток 3 и предзаказы запрещены; основное фото и два ракурса открываются; краткое описание видно; одна пара добавляется в корзину с правильной суммой; реальный заказ не оплачивался.",
            "Критерии готовности"
          ],
          [
            "Симптом: товар помечен «В наличии», но число пар не меняется или не ограничивает корзину. Проверь общий переключатель управления запасами и отдельный переключатель товара, затем количество и предзаказы. Если кнопка покупки отсутствует, проверь цену, статус публикации и наличие; пустое поле цены не равнозначно бесплатной позиции.",
            "Ошибка и диагностика"
          ],
          [
            "Проверь качество учебной карточки обуви: [название], [тип товара], [вымышленные характеристики], [цена], [остаток], [тексты]. Найди противоречия и предложи более понятное краткое описание без неподтверждённых обещаний. Не придумывай бренд, сертификаты, отзывы или свойства. Не запрашивай доступы и данные покупателей.",
            "Запрос к ИИ"
          ]
        ],
        "tip": "У простой позиции покупатель не выбирает комбинацию параметров; её цена и запас должны быть проверены в корзине. Источники: https://woocommerce.com/document/managing-products/product-editor-settings/ ; https://woocommerce.com/document/configuring-woocommerce-settings/products/ ; https://woocommerce.com/document/adding-product-images-and-galleries/"
      },
      "ex": [
        {
          "k": "choice",
          "q": "Какая позиция подходит для простого товара в этом уроке?",
          "options": [
            "Одна модель в одном заданном размере и цвете",
            "Одна модель с выбором из пяти размеров",
            "Карточка с шестью цветовыми вариациями",
            "Категория со всеми кедами магазина"
          ],
          "why": "Простой товар покупают без выбора товарной вариации. Конкретный размер можно явно указать в его названии."
        },
        {
          "k": "choice",
          "q": "Что означает пустое поле обычной цены?",
          "options": [
            "Цена не задана; это не бесплатный товар",
            "Товар бесплатно добавляется в корзину",
            "Берётся цена соседней карточки",
            "Автоматически применяется цена категории"
          ],
          "why": "Нулевая цена и отсутствующая цена — разные состояния. Для продаваемой позиции нужна заданная цена."
        },
        {
          "k": "choice",
          "q": "Как ограничить продажу тремя парами?",
          "options": [
            "Включить учёт запасов, указать 3 и запретить предзаказы",
            "Написать «Осталось 3 пары» в описании",
            "Добавить цифру 3 в артикул",
            "Загрузить три изображения товара"
          ],
          "why": "Текст не управляет запасом: нужны настройки количественного учёта и запрет покупки сверх остатка."
        },
        {
          "k": "choice",
          "q": "Чем основное изображение отличается от галереи?",
          "options": [
            "Основное представляет товар, галерея показывает дополнительные ракурсы",
            "Основное используется только в письмах",
            "Галерея определяет количество на складе",
            "Основное обязательно содержит артикул поверх фотографии"
          ],
          "why": "Главное фото представляет позицию в каталоге и карточке. Галерея дополняет его другими изображениями."
        },
        {
          "k": "input",
          "q": "Какой трёхбуквенной аббревиатурой обозначают артикул в интерфейсе WooCommerce?",
          "a": [
            "SKU"
          ],
          "why": "Поле SKU хранит уникальный артикул товара или вариации."
        },
        {
          "k": "choice",
          "q": "Как проверить сохранённую цену практически?",
          "options": [
            "Добавить одну пару в корзину и сравнить сумму с карточкой",
            "Сравнить размер файла главного фото",
            "Открыть список установленных тем",
            "Прочитать название рубрики блога"
          ],
          "why": "Проверка карточки вместе с корзиной показывает, что покупатель получает ожидаемую позицию и цену."
        }
      ]
    },
    {
      "id": "wp-11",
      "t": "Вариативная обувь: размеры, цвета и остатки",
      "plan": "Создать модель с комбинациями размера и цвета, задать цены и отдельные остатки вариаций.",
      "theory": {
        "rule": "Вариативный товар объединяет одну модель с вариантами выбора. Для кроссовок «Город» зададим размеры 40 и 41, цвета белый и чёрный. Получаются четыре комбинации. Родительская карточка описывает модель в целом, а вариация отвечает за конкретную пару размера и цвета. Покупатель выбирает все обязательные параметры перед добавлением в корзину.\n\nАтрибут описывает характеристику, но сам по себе не создаёт продаваемые варианты. Сначала добавь атрибуты к товару и отметь использование для вариаций, затем создай комбинации в разделе вариаций. Для дальнейших фильтров удобнее глобальные атрибуты из раздела «Товары → Атрибуты». Не заводи отдельно «чёрный», «Черный» и «Black», если это один и тот же цвет.\n\nКаждой включённой вариации нужна цена. Без неё вариация недоступна для покупки и может не отображаться посетителю. Общая фотография или заполненное описание родителя цену не заменяют. Для упражнения всем четырём комбинациям назначим 5900 ₽. Позже цены могут различаться; тогда в каталоге появление диапазона не означает ошибку.\n\nДля обуви остатки удобно считать на уровне вариаций: белый 40 — две пары, белый 41 — одна, чёрный 40 — ноль, чёрный 41 — три. У каждой продаваемой комбинации свой SKU. Родительский общий запас в этом упражнении не включай, чтобы не смешивать две модели учёта. Предзаказы запрети у вариаций; фотографию чёрной пары привяжи к соответствующим вариантам.\n\nПроверяй комбинации последовательно. Сравни выбранные параметры, изображение, цену и наличие, затем строку корзины. Если интерфейс скрывает отсутствующие варианты, это зависит от настроек наличия; главное — исключить покупку отсутствующей пары. Автоматическая генерация комбинаций экономит клики, но не проверяет склад и не заполняет коммерческие данные за тебя.",
        "ex": [
          [
            "1. Создай глобальные атрибуты «Размер» со значениями 40, 41 и «Цвет» со значениями Белый, Чёрный.\n2. Добавь «Кроссовки Город» и выбери «Вариативный товар».\n3. Назначь оба глобальных атрибута; отметь использование для вариаций и сохрани атрибуты.\n4. В «Вариации» создай четыре комбинации размера и цвета.\n5. Включи каждую вариацию, укажи цену 5900 и уникальный SKU по схеме DEMO-CITY-WHT-40.\n6. Включи учёт на уровне вариаций, задай остатки 2, 1, 0, 3 по таблице урока и запрети предзаказы.\n7. Привяжи изображения к цветам, сохрани вариации и обнови товар.\n8. На витрине проверь все четыре комбинации: доступные добавляются с правильными параметрами, чёрный 40 купить нельзя.",
            "Практика с подсказками: 8 шагов"
          ],
          [
            "Добавь размер 42 только для белого цвета с ценой 6100 ₽ и остатком 1. Не создавай отсутствующую чёрную пару 42. Составь таблицу пяти фактически заведённых вариаций с ценой, SKU и количеством и сверь её с корзиной.",
            "Самостоятельная работа"
          ],
          [
            "Готово, если: у модели четыре исходные комбинации и одна дополнительная белая 42; у каждой есть цена и уникальный SKU; остатки соответствуют таблице; предзаказы выключены; цвет меняет подходящее фото; нулевой чёрный 40 недоступен; в корзине сохраняются размер и цвет; цена белого 42 равна 6100 ₽.",
            "Критерии готовности"
          ],
          [
            "Симптом: размер есть в списке атрибутов, но выбрать пару и купить нельзя. Открой вариации: проверь существование нужной комбинации, флажок включения, цену и наличие. Затем проверь, сохранены ли атрибуты для вариаций. Если запас уменьшается у всей модели вместо размера, сравни родительский и вариационный уровни учёта.",
            "Ошибка и диагностика"
          ],
          [
            "Я создал учебную вариативную модель обуви. Вот таблица без личных данных: [размер, цвет, цена, остаток, условный SKU]. Проверь полноту комбинаций и предложи проверки для отсутствующей цены, нулевого остатка и неверного фото. Не создавай отсутствующие на складе пары и не запрашивай ключи или доступ к сайту.",
            "Запрос к ИИ"
          ]
        ],
        "tip": "Продаётся конкретная вариация: ей нужны цена, доступность и понятный остаток. Источник: https://woocommerce.com/document/variable-product/ ; глобальные атрибуты: https://woocommerce.com/document/managing-product-taxonomies/"
      },
      "ex": [
        {
          "k": "choice",
          "q": "Атрибуты размера и цвета уже добавлены. Что ещё нужно для покупки комбинации?",
          "options": [
            "Создать включённую вариацию с ценой и доступным остатком",
            "Добавить цвета в меню сайта",
            "Создать отдельную страницу WordPress для размера",
            "Вставить название цвета в подвал"
          ],
          "why": "Атрибуты задают возможные значения. Продаваемая комбинация создаётся и настраивается как вариация."
        },
        {
          "k": "choice",
          "q": "Что произойдёт с вариацией без цены?",
          "options": [
            "Её нельзя купить; она может не отображаться",
            "Она бесплатно продаётся по нулевой цене",
            "Она автоматически получает цену доставки",
            "Её цена берётся из названия модели"
          ],
          "why": "Для вариации нужна собственная цена. Отсутствующее значение не превращается в ноль."
        },
        {
          "k": "choice",
          "q": "Почему для обуви считаем запас по вариациям?",
          "options": [
            "Чтобы отдельно учитывать каждый размер и цвет",
            "Чтобы количество фотографий совпадало с заказами",
            "Чтобы все размеры делили один случайный остаток",
            "Чтобы категории заменяли складской учёт"
          ],
          "why": "Остаток белого размера 40 не должен позволять купить отсутствующий чёрный размер 40."
        },
        {
          "k": "choice",
          "q": "Белый 42 существует, чёрного 42 нет. Что делать?",
          "options": [
            "Создать только фактически доступную комбинацию белого 42",
            "Создать чёрный 42 с фиктивным запасом",
            "Изменить все чёрные размеры на 42",
            "Удалить размер 42 из модели целиком"
          ],
          "why": "Вариации должны отражать реальные комбинации учебного каталога. Полная матрица не обязательна."
        },
        {
          "k": "input",
          "q": "Какой размер указан в SKU DEMO-CITY-WHT-42? Введи только две цифры.",
          "a": [
            "42"
          ],
          "why": "Последний сегмент заданной учебной схемы артикула содержит размер 42."
        },
        {
          "k": "choice",
          "q": "Что проверяем в строке корзины после выбора кроссовок?",
          "options": [
            "Модель, размер, цвет, количество и цену",
            "Только цвет кнопки оформления",
            "Только заголовок страницы магазина",
            "Количество установленных расширений"
          ],
          "why": "Выбор вариации должен сохраниться в корзине вместе с корректной суммой и количеством."
        }
      ]
    },
    {
      "id": "wp-12",
      "t": "Категории, глобальные атрибуты и фильтры",
      "plan": "Систематизировать каталог и настроить нативные фильтры WooCommerce рядом с коллекцией товаров.",
      "theory": {
        "rule": "Категории помогают пройти по разделам ассортимента: «Кеды», «Кроссовки», «Ботинки». Атрибуты описывают свойства: размер, цвет, материал. В обувном магазине один товар относится к категории «Кроссовки» и имеет атрибут «Цвет: Белый». Если превратить каждый размер в категорию, каталог станет трудно поддерживать и фильтровать. Назначай категории по типу обуви, а повторяемые характеристики храни в атрибутах.\n\nГлобальный атрибут создаётся один раз в разделе «Товары → Атрибуты». Его значения можно назначать разным товарам. Так «Белый» обозначает одно значение во всём магазине. Локальный атрибут внутри единственной карточки полезен для отдельных описаний, но для нашего общего фильтра выбираем глобальный. После создания справочника значения всё равно нужно назначить самим товарам; пустой справочник не наполняет каталог автоматически.\n\nВ блочной теме каталог выводит блок Product Collection, или «Коллекция товаров». Современный встроенный Product Filters работает вместе с коллекцией на той же странице или в том же шаблоне. Внутри размещаются фильтры цены, атрибута и наличия, а также отображение активных фильтров. Названия и доступные настройки зависят от версии, поэтому сверяй установленный WooCommerce с актуальной документацией. Платное расширение с похожим названием для этой практики не требуется.\n\nСначала подготовь несколько различающихся товаров: иначе фильтровать будет нечего. Проверь белые и чёрные модели, несколько цен, размерные значения. Фильтрация каталога помогает найти модель, но не заменяет проверку доступности конкретной вариации. После выбора модели покупателю всё равно нужно указать размер и цвет в карточке.\n\nХороший фильтр понятен без инструкции. Покажи выбранные условия и возможность их сбросить, проверь пустую выдачу и мобильный экран. Не обещай наличие выбранной пары только потому, что карточка модели попала в результаты: проверь фактическую вариацию отдельно.",
        "ex": [
          [
            "1. Создай категории «Кеды» и «Кроссовки» в «Товары → Категории».\n2. Назначь простые кеды первой категории, а модель «Город» — второй.\n3. Проверь глобальные «Размер» и «Цвет»; убери дубли значений после проверки назначений.\n4. Назначь соответствующие глобальные значения простым товарам, чтобы они тоже участвовали в фильтре.\n5. Открой «Внешний вид → Редактор → Шаблоны → Каталог товаров» и найди Product Collection.\n6. Добавь рядом встроенный Product Filters с фильтрами цены, цвета и наличия.\n7. Добавь отображение активных фильтров; сохрани шаблон и проверь фильтр белого цвета на витрине.\n8. Проверь сброс, сочетание цены и цвета, отсутствие результатов и работу на узком экране.",
            "Практика с подсказками: 8 шагов"
          ],
          [
            "Добавь вымышленную модель «Ботинки Север» в новую категорию «Ботинки», задай глобальный цвет Чёрный и цену 7300 ₽. Не устанавливая сторонний фильтр, найди её по цвету и диапазону цены, а затем сбрось условия и проверь возвращение остальных товаров.",
            "Самостоятельная работа"
          ],
          [
            "Готово, если: категории отражают тип обуви; размеры и цвета хранятся глобально; простые и вариативные товары имеют нужные назначения; встроенные фильтры работают с коллекцией; выбор белого цвета меняет выдачу; активное условие можно снять; пустая выдача понятна; после сброса каталог восстановлен; мобильные элементы доступны.",
            "Критерии готовности"
          ],
          [
            "Симптом: в фильтре нет значения «Белый», хотя оно написано в описании. Проверь глобальный атрибут и его назначение товарам текущей коллекции: обычный текст описания не становится значением фильтра. Если условия не меняют выдачу, проверь соседство Product Filters и Product Collection и используемый шаблон, затем сохранение изменений.",
            "Ошибка и диагностика"
          ],
          [
            "Оцени структуру учебного каталога обуви: категории [список], глобальные атрибуты [список], назначения товаров [обезличенная таблица]. Найди дубли и смешение категорий с характеристиками. Предложи проверки встроенного Product Filters без платных расширений. Не утверждай наличие конкретной вариации без проверки её остатка.",
            "Запрос к ИИ"
          ]
        ],
        "tip": "Сначала единый справочник и назначения, затем фильтры и проверка выдачи. Источники: https://woocommerce.com/document/managing-product-taxonomies/ ; https://woocommerce.com/document/woocommerce-store-editing/customizing-shop-page-catalog/filter-products/"
      },
      "ex": [
        {
          "k": "choice",
          "q": "Куда поместить «Кроссовки», а куда «Размер 41»?",
          "options": [
            "Кроссовки — в категорию, размер 41 — в атрибут",
            "Оба значения — только в название сайта",
            "Размер 41 — в категорию, кроссовки — в платёжный метод",
            "Оба значения — только в альтернативный текст фото"
          ],
          "why": "Категория организует типы ассортимента, атрибут хранит характеристику товара."
        },
        {
          "k": "choice",
          "q": "Почему выбираем глобальный атрибут «Цвет»?",
          "options": [
            "Его единые значения можно назначать многим товарам и фильтровать",
            "Он автоматически фотографирует все товары",
            "Он заменяет цену всех цветных вариаций",
            "Он делает любой товар вариативным без настройки"
          ],
          "why": "Глобальный справочник обеспечивает согласованные значения, но назначения и вариации нужно настроить отдельно."
        },
        {
          "k": "choice",
          "q": "С каким блоком работает встроенный Product Filters?",
          "options": [
            "Product Collection на той же странице или в шаблоне",
            "Обычный абзац с перечнем моделей",
            "Навигация с произвольными ссылками",
            "Форма входа администратора"
          ],
          "why": "Фильтры меняют выборку коллекции товаров, а не произвольный текст страницы."
        },
        {
          "k": "choice",
          "q": "Модель есть в результатах фильтра. Что это ещё не подтверждает?",
          "options": [
            "Возможность купить любую её комбинацию размера и цвета",
            "Принадлежность модели к текущей выдаче",
            "Наличие карточки модели в каталоге",
            "Возможность открыть карточку из выдачи"
          ],
          "why": "Остаток и цена проверяются у конкретной вариации. Карточка в каталоге не гарантирует доступность всех комбинаций."
        },
        {
          "k": "input",
          "q": "Введи английское имя блока из двух слов, который показывает коллекцию товаров: Product ____. В ответе напиши оба слова.",
          "a": [
            "Product Collection"
          ],
          "why": "Product Collection выводит товарную выборку, с которой работает встроенный Product Filters."
        },
        {
          "k": "choice",
          "q": "Цвет указан только в описании и отсутствует в фильтре. Что проверить первым?",
          "options": [
            "Назначено ли товару значение глобального атрибута «Цвет»",
            "Количество символов в названии страницы",
            "Время регистрации администратора",
            "Порядок платёжных методов"
          ],
          "why": "Свободный текст описания не заменяет структурированное значение глобального атрибута."
        }
      ]
    },
    {
      "id": "wp-13",
      "t": "Шаблоны магазина, корзина и оформление заказа",
      "plan": "Оформить каталог и карточку в редакторе сайта, сохранить функциональные блоки и проверить совместимость расширений.",
      "theory": {
        "rule": "Блочная тема разделяет данные товара и оформление. Название, цена, описание и фотографии хранятся в товаре; шаблон определяет их расположение. Шаблон «Каталог товаров» управляет основной витриной, а «Отдельный товар» — карточками. Изменение общего шаблона влияет сразу на несколько товаров. Поэтому перед сохранением посмотри список затронутых объектов и сохрани резервную копию учебного сайта.\n\nНе рисуй цену обычным абзацем внутри общего шаблона. Иначе одинаковая надпись появится у разных моделей и разойдётся с корзиной. Используй товарные блоки, которые получают данные текущего товара: название, цену, галерею и добавление в корзину. В каталоге сохрани Product Collection, сортировку и сообщения магазина. Текст, набранный прямо на странице «Магазин», может не появиться, поскольку её вывод контролирует шаблон каталога.\n\nКорзина и оформление заказа в современных новых установках используют блоки Cart и Checkout. Это функциональные контейнеры: они показывают позиции, суммы, адрес, доставку и способы оплаты. Открой назначенные страницы и проверь структуру через список блоков. Не замени оформление картинкой с нарисованной кнопкой и не вставляй второй Checkout рядом с первым.\n\nДля расширений нужны две отдельные проверки совместимости: с Cart/Checkout Blocks и с HPOS. HPOS означает хранение заказов в специальных таблицах WooCommerce; это не тема и не дизайн корзины. Совместимость с одним механизмом не доказывает поддержку другого. Сверяй документацию конкретной версии платёжного или доставочного модуля и предупреждения WooCommerce.\n\nЕсли расширение не поддерживает блоки, сначала найди документированный совместимый вариант. Переход на классические корзину и оформление рассматривай как отдельное согласованное решение для обеих страниц. После любых изменений пройди путь от выбора пары до формы заказа на широком и узком экране.",
        "ex": [
          [
            "1. Сделай резервную копию; открой «Внешний вид → Редактор → Шаблоны → Каталог товаров».\n2. Настрой сетку каталога, сохрани Product Collection, цену и переход к товару.\n3. Открой шаблон отдельного товара; расположи галерею, название, динамическую цену и блок покупки.\n4. Проверь в предварительном просмотре простой товар и вариативную модель.\n5. Открой назначенную страницу корзины; убедись, что присутствует один рабочий блок Cart.\n6. Открой назначенную страницу оформления; проверь один Checkout и его внутренние блоки.\n7. В «WooCommerce → Настройки → Дополнительно → Возможности» посмотри режим HPOS; составь список расширений и отдельно проверь поддержку HPOS и блоков.\n8. Сохрани изменения и пройди путь «каталог → вариация → корзина → оформление» на компьютере и узком экране без реальной оплаты.",
            "Практика с подсказками: 8 шагов"
          ],
          [
            "Сделай карточку обуви удобной на телефоне: фото, название, цена, выбор размера, кнопка покупки, краткое описание. Проверь две модели с разными ценами. В отдельной заметке перечисли версии активных расширений и статус поддержки блокового оформления и HPOS по официальным источникам.",
            "Самостоятельная работа"
          ],
          [
            "Готово, если: шаблон каталога открывает нужные модели; две карточки показывают собственные цены; вариация выбирается; корзина меняет количество и итог; Checkout показывает форму и сводку; служебные страницы назначены; проверена мобильная версия; совместимость каждого расширения с блоками и HPOS отмечена отдельно; боевой платёж не выполнялся.",
            "Критерии готовности"
          ],
          [
            "Симптом: новая надпись на странице «Магазин» не появляется на витрине. Проверь шаблон «Каталог товаров»: он управляет выводом магазина. Если платёжный метод пропал только в Checkout, проверь его поддержку блокового оформления и предупреждения редактора. Не отключай HPOS наугад: сначала выясни, какой именно механизм несовместим.",
            "Ошибка и диагностика"
          ],
          [
            "Помоги проверить блочный учебный магазин. Тема [название], WooCommerce [версия], активные расширения [названия и версии], блоки на корзине и оформлении [список], режим HPOS [значение], симптом [описание]. Составь проверку совместимости Cart/Checkout Blocks отдельно от HPOS. Не придумывай поддержку: попроси ссылку на официальное подтверждение, если данных недостаточно. Не запрашивай секреты.",
            "Запрос к ИИ"
          ]
        ],
        "tip": "Шаблон отвечает за вид, товар — за данные; поддержка блоков и HPOS проверяется раздельно. Источники: https://woocommerce.com/document/woocommerce-store-editing/customizing-shop-page-catalog/ ; https://woocommerce.com/document/woocommerce-store-editing/customizing-cart-and-checkout/ ; https://woocommerce.com/document/high-performance-order-storage/"
      },
      "ex": [
        {
          "k": "choice",
          "q": "Где менять общий макет каталога в блочной теме?",
          "options": [
            "В шаблоне «Каталог товаров» редактора сайта",
            "В поле SKU первого товара",
            "В настройке количества на складе",
            "В имени базы данных"
          ],
          "why": "Основная витрина использует шаблон каталога. Обычное содержимое страницы магазина может им перекрываться."
        },
        {
          "k": "choice",
          "q": "Как вывести цену в общем шаблоне карточки?",
          "options": [
            "Использовать динамический блок цены текущего товара",
            "Вписать одну сумму обычным абзацем",
            "Вставить фотографию ценника для всех моделей",
            "Написать сумму в названии шаблона"
          ],
          "why": "Динамический блок получает цену открытого товара и не подменяет её общей надписью."
        },
        {
          "k": "choice",
          "q": "Модуль поддерживает HPOS. Что ещё нужно проверить для блокового оформления?",
          "options": [
            "Отдельную поддержку Cart/Checkout Blocks",
            "Сколько букв в названии модуля",
            "Совпадение цвета логотипа с темой",
            "Наличие у товара галереи из пяти кадров"
          ],
          "why": "HPOS относится к хранению заказов, а блоковая совместимость — к работе интерфейса корзины и оформления."
        },
        {
          "k": "choice",
          "q": "Что проверить при сохранении общего шаблона?",
          "options": [
            "Какие шаблоны и части сайта затронуты изменением",
            "Только цену самого дешёвого товара",
            "Только часовой пояс браузера",
            "Количество комментариев в блоге"
          ],
          "why": "Общие шаблоны и части могут влиять на множество страниц, поэтому область сохранения важна."
        },
        {
          "k": "input",
          "q": "Введи четырёхбуквенную аббревиатуру хранения заказов в специальных таблицах WooCommerce.",
          "a": [
            "HPOS"
          ],
          "why": "HPOS расшифровывается как High-Performance Order Storage и относится к хранению заказов."
        },
        {
          "k": "choice",
          "q": "Расширение не поддерживает Checkout Blocks. Что делать первым?",
          "options": [
            "Проверить официально совместимую версию или подходящий вариант расширения",
            "Удалить все заказы из базы",
            "Продублировать Checkout на той же странице",
            "Отключить управление запасами у всех товаров"
          ],
          "why": "Нужна документированная совместимость. Изменения базы и запасов не решают проблему интерфейса оформления."
        }
      ]
    },
    {
      "id": "wp-14",
      "t": "Доставка: зоны, тарифы и самовывоз",
      "plan": "Настроить встроенные способы доставки, проверить порядок зон и изучить официальный каталог интеграций СДЭК.",
      "theory": {
        "rule": "Зона доставки — область адресов, для которой предлагаются определённые способы. WooCommerce проверяет зоны сверху вниз и выбирает первое совпадение. Поэтому более узкая зона должна стоять выше широкой. Например, зона конкретных учебных почтовых индексов идёт перед зоной всей России. Способы из нескольких совпадающих зон не складываются: покупатель получает методы выбранной зоны.\n\nВстроенная фиксированная доставка Flat rate позволяет назначить учебную стоимость, например 350 ₽ за заказ. Она не требует договора со СДЭК, ключей перевозчика или отдельного доставочного плагина. Такой тариф не рассчитывает реальную логистику: это правило нашего демомагазина. Бесплатная доставка Free shipping может зависеть от минимальной суммы. Зададим порог 8000 ₽ и проверим корзины ниже и выше него; при использовании купонов отдельно уточняют, считается порог до скидки или после.\n\nУ самовывоза есть два механизма. В блоковом Checkout используем отдельные настройки Local Pickup с пунктом выдачи. Этот вариант не относится к зонам доставки и может предлагаться независимо от адреса покупателя. Старый самовывоз добавляется внутрь зоны. Одновременно их не включаем, иначе покупатель увидит дублирующие варианты. Учебный пункт выдачи обозначь как вымышленный, без обещания реальной выдачи товара.\n\nСДЭК изучим через официальный раздел интеграций: найдём варианты для WooCommerce, автора, условия подключения и подтверждение совместимости. Это исследование, а не обязательная установка. Автоматические тарифы, выбор пунктов и создание отправления требуют отдельной проверенной интеграции; нельзя выдавать фиксированные 350 ₽ за расчёт перевозчика.\n\nПроверка доставки начинается с физического товара и полного адреса. Сравни несколько адресов, порядок зон, включённые методы и сумму заказа. Если подходящей зоны с работающим методом нет, отсутствие доставки ожидаемо. Не распространяй учебные цены и сроки на настоящие продажи.",
        "ex": [
          [
            "1. В общих настройках разреши доставку в выбранный учебный регион России; проверь, что обувь не виртуальная.\n2. Создай узкую зону «Демо: индекс 101000» для России с ограничением по индексу 101000.\n3. Добавь под ней широкую зону «Россия»; узкая должна стоять первой.\n4. В узкую зону добавь Flat rate 350, в широкую — Flat rate 500; это вымышленные цены упражнения.\n5. В обе зоны добавь Free shipping от 8000 и запиши правило учёта скидок; не скрывай другие методы без отдельной проверки.\n6. В «Доставка → Самовывоз» настрой блоковый Local Pickup с вымышленным пунктом; не добавляй legacy-самовывоз в зоны.\n7. Проверь адрес с индексом 101000, другой российский индекс, корзину ниже 8000 и выше 8000; отдельно выбери самовывоз.\n8. Открой официальный раздел интеграций СДЭК, найди путь к решению для WooCommerce и выпиши автора, требования и ссылки без установки и передачи ключей.",
            "Практика с подсказками: 8 шагов"
          ],
          [
            "Составь таблицу минимум из пяти сценариев: узкая зона с суммой ниже порога, широкая зона ниже порога, сумма выше порога, неподдерживаемый адрес, самовывоз. Для каждого запиши ожидаемые методы и фактически показанные цены. СДЭК в этой таблице не должен выдавать неподключённый реальный тариф.",
            "Самостоятельная работа"
          ],
          [
            "Готово, если: узкая зона стоит первой; для индекса 101000 доступна учебная доставка 350 ₽; другой разрешённый российский адрес получает 500 ₽; бесплатный метод появляется при достижении порога; самовывоз настроен одним механизмом; неподдерживаемый адрес не получает выдуманный тариф; исследование СДЭК содержит официальный источник, а не установленный наугад модуль.",
            "Критерии готовности"
          ],
          [
            "Симптом: для 101000 показывается 500 ₽. Проверь страну и индекс в адресе, затем порядок зон: широкая Россия могла перехватить совпадение. Если самовывоз виден дважды, сравни отдельный блоковый Local Pickup и методы зон. Если доставки нет вообще, проверь физический тип товара, разрешённые регионы и наличие включённого метода в совпавшей зоне.",
            "Ошибка и диагностика"
          ],
          [
            "Проверь учебные зоны WooCommerce: [порядок, регионы, индексы, включённые методы], корзина [сумма], адрес [вымышленные страна и индекс], результат [методы]. Объясни первое совпадение зон и составь тесты порога бесплатной доставки. Учитывай отдельный Local Pickup для Checkout Blocks. Не проси реальный адрес клиента, ключи СДЭК или доступ к сайту.",
            "Запрос к ИИ"
          ]
        ],
        "tip": "Первой срабатывает подходящая зона; фиксированный тариф работает без перевозчика. Источники: https://woocommerce.com/document/setting-up-shipping-zones/ ; https://woocommerce.com/document/free-shipping/ ; https://woocommerce.com/document/woocommerce-store-editing/customizing-cart-and-checkout/checkout-block/woocommerce-blocks-local-pickup/ ; СДЭК: https://www.cdek.ru/ru/integration/"
      },
      "ex": [
        {
          "k": "choice",
          "q": "В каком порядке расположить пересекающиеся зоны?",
          "options": [
            "Сначала узкую по индексу, затем всю Россию",
            "Сначала всю Россию, затем узкую по индексу",
            "По алфавиту названий независимо от регионов",
            "По величине стоимости доставки от большей к меньшей"
          ],
          "why": "WooCommerce выбирает первую подходящую зону. Широкая зона сверху перехватит адреса узкой."
        },
        {
          "k": "choice",
          "q": "Что требуется для учебного встроенного Flat rate 350 ₽?",
          "options": [
            "Зона и включённый фиксированный метод с ценой 350",
            "Обязательный договор со СДЭК",
            "Секретный ключ платёжного шлюза",
            "Отдельная вариация товара с названием «Доставка»"
          ],
          "why": "Flat rate — встроенный метод WooCommerce, который не требует интеграции с перевозчиком."
        },
        {
          "k": "choice",
          "q": "Как работает блоковый Local Pickup?",
          "options": [
            "Настраивается отдельно от зон и не ограничивается ими",
            "Наследует только последнюю зону списка",
            "Обязательно требует ключ СДЭК",
            "Появляется только у скачиваемых товаров"
          ],
          "why": "Самовывоз в Checkout Blocks имеет отдельные настройки и пункты; это иной механизм, чем legacy-метод зон."
        },
        {
          "k": "choice",
          "q": "Как проверить бесплатную доставку с порогом 8000 ₽?",
          "options": [
            "Сравнить корзины ниже и выше порога при одном адресе",
            "Только убедиться, что метод существует в списке",
            "Поменять заголовок страницы доставки",
            "Удалить цену у товара дешевле порога"
          ],
          "why": "Проверка по обе стороны порога подтверждает условие доступности метода. Наличие записи в настройках этого не гарантирует."
        },
        {
          "k": "input",
          "q": "Введи точное английское название встроенного метода фиксированной доставки из двух слов.",
          "a": [
            "Flat rate"
          ],
          "why": "Flat rate задаёт фиксированный тариф или правило расчёта внутри зоны доставки."
        },
        {
          "k": "choice",
          "q": "Что сделать со СДЭК в этом уроке?",
          "options": [
            "Изучить официальный раздел интеграций и требования решения для WooCommerce",
            "Считать Flat rate автоматически подключённым тарифом СДЭК",
            "Отправить реальные посылки для проверки корзины",
            "Вставить секрет перевозчика в описание товара"
          ],
          "why": "Мы только исследуем официальный путь интеграции. Встроенная учебная доставка работает отдельно."
        }
      ]
    },
    {
      "id": "wp-15",
      "t": "ЮKassa: подключение и только тестовая оплата",
      "plan": "Установить официальный модуль, подключить тестовый магазин по инструкции своей версии и проверить уведомления на HTTPS.",
      "theory": {
        "rule": "Платёжный модуль связывает заказ WooCommerce с платёжным сервисом. В этом курсе используем официальный «ЮKassa для WooCommerce» из каталога WordPress, опубликованный yoomoney, и только тестовый магазин. Тестовая операция воспроизводит оплату без перевода денег. До любого нажатия оплаты проверь, что подключён именно тестовый магазин: надпись «учебный» в названии сайта сама по себе этого не обеспечивает.\n\nСначала сверяй версию установленного модуля с официальной инструкцией. В новых версиях предусмотрено подключение через авторизацию и выбор магазина, то есть OAuth. Инструкции для старых версий могут требовать ShopID и секретный ключ. Эти способы нельзя смешивать в один обязательный список полей. Не устанавливай старый модуль ради совпадения скриншота и никогда не вставляй ключи в чат, урок или публичную заметку.\n\nВыбери документированный сценарий с переходом на платёжную страницу ЮKassa. Для опыта покупателя нужны рабочая корзина, оформление, доставка и разрешённый тестовый способ оплаты. Поддержку Checkout Blocks и HPOS проверяй для своей версии отдельно. Наличие модуля в каталоге ещё не доказывает совместимость любой комбинации расширений.\n\nСайт для интеграционного теста должен быть размещён на доступном из интернета HTTPS-адресе. Локальный адрес компьютера сервису недоступен. Уведомление, или callback, передаёт серверу магазина изменение состояния платежа; возврат браузера на страницу благодарности его не заменяет. Используй адрес и способ настройки уведомлений, которые показывает модуль. При OAuth регистрацию уведомлений выполняет интеграция через API; старые инструкции могут описывать настройку в кабинете.\n\nПлати только специальными тестовыми данными из документации ЮKassa, без собственной банковской карты. Сверь тестовую операцию, сумму и состояние заказа в обеих системах. Если тестовый доступ ещё не готов, зафиксируй блокировку и продолжай подготовку каталога, не подменяя тест настоящей покупкой.",
        "ex": [
          [
            "1. Открой официальную карточку https://wordpress.org/plugins/yookassa/ и инструкцию ЮKassa; сравни автора и требования.\n2. На резервной копии учебного сайта установи официальный модуль и запиши его версию; проверь поддержку Checkout Blocks и HPOS.\n3. Создай или выбери тестовый магазин в кабинете ЮKassa; убедись в его тестовом типе.\n4. Подключи именно этот магазин способом своей версии: авторизация OAuth либо документированные поля старой версии; секреты вводи только в доверенном интерфейсе.\n5. Проверь интернет-доступность учебного HTTPS-сайта и адрес уведомлений, показанный модулем; не придумывай callback вручную.\n6. Выбери переход на платёжную страницу и тестовый способ оплаты, доступный в тестовом магазине; проверь его появление на Checkout.\n7. Оформи заказ с вымышленными данными и контролируемой тобой тестовой почтой; используй тестовую карту из официальной инструкции.\n8. Сравни сумму, тестовую пометку операции, примечания и статус заказа в WooCommerce с записью в тестовом кабинете; магазин оставь закрытым.",
            "Практика с подсказками: 8 шагов"
          ],
          [
            "Повтори успешную тестовую покупку вариативной обуви с другим размером. Сохрани обезличенный протокол: версия модуля, способ подключения, подтверждение тестового магазина, сумма товара и доставки, состояние операции и заказа, время получения уведомления. Не сохраняй ключи, коды авторизации и данные карты.",
            "Самостоятельная работа"
          ],
          [
            "Готово, если: модуль официальный и версия записана; выбран подтверждённый тестовый магазин; совместимость оформления и HPOS проверена; HTTPS-адрес уведомлений доступен сервису; тестовый метод виден; выполнена только тестовая операция; суммы совпали; изменение состояния видно в заказе и кабинете; реальные деньги и реальные карты не использовались.",
            "Критерии готовности"
          ],
          [
            "Симптом: покупатель вернулся на сайт, а заказ всё ещё ожидает оплату. Проверь состояние операции в тестовом кабинете, затем примечания и журнал модуля без публикации секретов. Сверь HTTPS-адрес уведомлений, отсутствие блокировки callback авторизацией хостинга или защитным плагином и настройки своей версии. Если окно авторизации не открывается, проверь блокировку всплывающих окон браузером.",
            "Ошибка и диагностика"
          ],
          [
            "Помоги диагностировать тестовую интеграцию ЮKassa и WooCommerce. Версии [список], способ подключения [OAuth или по инструкции версии], тестовый тип магазина [подтверждён/не подтверждён], Checkout [блоки/классический], HPOS [режим], обезличенный симптом [описание]. Дай проверки по официальной инструкции. Не запрашивай ShopID, секретный ключ, токен, SMS-код, доступы или данные карты. Не предлагай реальную оплату.",
            "Запрос к ИИ"
          ]
        ],
        "tip": "Доказательство интеграции — тестовая операция и согласованные состояния, а не экран благодарности. Источники: https://yookassa.ru/docs/support/payments/onboarding/integration/cms-module/woocommerce ; https://wordpress.org/plugins/yookassa/ ; тесты: https://yookassa.ru/developers/payment-acceptance/testing-and-going-live/testing ; уведомления: https://yookassa.ru/developers/using-api/webhooks"
      },
      "ex": [
        {
          "k": "choice",
          "q": "Какой магазин подключаем для всех упражнений с оплатой?",
          "options": [
            "Подтверждённый тестовый магазин ЮKassa",
            "Любой магазин с названием «Демо»",
            "Боевой магазин с минимальной суммой",
            "Магазин знакомого без проверки режима"
          ],
          "why": "Только тестовый тип магазина гарантирует выполнение учебных операций без перевода настоящих денег."
        },
        {
          "k": "choice",
          "q": "Новая версия модуля предлагает авторизацию вместо полей ключа. Как поступить?",
          "options": [
            "Следовать официальной инструкции этой версии и выбрать тестовый магазин",
            "Обязательно найти скрытое поле секретного ключа",
            "Скачать случайную старую сборку с форума",
            "Вписать ShopID в URL страницы корзины"
          ],
          "why": "Современный OAuth и старые поля аутентификации — разные варианты. Способ подключения зависит от версии."
        },
        {
          "k": "choice",
          "q": "Почему для callback недостаточно локального адреса на компьютере?",
          "options": [
            "ЮKassa должна обратиться к доступному HTTPS-серверу магазина",
            "Локальный адрес запрещает создание товаров",
            "У локального адреса не может быть корзины",
            "Тестовая карта работает только с одним названием домена"
          ],
          "why": "Уведомление приходит с сервера сервиса. Ему нужен доступный извне адрес обработчика."
        },
        {
          "k": "choice",
          "q": "Покупатель видит страницу благодарности. Что проверить для подтверждения теста?",
          "options": [
            "Операцию в тестовом кабинете и состояние заказа с примечаниями",
            "Только цвет сообщения об успехе",
            "Только факт закрытия платёжной вкладки",
            "Только наличие логотипа ЮKassa"
          ],
          "why": "Возврат браузера не заменяет серверное подтверждение. Проверяем согласованность состояний обеих систем."
        },
        {
          "k": "input",
          "q": "Как называется протокол защищённого адреса для уведомлений? Введи аббревиатуру из пяти латинских букв.",
          "a": [
            "HTTPS"
          ],
          "why": "HTTPS обеспечивает защищённое соединение с адресом обработчика входящих уведомлений."
        },
        {
          "k": "choice",
          "q": "Какие карточные данные применяем в тестовом магазине?",
          "options": [
            "Специальную тестовую карту из официальной документации ЮKassa",
            "Свою обычную карту для покупки на один рубль",
            "Карту первого покупателя после запуска",
            "Секретный ключ вместо номера карты"
          ],
          "why": "Тестовая карта предназначена для имитации оплаты; настоящую банковскую карту в упражнении не используем."
        }
      ]
    },
    {
      "id": "wp-16",
      "t": "Заказы, неуспешные сценарии и возвраты",
      "plan": "Проверить жизненный цикл заказа, отмену, отказ, нулевой остаток и разницу между записью возврата и операцией шлюза.",
      "theory": {
        "rule": "Заказ хранит состав покупки, выбранную вариацию, адрес, доставку, суммы и события обработки. Его статус помогает понять следующий шаг, но сам по себе не заменяет проверку платежа. Для физической обуви «Обработка» обычно означает подтверждённую оплату и ожидание исполнения, «Выполнен» — завершённую обработку заказа. Письмо покупателю — дополнительный сигнал, а не единственный источник истины.\n\n«Ожидается оплата» показывает незавершённый платёж, «На удержании» — ожидание подтверждения или иной сценарий конкретного шлюза. «Неудавшийся» относится к неуспешной оплате, «Отменён» — к отмене заказа. Точная последовательность зависит от метода и настроек модуля, особенно при двухстадийной оплате. Читай примечания заказа и официальный порядок подтверждения или отмены у выбранного шлюза. Ручная смена статуса может запускать его действия.\n\nПроверка магазина включает отрицательные сценарии. Отдельно создай тестовую отмену, отказ оплаты по документированному тестовому сценарию и попытку купить отсутствующую вариацию. Закрытие вкладки не гарантирует немедленного статуса «Отменён» или «Неудавшийся». Наблюдай фактическое состояние и уведомления. Проверяй, что остаток уменьшился или восстановился ровно в ожидаемый момент; не исправляй его повторно без сверки истории.\n\nВозврат товара, статус «Возвращён» и возврат денег — связанные, но разные события. Кнопка ручного возврата в WooCommerce записывает возврат в учёте, однако деньги через шлюз не переводит. Прямая смена статуса тоже не является подтверждённым возвратом средств. Автоматический возврат возможен только при поддержке конкретного шлюза; его результат сверяют с кабинетом платёжного сервиса.\n\nВ курсе выполняются только тестовые операции. Для возврата проверь сумму, выбранные позиции, необходимость возврата запаса и поддержку модуля. Запиши идентификаторы учебных заказов и результаты без личных данных. Настоящие посылки и реальные переводы в упражнение не входят.",
        "ex": [
          [
            "1. Убедись, что ЮKassa подключена к тестовому магазину; восстанови исходные учебные остатки после предыдущих упражнений.\n2. Создай успешный тестовый заказ на одну вариацию; проверь размер, цвет, сумму, примечания и изменение остатка.\n3. Отметь учебное исполнение только этого тестового заказа по документированному сценарию; проверь статус и письмо на контролируемой почте.\n4. Создай другой тестовый заказ и выполни документированную отмену; сравни статус платежа, заказ и восстановление запаса.\n5. В отдельном заказе воспроизведи отказ специальным тестовым сценарием ЮKassa; запиши фактические статусы, не назначая их ради красивого отчёта.\n6. У вариации с нулём и запрещёнными предзаказами попробуй покупку: она не должна оформляться как доступная пара.\n7. На успешном тестовом заказе изучи возврат: проверь поддержку шлюза, сумму и флажок пополнения запасов; выполни тестовый возврат поддерживаемым способом и сравни кабинет.\n8. В другом учебном заказе исследуй ручную запись возврата и зафиксируй, что она сама не создаёт операцию возврата в ЮKassa; составь итоговую таблицу сценариев.",
            "Практика с подсказками: 8 шагов"
          ],
          [
            "Оформи протокол шести проверок: успешная покупка, исполнение, отмена, отказ, нулевой остаток, возврат. Для каждой укажи ожидаемое поведение, фактический статус заказа, состояние тестовой операции и остаток до/после. Отдельно объясни, как доказать возврат через шлюз и почему ручной записи недостаточно.",
            "Самостоятельная работа"
          ],
          [
            "Готово, если: состав вариации и суммы проверены; успешный тест отличим от ожидания; отмена и отказ имеют отдельные заказы; нулевую вариацию купить нельзя; запас проверен до и после каждого сценария; возврат подтверждён в тестовом кабинете либо явно отмечена неподдерживаемая операция; ручная запись не названа переводом денег; в отчёте нет секретов и чужих данных.",
            "Критерии готовности"
          ],
          [
            "Симптом: заказ помечен «Возвращён», а операции возврата у шлюза нет. Проверь, не использовали ли ручной возврат или прямую смену статуса. Затем прочитай примечания, поддержку возвратов установленной версией и состояние платежа в тестовом кабинете. Не выполняй повторный возврат, пока не выяснен результат первого запроса: сначала исключи дублирование операции.",
            "Ошибка и диагностика"
          ],
          [
            "Проверь обезличенный журнал учебных заказов: [сценарий, статус заказа, состояние тестового платежа, остаток до/после, примечание без секретов]. Найди расхождения и предложи безопасный порядок диагностики по документации WooCommerce и ЮKassa. Различай ручную запись возврата, отмену и подтверждённый возврат шлюза. Не проси данные клиентов, ключи или доступ к кабинету; не предлагай реальные переводы.",
            "Запрос к ИИ"
          ]
        ],
        "tip": "Статус описывает учёт; деньги и возвраты подтверждаются в платёжном сервисе. Источники: https://woocommerce.com/document/managing-orders/order-statuses/ ; https://woocommerce.com/document/woocommerce-refunds/ ; https://yookassa.ru/developers/payment-acceptance/testing-and-going-live/testing ; особенности шлюза: https://yookassa.ru/docs/support/payments/onboarding/integration/cms-module/woocommerce"
      },
      "ex": [
        {
          "k": "choice",
          "q": "Что обычно означает «Обработка» для оплаченного заказа физической обуви?",
          "options": [
            "Оплата подтверждена, заказ ожидает исполнения",
            "Товар обязательно уже доставлен",
            "Деньги автоматически возвращены",
            "Сайт ждёт создания товарной категории"
          ],
          "why": "Processing для физического товара обычно означает получение оплаты и необходимость исполнения. Особенности шлюза проверяют по его документации."
        },
        {
          "k": "choice",
          "q": "Что делает ручной возврат в WooCommerce?",
          "options": [
            "Записывает возврат в учёте без перевода денег через шлюз",
            "Всегда отправляет деньги покупателю автоматически",
            "Удаляет историю платежа в кабинете сервиса",
            "Автоматически создаёт новую банковскую карту"
          ],
          "why": "Manual refund отражает учётное действие. Возврат средств вне WooCommerce нужно выполнить и подтвердить отдельно, если он требуется."
        },
        {
          "k": "choice",
          "q": "После закрытия платёжной вкладки статус не изменился мгновенно. Как действовать?",
          "options": [
            "Проверить тестовую операцию, уведомления и примечания заказа",
            "Обязательно назначить «Неудавшийся» вручную",
            "Отправить реальный платёж для ускорения",
            "Удалить заказ без проверки оплаты"
          ],
          "why": "Закрытая вкладка не доказывает отказ или отмену. Состояния уточняют по серверным событиям и документации шлюза."
        },
        {
          "k": "choice",
          "q": "Что проверяем после отмены тестового заказа с количественным учётом?",
          "options": [
            "Историю заказа и фактический остаток до и после отмены",
            "Только количество фотографий у товара",
            "Только число символов в SKU",
            "Только цвет кнопки «Купить»"
          ],
          "why": "Нужно убедиться, что запас восстановился правильно, и не пополнять его повторно без сверки истории."
        },
        {
          "k": "input",
          "q": "Введи английское название статуса неуспешной оплаты из одного слова.",
          "a": [
            "Failed"
          ],
          "why": "Failed — статус неуспешного заказа. Его появление и сроки зависят от уведомлений и платёжного шлюза."
        },
        {
          "k": "choice",
          "q": "Как доказать выполненный тестовый возврат через шлюз?",
          "options": [
            "Сверить запись возврата в тестовом кабинете с суммой и примечаниями заказа",
            "Только вручную поставить статус «Возвращён»",
            "Только удалить письмо о покупке",
            "Только увеличить складской остаток"
          ],
          "why": "Нужна согласованность записи WooCommerce с операцией сервиса. Учётный статус и запас отдельно не подтверждают возврат средств."
        }
      ]
    },
    {
      "id": "wp-x2",
      "t": "Экзамен 2: Магазин на WooCommerce",
      "exam": true,
      "pass": 0.8,
      "covers": [
        "wp-09",
        "wp-10",
        "wp-11",
        "wp-12",
        "wp-13",
        "wp-14",
        "wp-15",
        "wp-16"
      ],
      "q": [
        {
          "k": "choice",
          "q": "Где задаётся валюта цен магазина?",
          "options": [
            "В общих настройках WooCommerce",
            "В названии страницы магазина",
            "В подписи кнопки «Купить»",
            "В альтернативном тексте изображения"
          ],
          "why": "Валюта — настройка WooCommerce. Текстовая подпись на странице не меняет валюту расчётов.",
          "s": "wp-09"
        },
        {
          "k": "choice",
          "q": "Что нужно проверить после появления страницы «Корзина»?",
          "options": [
            "Назначена ли она страницей корзины в WooCommerce",
            "Есть ли у неё родительская страница",
            "Совпадает ли её заголовок с названием темы",
            "Добавлена ли она в категорию товаров"
          ],
          "why": "WooCommerce связывает свои функции с назначенными страницами; одного заголовка недостаточно.",
          "s": "wp-09"
        },
        {
          "k": "choice",
          "q": "Какая позиция подходит для простого товара в этом уроке?",
          "options": [
            "Одна модель в одном заданном размере и цвете",
            "Одна модель с выбором из пяти размеров",
            "Карточка с шестью цветовыми вариациями",
            "Категория со всеми кедами магазина"
          ],
          "why": "Простой товар покупают без выбора товарной вариации. Конкретный размер можно явно указать в его названии.",
          "s": "wp-10"
        },
        {
          "k": "choice",
          "q": "Что означает пустое поле обычной цены?",
          "options": [
            "Цена не задана; это не бесплатный товар",
            "Товар бесплатно добавляется в корзину",
            "Берётся цена соседней карточки",
            "Автоматически применяется цена категории"
          ],
          "why": "Нулевая цена и отсутствующая цена — разные состояния. Для продаваемой позиции нужна заданная цена.",
          "s": "wp-10"
        },
        {
          "k": "choice",
          "q": "Атрибуты размера и цвета уже добавлены. Что ещё нужно для покупки комбинации?",
          "options": [
            "Создать включённую вариацию с ценой и доступным остатком",
            "Добавить цвета в меню сайта",
            "Создать отдельную страницу WordPress для размера",
            "Вставить название цвета в подвал"
          ],
          "why": "Атрибуты задают возможные значения. Продаваемая комбинация создаётся и настраивается как вариация.",
          "s": "wp-11"
        },
        {
          "k": "choice",
          "q": "Что произойдёт с вариацией без цены?",
          "options": [
            "Её нельзя купить; она может не отображаться",
            "Она бесплатно продаётся по нулевой цене",
            "Она автоматически получает цену доставки",
            "Её цена берётся из названия модели"
          ],
          "why": "Для вариации нужна собственная цена. Отсутствующее значение не превращается в ноль.",
          "s": "wp-11"
        },
        {
          "k": "choice",
          "q": "Куда поместить «Кроссовки», а куда «Размер 41»?",
          "options": [
            "Кроссовки — в категорию, размер 41 — в атрибут",
            "Оба значения — только в название сайта",
            "Размер 41 — в категорию, кроссовки — в платёжный метод",
            "Оба значения — только в альтернативный текст фото"
          ],
          "why": "Категория организует типы ассортимента, атрибут хранит характеристику товара.",
          "s": "wp-12"
        },
        {
          "k": "choice",
          "q": "Почему выбираем глобальный атрибут «Цвет»?",
          "options": [
            "Его единые значения можно назначать многим товарам и фильтровать",
            "Он автоматически фотографирует все товары",
            "Он заменяет цену всех цветных вариаций",
            "Он делает любой товар вариативным без настройки"
          ],
          "why": "Глобальный справочник обеспечивает согласованные значения, но назначения и вариации нужно настроить отдельно.",
          "s": "wp-12"
        },
        {
          "k": "choice",
          "q": "Где менять общий макет каталога в блочной теме?",
          "options": [
            "В шаблоне «Каталог товаров» редактора сайта",
            "В поле SKU первого товара",
            "В настройке количества на складе",
            "В имени базы данных"
          ],
          "why": "Основная витрина использует шаблон каталога. Обычное содержимое страницы магазина может им перекрываться.",
          "s": "wp-13"
        },
        {
          "k": "choice",
          "q": "Как вывести цену в общем шаблоне карточки?",
          "options": [
            "Использовать динамический блок цены текущего товара",
            "Вписать одну сумму обычным абзацем",
            "Вставить фотографию ценника для всех моделей",
            "Написать сумму в названии шаблона"
          ],
          "why": "Динамический блок получает цену открытого товара и не подменяет её общей надписью.",
          "s": "wp-13"
        },
        {
          "k": "choice",
          "q": "В каком порядке расположить пересекающиеся зоны?",
          "options": [
            "Сначала узкую по индексу, затем всю Россию",
            "Сначала всю Россию, затем узкую по индексу",
            "По алфавиту названий независимо от регионов",
            "По величине стоимости доставки от большей к меньшей"
          ],
          "why": "WooCommerce выбирает первую подходящую зону. Широкая зона сверху перехватит адреса узкой.",
          "s": "wp-14"
        },
        {
          "k": "choice",
          "q": "Что требуется для учебного встроенного Flat rate 350 ₽?",
          "options": [
            "Зона и включённый фиксированный метод с ценой 350",
            "Обязательный договор со СДЭК",
            "Секретный ключ платёжного шлюза",
            "Отдельная вариация товара с названием «Доставка»"
          ],
          "why": "Flat rate — встроенный метод WooCommerce, который не требует интеграции с перевозчиком.",
          "s": "wp-14"
        },
        {
          "k": "choice",
          "q": "Какой магазин подключаем для всех упражнений с оплатой?",
          "options": [
            "Подтверждённый тестовый магазин ЮKassa",
            "Любой магазин с названием «Демо»",
            "Боевой магазин с минимальной суммой",
            "Магазин знакомого без проверки режима"
          ],
          "why": "Только тестовый тип магазина гарантирует выполнение учебных операций без перевода настоящих денег.",
          "s": "wp-15"
        },
        {
          "k": "choice",
          "q": "Новая версия модуля предлагает авторизацию вместо полей ключа. Как поступить?",
          "options": [
            "Следовать официальной инструкции этой версии и выбрать тестовый магазин",
            "Обязательно найти скрытое поле секретного ключа",
            "Скачать случайную старую сборку с форума",
            "Вписать ShopID в URL страницы корзины"
          ],
          "why": "Современный OAuth и старые поля аутентификации — разные варианты. Способ подключения зависит от версии.",
          "s": "wp-15"
        },
        {
          "k": "choice",
          "q": "Что обычно означает «Обработка» для оплаченного заказа физической обуви?",
          "options": [
            "Оплата подтверждена, заказ ожидает исполнения",
            "Товар обязательно уже доставлен",
            "Деньги автоматически возвращены",
            "Сайт ждёт создания товарной категории"
          ],
          "why": "Processing для физического товара обычно означает получение оплаты и необходимость исполнения. Особенности шлюза проверяют по его документации.",
          "s": "wp-16"
        },
        {
          "k": "choice",
          "q": "Что делает ручной возврат в WooCommerce?",
          "options": [
            "Записывает возврат в учёте без перевода денег через шлюз",
            "Всегда отправляет деньги покупателю автоматически",
            "Удаляет историю платежа в кабинете сервиса",
            "Автоматически создаёт новую банковскую карту"
          ],
          "why": "Manual refund отражает учётное действие. Возврат средств вне WooCommerce нужно выполнить и подтвердить отдельно, если он требуется.",
          "s": "wp-16"
        },
        {
          "k": "input",
          "q": "Какой трёхбуквенной аббревиатурой обозначают артикул в интерфейсе WooCommerce?",
          "a": [
            "SKU"
          ],
          "why": "Поле SKU хранит уникальный артикул товара или вариации.",
          "s": "wp-10"
        },
        {
          "k": "input",
          "q": "Введи английское имя блока из двух слов, который показывает коллекцию товаров: Product ____. В ответе напиши оба слова.",
          "a": [
            "Product Collection"
          ],
          "why": "Product Collection выводит товарную выборку, с которой работает встроенный Product Filters.",
          "s": "wp-12"
        },
        {
          "k": "input",
          "q": "Введи точное английское название встроенного метода фиксированной доставки из двух слов.",
          "a": [
            "Flat rate"
          ],
          "why": "Flat rate задаёт фиксированный тариф или правило расчёта внутри зоны доставки.",
          "s": "wp-14"
        },
        {
          "k": "input",
          "q": "Введи английское название статуса неуспешной оплаты из одного слова.",
          "a": [
            "Failed"
          ],
          "why": "Failed — статус неуспешного заказа. Его появление и сроки зависят от уведомлений и платёжного шлюза.",
          "s": "wp-16"
        }
      ]
    },
    {
      "id": "wp-17",
      "t": "Перед продажами в РФ: контрольные точки владельца",
      "plan": "Разделить техническую готовность и готовность продавца; составить реестр вопросов по статусу бизнеса, чекам, данным и маркировке обуви.",
      "theory": {
        "rule": "Красивый магазин и успешный тест оплаты ещё не означают готовность к реальным продажам. WordPress отвечает за сайт, WooCommerce — за каталог и заказы, а обязанности продавца зависят от его деятельности. В этом уроке мы составляем контрольные точки, которые владелец подтверждает со специалистом по актуальным официальным документам. Курс не выбирает за него организационную форму, налоговый режим или исключения из требований.\n\nПервая точка — кто продаёт товар. Запишите наименование продавца, его статус, реквизиты и контакт для покупателей. Для перепродажи закупленной обуви нельзя автоматически переносить советы о продаже собственных изделий. Владелец проверяет допустимость выбранного статуса и схемы работы с бухгалтером или юристом.\n\nВторая точка — расчёт и чек. Письмо WooCommerce с номером заказа является уведомлением магазина. Оно само по себе не становится кассовым чеком. Схему фискализации, роли платёжного сервиса и кассы, документы при предоплате, передаче товара и возврате проверяют отдельно по материалам ФНС и условиям поставщиков.\n\nТретья точка — персональные данные. Составьте карту: что собирают оформление заказа, формы, почта, аналитика и резервные копии; где данные хранятся и кому передаются. С владельцем и специалистом проверьте основания обработки, необходимые документы, уведомления Роскомнадзору, локализацию баз и возможную трансграничную передачу. Галочка в форме не заменяет эту проверку.\n\nЧетвёртая точка — маркировка обуви. Проверьте применимость правил к ассортименту и всю цепочку от поставщика до продажи и возврата. Поле артикула в WooCommerce не выполняет функции системы маркировки. Для каждой точки нужны ответственный, официальный источник, принятое решение и подтверждение проверки. Нерешённые вопросы остаются блокировкой реального запуска, а учебный стенд продолжает работать с вымышленными данными.",
        "ex": [
          [
            "Создайте таблицу «Вопрос — ответственный — официальный источник — решение — подтверждение». Внесите четыре строки: статус продавца, фискализация, персональные данные, маркировка обуви. Откройте раздел ККТ ФНС, портал персональных данных Роскомнадзора и раздел обуви на сайте «Честный ЗНАК».",
            "Практика по шагам"
          ],
          [
            "Нарисуйте путь одного учебного заказа: форма сайта → платёжный модуль → кассовая система → выдача товара → возврат. Отдельно отметьте письмо WooCommerce. Укажите, какие решения должен подтвердить владелец со специалистом, без подстановки чужого налогового режима.",
            "Самостоятельная задача"
          ],
          [
            "Готово, если указаны реальный ответственный владелец, перечень получателей данных, место размещения баз и копий, схема чеков и схема маркировки. У каждой строки есть официальный источник и статус «подтверждено» либо «блокирует запуск». Неизвестное не помечено выполненным.",
            "Критерии приёмки"
          ],
          [
            "Покупатель получил письмо, но чек не найден. Сначала различите уведомление заказа и фискальный документ; проверьте событие оплаты и журнал кассового сервиса. Не меняйте налоговые признаки наугад. Передайте обезличенные сведения ответственному за фискализацию и приостановите реальный запуск до решения.",
            "Если что-то не работает"
          ],
          [
            "Промпт: «Помоги превратить описание учебного магазина обуви в список вопросов владельцу, бухгалтеру и юристу по статусу продавца, чекам, данным и маркировке. Не давай окончательных правовых выводов. Для каждого вопроса укажи официальный орган и требуемое подтверждение. Используй только вымышленные данные; реквизиты, договоры и ключи я не передаю». ",
            "Запрос к ИИ без секретов"
          ]
        ],
        "tip": "Письмо о заказе и фискальный чек проверяют раздельно. Официальные точки проверки: https://kkt-online.nalog.ru/faq/ ; https://pd.rkn.gov.ru/ ; https://честныйзнак.рф/business/projects/footwear/ ."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Что доказывает письмо WooCommerce «Заказ получен»?",
          "options": [
            "Магазин сформировал уведомление о заказе",
            "Кассовая система обязательно сформировала фискальный чек",
            "Платёжный сервис окончательно подтвердил поступление денег",
            "Товар уже передан покупателю и заказ завершён"
          ],
          "why": "Уведомление WooCommerce относится к заказу; фискализация и маркировка требуют отдельной проверки."
        },
        {
          "k": "choice",
          "q": "Кто подтверждает применимость правовых требований к конкретному магазину?",
          "options": [
            "Владелец со специалистом по актуальным официальным документам",
            "Исполнитель настройки сайта по шаблонному списку из курса",
            "Поставщик платёжного модуля без сведений об ассортименте",
            "Владелец по советам для другого магазина без сверки документов"
          ],
          "why": "Применимость зависит от бизнеса и фактической схемы работы, а не от темы сайта."
        },
        {
          "k": "choice",
          "q": "Что включить в карту персональных данных?",
          "options": [
            "Формы, оформление заказа, почту, аналитику, копии и получателей данных",
            "Только поля оформления заказа без внешних получателей",
            "Только базу WordPress без писем и резервных копий",
            "Только сведения зарегистрированных пользователей без гостевых заказов"
          ],
          "why": "Нужно понимать полный путь данных, включая внешние сервисы и резервные копии."
        },
        {
          "k": "choice",
          "q": "Для чего проверять раздел обуви «Честного ЗНАКА»?",
          "options": [
            "Для проверки применимости маркировки и процесса оборота обуви",
            "Для замены проверки кодов обычным артикулом WooCommerce",
            "Для подтверждения, что онлайн-продажи всегда исключены из маркировки",
            "Для использования документов поставщика вместо проверки своей схемы продаж"
          ],
          "why": "Артикул WooCommerce не заменяет процессы маркировки и проверки оборота товара."
        },
        {
          "k": "input",
          "q": "Как называется плагин магазина, который формирует описанные в уроке письма о заказах? Напишите латиницей.",
          "a": [
            "WooCommerce"
          ],
          "why": "WooCommerce создаёт уведомления о заказах; их нельзя автоматически считать фискальными чеками."
        },
        {
          "k": "order",
          "q": "Расположите этапы проверки готовности продавца.",
          "words": [
            "Выявить вопросы",
            "Назначить ответственных",
            "Проверить официальные источники",
            "Зафиксировать решения"
          ],
          "a": "Выявить вопросы Назначить ответственных Проверить официальные источники Зафиксировать решения",
          "why": "Сначала определяют неизвестное и ответственных, затем проверяют основания и фиксируют решения."
        }
      ]
    },
    {
      "id": "wp-18",
      "t": "Минимальный набор плагинов без дублирования",
      "plan": "Составить карту функций магазина, выбрать по одному обоснованному инструменту и проверить совместимость до установки.",
      "theory": {
        "rule": "Плагин добавляют ради конкретной задачи, которую сайт пока не решает. Длинный список расширений сам по себе не делает магазин удобнее. Каждый дополнительный компонент нужно обновлять, проверять и учитывать при поиске ошибок. Для учебного магазина используйте правило: одна функция — один основной инструмент. Сначала опишите потребность, затем изучите возможности WordPress, WooCommerce и хостинга, после этого выбирайте расширение.\n\nWooCommerce обеспечивает каталог, корзину и заказы. Для выбранного способа онлайн-оплаты нужен совместимый платёжный модуль. ЮKassa здесь служит примером поставщика с официальной инструкцией для WooCommerce; подключение, доступные способы, договор и допуск конкретного продавца проверяет владелец. Установка модуля не означает подключение к приёму денег. Для простого самовывоза или фиксированной доставки сначала изучите штатные настройки. Интеграция перевозчика нужна только для согласованного сценария.\n\nДля SEO достаточно одного выбранного средства, если его функции действительно нужны. Yoast SEO — возможный пример, а не обязательная часть установки. Для копий сначала запросите у хостинга состав, хранение и возможность восстановления. Если этого недостаточно, рассмотрите один инструмент резервирования. Для отправки почты SMTP-плагин нужен при выбранной схеме доставки или выявленной проблеме. Двухфакторную защиту входа обеспечьте одним подходящим решением, учитывая доступные средства хостинга и организации.\n\nДо установки проверьте официальный источник загрузки, поддержку текущих версий WordPress и WooCommerce, совместимость с HPOS и используемой корзиной или оформлением заказа. Бесплатность не заменяет эту проверку. Запишите назначение, владельца настройки и способ отката. Устанавливайте по одному компоненту на стенде и повторяйте ключевой путь покупателя. Ненужное удаляйте после резервной копии и проверки зависимостей. Готовый результат урока — короткий обоснованный набор, а не установка всех названных примеров.",
        "ex": [
          [
            "Откройте «Плагины → Установленные». Для каждой строки запишите функцию. Затем добавьте в таблицу нужные функции магазина: каталог, оплата, доставка, SEO, копии, почта, защита входа. Отметьте, какие уже покрывают WordPress, WooCommerce или хостинг.",
            "Практика по шагам"
          ],
          [
            "Спроектируйте набор для учебного магазина обуви с самовывозом и одной онлайн-оплатой. Изучите официальную инструкцию модуля ЮKassa как пример. Решите отдельно, нужны ли Yoast SEO, UpdraftPlus и WP Mail SMTP, и обоснуйте каждое решение. Не устанавливайте их списком.",
            "Самостоятельная задача"
          ],
          [
            "У каждой выбранной функции есть один основной инструмент, официальный источник, подтверждение совместимости и ответственный. Сервисы и их доступность проверены для продавца. На стенде работает путь товар → корзина → оформление; дублирующие SEO, SMTP и кеширующие решения не активны одновременно.",
            "Критерии приёмки"
          ],
          [
            "После нового расширения пропала оплата. На стенде верните последнее изменение и повторите сценарий. Сверьте поддержку оформления блоками и версий WooCommerce. Не отключайте случайным образом весь рабочий магазин; локализуйте конфликт одним изменением за раз и изучите документацию поставщика.",
            "Если что-то не работает"
          ],
          [
            "Промпт: «Вот обезличенный список функций учебного магазина и установленных расширений: [список]. Найди дублирование, предложи минимальный набор и вопросы о совместимости HPOS и Checkout Blocks. Для каждого необязательного инструмента объясни условие необходимости. Не запрашивай доступы, ключи или реальные сведения клиентов». ",
            "Запрос к ИИ без секретов"
          ]
        ],
        "tip": "Начинайте с функции, а не названия плагина. Пример официальной интеграции: https://yookassa.ru/docs/support/payments/onboarding/integration/cms-module/woocommerce ; совместимость HPOS: https://woocommerce.com/document/high-performance-order-storage/ ."
      },
      "ex": [
        {
          "k": "choice",
          "q": "С чего начать выбор расширения?",
          "options": [
            "С описания задачи и проверки уже доступных средств",
            "С копирования списка плагинов популярного магазина",
            "С установки всех рекомендованных расширений одновременно",
            "С выбора плагина с наибольшим количеством функций"
          ],
          "why": "Задача определяет необходимость инструмента; часть функций уже есть в системе или у хостинга."
        },
        {
          "k": "choice",
          "q": "Когда нужен отдельный плагин перевозчика?",
          "options": [
            "Когда согласованная доставка требует его интеграции",
            "При любой фиксированной стоимости доставки независимо от задачи",
            "Всегда, даже когда магазин предлагает только самовывоз",
            "Чтобы включить штатную зону доставки WooCommerce"
          ],
          "why": "При простых сценариях может хватать штатных методов WooCommerce."
        },
        {
          "k": "choice",
          "q": "Что означает установка платёжного модуля?",
          "options": [
            "Технический компонент добавлен; подключение продавца ещё надо проверить",
            "Продавец автоматически допущен к приёму реальных платежей",
            "Все методы оплаты поставщика автоматически доступны магазину",
            "Чеки и возвраты полностью настроены без отдельных проверок"
          ],
          "why": "Модуль не заменяет подключение сервиса, настройку и проверку условий продавца."
        },
        {
          "k": "choice",
          "q": "Как безопаснее проверить новое расширение?",
          "options": [
            "Установить одно на стенде и пройти сценарий покупки",
            "Активировать на рабочем сайте и проверить только главную страницу",
            "Установить сразу несколько расширений и проверить итог один раз",
            "Ориентироваться только на оценку плагина без проверки своего оформления"
          ],
          "why": "Одно изменение облегчает проверку результата и поиск конфликта."
        },
        {
          "k": "input",
          "q": "Как называется основное расширение каталога и заказов в этом курсе? Напишите латиницей.",
          "a": [
            "WooCommerce"
          ],
          "why": "WooCommerce обеспечивает основные функции магазина; дополнительные модули решают отдельные задачи."
        },
        {
          "k": "order",
          "q": "Соберите последовательность добавления плагина.",
          "words": [
            "Описать задачу",
            "Проверить штатные возможности",
            "Проверить совместимость",
            "Испытать на стенде"
          ],
          "a": "Описать задачу Проверить штатные возможности Проверить совместимость Испытать на стенде",
          "why": "Необходимость и совместимость определяют до испытания выбранного компонента."
        }
      ]
    },
    {
      "id": "wp-19",
      "t": "Резервная копия, которую удалось восстановить",
      "plan": "Сохранить базу и файлы, обеспечить независимое хранение и восстановить учебный магазин на отдельном стенде.",
      "theory": {
        "rule": "Резервная копия полезна тогда, когда из неё можно восстановить нужное состояние магазина. Значок успешного задания подтверждает выполнение операции, но не заменяет проверку восстановления. В WordPress нужны как минимум база данных и файлы. В базе находятся содержимое, настройки, пользователи и данные магазина; в файлах — изображения, темы, расширения и конфигурация. Для WooCommerce учитывают все используемые таблицы заказов, включая HPOS, если он включён.\n\nСначала узнайте, что уже делает хостинг: какие части сайта сохраняет, где хранит архивы, кто имеет доступ и как запускается восстановление. Ответ «копии есть» недостаточен. Если возможностей не хватает, выберите один инструмент, например UpdraftPlus из официального источника. Его состав копии и процедуру восстановления сверяйте с документацией установленной версии. Нельзя считать стандартный экспорт записей WordPress полной копией магазина.\n\nХраните хотя бы одну пригодную копию независимо от рабочего сайта. Архив в той же учётной записи может исчезнуть вместе с сайтом при сбое или компрометации. Место хранения выбирают с учётом доступа, размещения персональных данных и фактических условий сервиса. Архивы защищают, доступ ограничивают; их не кладут в публичную папку загрузок и не отправляют в чат.\n\nПроверку проводите на отдельном стенде с закрытым доступом. Отключите реальные платежи и исходящие письма до восстановления, чтобы копия не связалась с покупателями. Восстановите выбранную пару базы и файлов одного состояния. Проверьте вход, изображения, вариации товаров, настройки и учебные заказы. Запишите дату копии, состав и результат теста. Частоту и срок хранения определяют по частоте изменений и допустимой потере данных владельца. Перед обновлением или переносом делайте дополнительную копию. Для действующего магазина план восстановления обязан учитывать новые заказы, поступившие после выбранной точки.",
        "ex": [
          [
            "Запросите у хостинга сведения о базе, файлах, независимом хранении и восстановлении. Если выбран UpdraftPlus, на стенде откройте его настройки и создайте ручную копию базы и файлов. Убедитесь, что все части задания завершились, и получите архивы через защищённый доступ.",
            "Практика по шагам"
          ],
          [
            "Восстановите учебную копию на отдельном закрытом стенде. До запуска заблокируйте реальные платежи и исходящую почту средствами среды. Создайте отчёт: источник копии, дата, компоненты, проверенные товары и заказы, результат и выявленные потери.",
            "Самостоятельная задача"
          ],
          [
            "Есть база и необходимые файлы одного состояния, независимое защищённое хранение, понятный ответственный и инструкция восстановления. На стенде открываются изображения и вариации, доступны учебные заказы и админка. Проверка зафиксирована; исходящие письма и реальные оплаты на копии заблокированы.",
            "Критерии приёмки"
          ],
          [
            "После восстановления товары есть, а изображения пропали. Проверьте наличие и восстановление файлов uploads, права доступа и URL стенда. Если нет заказов, проверьте выбранную базу и состав таблиц HPOS. Не перезаписывайте рабочую базу для эксперимента; продолжайте диагностику на отдельной копии.",
            "Если что-то не работает"
          ],
          [
            "Промпт: «Составь план проверки восстановления учебного WooCommerce из базы и файлов. Учти HPOS, изоляцию почты и платежей, изображения и вариации. Вот обезличенные результаты: [описание]. Помоги найти недостающие проверки. Архивы, SQL, пароли и клиентские данные я не загружаю». ",
            "Запрос к ИИ без секретов"
          ]
        ],
        "tip": "Копия считается проверенной после восстановления на изолированном стенде. Официальный пример: https://teamupdraft.com/docs/updraftplus/getting-started/tutorial/restore-wordpress-site-with-updraftplus/ ."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Что нужно для полной восстанавливаемой копии магазина?",
          "options": [
            "База данных и необходимые файлы согласованного состояния",
            "Только база данных, поскольку в ней перечислены изображения",
            "Только папка uploads, поскольку товары видны в каталоге",
            "Экспорт товаров CSV и список плагинов вместо базы и файлов"
          ],
          "why": "Данные и файлы решают разные части восстановления; один список настроек не заменяет их."
        },
        {
          "k": "choice",
          "q": "Почему нужна копия вне рабочего сайта?",
          "options": [
            "Чтобы сбой или потеря доступа к сайту не уничтожили единственный архив",
            "Чтобы отказаться от сохранения базы и оставлять только файлы",
            "Чтобы любая старая копия автоматически содержала новые заказы",
            "Чтобы считать копию проверенной без восстановления"
          ],
          "why": "Независимое хранение снижает зависимость копий от одного места и одной учётной записи."
        },
        {
          "k": "choice",
          "q": "Где проводить первое учебное восстановление?",
          "options": [
            "На отдельном закрытом стенде с изолированными почтой и платежами",
            "Поверх рабочего магазина после создания ещё одной копии",
            "На публичном клоне с рабочей почтой и реальными ключами оплаты",
            "На том же рабочем сайте с временно изменённым названием магазина"
          ],
          "why": "Изолированный стенд позволяет проверить копию без изменения рабочего магазина и сообщений покупателям."
        },
        {
          "k": "choice",
          "q": "Что подтверждает пригодность резервной копии?",
          "options": [
            "Успешное восстановление и проверка ключевых данных и функций",
            "Успешный статус задания без открытия восстановленного сайта",
            "Наличие архива большого размера без проверки состава",
            "Обещание хостинга хранить копии без пробного восстановления"
          ],
          "why": "Лишь восстановление показывает, что нужное состояние действительно можно вернуть."
        },
        {
          "k": "input",
          "q": "Как называется папка внутри wp-content, в которой WordPress обычно хранит загруженные изображения? Напишите имя папки латиницей.",
          "a": [
            "uploads"
          ],
          "why": "Загруженные медиа обычно находятся в wp-content/uploads; база хранит сведения о них."
        },
        {
          "k": "order",
          "q": "Расположите этапы учебной проверки копии.",
          "words": [
            "Определить состав",
            "Создать копию",
            "Восстановить на стенде",
            "Проверить результат"
          ],
          "a": "Определить состав Создать копию Восстановить на стенде Проверить результат",
          "why": "Проверка завершает восстановление и подтверждает пригодность выбранного состава."
        }
      ]
    },
    {
      "id": "wp-20",
      "t": "Письма магазина: отправлено ещё не значит доставлено",
      "plan": "Настроить согласованного отправителя, проверить SPF и DKIM по документации поставщика и получить реальные учебные уведомления на контрольные ящики.",
      "theory": {
        "rule": "Магазину нужны служебные письма: подтверждения заказа, изменения статуса и восстановление доступа. WooCommerce формирует содержание и выбирает событие отправки, а доставку обеспечивает почтовая инфраструктура. Поэтому сообщение «письмо отправлено» в интерфейсе ещё не доказывает появление письма во входящих. Проверять нужно весь путь от события заказа до контрольного почтового ящика.\n\nСначала определите согласованный адрес отправителя на домене магазина и почтового поставщика. Узнайте его действующие условия подключения, доступность для владельца, расположение данных и требования к авторизации. Если нужна интеграция, выберите один совместимый инструмент, например WP Mail SMTP. Название плагина не означает, что подходят любые SMTP-сервер и пароль. Используйте документацию именно выбранного поставщика и поддерживаемый им способ подключения.\n\nSPF сообщает, каким серверам разрешена отправка от имени домена в рамках проверки почты. DKIM позволяет проверять подпись письма. Значения DNS-записей берут у поставщика, а не из чужого урока. Перед изменением сохраните существующие записи и проверьте все используемые отправители; не создавайте противоречащие настройки наугад. Изменения DNS и почтового подключения выполняет ответственный с доступом к домену. Пароли приложений, токены и секретные ключи нельзя вставлять в задания, скриншоты или запросы ИИ.\n\nПосле технического теста создайте учебный заказ и получите уведомления отдельно как покупатель и как администратор. Проверьте адрес отправителя, номер заказа, ссылки, читаемость на телефоне и папку спама. Восстановление пароля проверяйте только для своей тестовой учётной записи. Учебные письма отправляйте на согласованные контрольные адреса, а на клонированных стендах блокируйте массовую рассылку. Письмо WooCommerce не заменяет кассовый чек. Сохраняйте краткий обезличенный результат проверки: событие, время, получатель, итог доставки и следующее действие при ошибке.",
        "ex": [
          [
            "В настройках писем WooCommerce проверьте включение нужных уведомлений, адрес администратора и имя отправителя. Выберите почтового поставщика и откройте его инструкцию. При необходимости настройте один инструмент, например WP Mail SMTP; DNS-записи SPF и DKIM вносите только по инструкции поставщика.",
            "Практика по шагам"
          ],
          [
            "Отправьте техническое тестовое письмо на свой контрольный адрес, затем создайте учебный заказ с отдельным контрольным адресом покупателя. Сверьте уведомление администратора и письмо покупателю; проверьте спам, ссылки, тему и отображение на телефоне. Результат занесите в таблицу без адресов реальных клиентов.",
            "Самостоятельная задача"
          ],
          [
            "Согласованы домен отправителя и поставщик. Проверены применимые SPF и DKIM, тестовое письмо получено, события WooCommerce проверены для покупателя и администратора. Ссылки ведут на нужный стенд, секреты не раскрыты, на копиях сайта исключена отправка покупателям.",
            "Критерии приёмки"
          ],
          [
            "Тестовое письмо доходит, письмо заказа — нет. Проверьте, возникло ли нужное событие, включён ли конкретный тип уведомления, верен ли адрес получателя и нет ли ошибки в журнале. Если не доходит даже тест, проверьте соединение и авторизацию по инструкции поставщика, затем DNS и спам.",
            "Если что-то не работает"
          ],
          [
            "Промпт: «Помоги составить дерево диагностики: техническое письмо [пришло/не пришло], покупательское [результат], административное [результат]. Учебный сайт использует WooCommerce и один почтовый модуль. Дай последовательные проверки без изменения нескольких настроек сразу. Пароли, токены, полные заголовки с адресами и реальные заказы не запрашивай». ",
            "Запрос к ИИ без секретов"
          ]
        ],
        "tip": "Сначала тест транспорта, затем настоящее учебное событие WooCommerce. Инструкция теста: https://wpmailsmtp.com/docs/how-to-send-a-test-email-in-wp-mail-smtp/ ; значения SPF и DKIM берите у выбранного почтового поставщика."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Что надёжнее подтверждает доставку письма?",
          "options": [
            "Его получение на контрольном ящике с проверкой содержимого",
            "Сообщение плагина об успешной передаче письма на отправку",
            "Зелёный статус соединения с почтовым сервером",
            "Успешное сохранение настроек SMTP и адреса отправителя"
          ],
          "why": "Принятие сообщения компонентом отправки не гарантирует его появление у адресата."
        },
        {
          "k": "choice",
          "q": "Откуда брать значения SPF и DKIM?",
          "options": [
            "Из документации и настроек выбранного почтового поставщика",
            "Из инструкции другого почтового сервиса без адаптации",
            "Из старых настроек домена без проверки текущих отправителей",
            "Из шаблонного набора DNS, одинакового для всех магазинов"
          ],
          "why": "Параметры связаны с конкретным доменом и почтовой инфраструктурой."
        },
        {
          "k": "choice",
          "q": "Тест SMTP проходит, письмо нового заказа не приходит. Что проверить прежде всего?",
          "options": [
            "Событие заказа, включение нужного уведомления и адрес получателя",
            "Сразу заменить почтового поставщика, не проверяя событие заказа",
            "Отключить авторизацию SMTP, потому что тест уже доставлен",
            "Добавить ещё один SMTP-плагин до проверки уведомления"
          ],
          "why": "Работающий транспорт помогает сузить поиск до события и настроек уведомления."
        },
        {
          "k": "choice",
          "q": "Что можно передать ИИ при диагностике почты?",
          "options": [
            "Обезличенное описание ошибки и результатов тестов",
            "Полный журнал с адресами покупателей без обезличивания",
            "Секретный ключ, чтобы ИИ проверил правильность подключения",
            "Архив базы заказов для воспроизведения проблемы доставки"
          ],
          "why": "Для плана диагностики достаточно симптомов без секретов и персональных данных."
        },
        {
          "k": "input",
          "q": "Как сокращённо называется механизм подписи писем, проверку которого описывает урок? Ответ — четыре латинские буквы.",
          "a": [
            "DKIM"
          ],
          "why": "DKIM использует подпись, которая помогает принимающей стороне проверить письмо."
        },
        {
          "k": "order",
          "q": "Соберите последовательность проверки почты.",
          "words": [
            "Выбрать отправителя",
            "Настроить поставщика",
            "Отправить тест",
            "Проверить письмо заказа"
          ],
          "a": "Выбрать отправителя Настроить поставщика Отправить тест Проверить письмо заказа",
          "why": "После настройки транспорта нужно проверить как технический тест, так и уведомление реального учебного события."
        }
      ]
    },
    {
      "id": "wp-21",
      "t": "Базовое SEO и Яндекс Вебмастер",
      "plan": "Подготовить понятные адреса и содержание, проверить доступность индексирования и подключить сайт к Яндекс Вебмастеру без обещаний позиций.",
      "theory": {
        "rule": "Поисковое продвижение начинается с понятного и доступного сайта. Человек должен увидеть, какую обувь вы продаёте, чем отличаются модели и как оформить покупку. Поисковому роботу нужны доступные страницы и связи между ними. SEO-плагин помогает управлять отдельными параметрами, но не создаёт полезный каталог и не гарантирует индексацию или место в выдаче.\n\nДо публичного запуска выберите понятную структуру постоянных ссылок WordPress и проверьте адреса товаров и категорий. На действующем сайте изменение адресов требует плана перенаправлений со старых URL; нельзя просто переименовать весь каталог и потерять входящие ссылки. Для учебного стенда используйте короткие осмысленные названия. Заголовок страницы описывает её содержание, а подзаголовки делят текст на понятные части. Не делайте весь текст заголовком и не повторяйте поисковые фразы вместо объяснения товара.\n\nЗаполните названия, описание материала, размеров, особенностей и условий выбора. Альтернативный текст изображения должен описывать значимое изображение для посетителя, которому оно недоступно. Ссылки из меню, категорий и связанных материалов помогают находить страницы. При необходимости выберите один SEO-инструмент, например Yoast SEO, и изучите его настройки. Одновременное использование нескольких генераторов SEO-разметки и карт сайта может создавать путаницу.\n\nНа закрытом стенде оставьте защиту доступа и запрет индексации. Перед согласованным запуском проверьте настройку видимости WordPress, robots.txt и применимые метки noindex, не открывая технические и личные страницы без причины. В Яндекс Вебмастере подтвердите права способом из официальной инструкции, укажите доступную карту Sitemap и наблюдайте диагностику. Передача Sitemap сообщает о структуре, но не обязывает поисковую систему добавить каждый URL. Проверяйте ответ сервера и причины исключения конкретной страницы. Результат урока — техническая готовность полезных страниц и настроенная наблюдаемость, а не обещание трафика к определённой дате.",
        "ex": [
          [
            "На стенде откройте «Настройки → Постоянные ссылки», выберите согласованную структуру и проверьте товар и категорию. Заполните осмысленные заголовки и подзаголовки двух страниц. Найдите Sitemap, который создаёт WordPress или единственный выбранный SEO-инструмент; проверьте его URL.",
            "Практика по шагам"
          ],
          [
            "Улучшите карточку одной модели обуви: добавьте особенности, материал, выбор размера и полезное описание изображения. Составьте план подключения рабочего домена к Яндекс Вебмастеру: подтверждение прав, Sitemap и проверка страницы. Не открывайте закрытый учебный стенд ради индексации.",
            "Самостоятельная задача"
          ],
          [
            "Товары доступны из навигации, URL и заголовки понятны, тексты помогают выбору. Нет случайного второго SEO-генератора. Для рабочего запуска проверены доступ робота и запреты, права в Вебмастере подтверждены, Sitemap доступен. Для стенда сохранены ограничения индексации и доступа.",
            "Критерии приёмки"
          ],
          [
            "Страница не появилась в поиске. Проверьте правильный домен и протокол, HTTP-ответ, доступ без авторизации, robots.txt и noindex. Посмотрите сведения об URL в Вебмастере. Исправление технической ошибки позволяет повторную проверку, но не даёт гарантии включения в выдачу.",
            "Если что-то не работает"
          ],
          [
            "Промпт: «Проверь учебное описание обуви: [вымышленный текст]. Предложи понятный заголовок, подзаголовки и недостающие сведения для выбора размера. Не добавляй выдуманные характеристики и обещания позиций. Отдельно составь технический список проверки URL и Sitemap без доступов к сайту и личным данным». ",
            "Запрос к ИИ без секретов"
          ]
        ],
        "tip": "Sitemap сообщает о страницах, но не гарантирует их попадания в поиск: https://yandex.ru/support/webmaster/ru/controlling-robot/sitemap ."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Что даёт передача Sitemap Яндексу?",
          "options": [
            "Сообщает поисковой системе структуру доступных страниц",
            "Гарантирует включение каждого переданного товара в поиск",
            "Автоматически снимает запреты robots.txt и noindex",
            "Заменяет ссылки меню и навигацию между категориями"
          ],
          "why": "Яндекс прямо указывает, что переданные URL не обязательно попадут в результаты поиска."
        },
        {
          "k": "choice",
          "q": "Что делать перед изменением URL действующего каталога?",
          "options": [
            "Подготовить карту старых и новых адресов и перенаправления",
            "Изменить адреса сразу и оставить старые ссылки без перенаправлений",
            "Удалить прежние URL из Sitemap и считать переход завершённым",
            "Изменить только заголовки страниц вместо настройки адресов"
          ],
          "why": "Переход со старых адресов нужно сохранить для посетителей и поисковых систем."
        },
        {
          "k": "choice",
          "q": "Какой заголовок полезнее для карточки?",
          "options": [
            "Точное название модели и понятное назначение",
            "Одинаковая цепочка поисковых фраз для всего ассортимента",
            "Только общее слово «Обувь» у каждой модели",
            "Подробный список всех ключевых слов вместо названия модели"
          ],
          "why": "Заголовок помогает человеку и роботу понять содержание конкретной страницы."
        },
        {
          "k": "choice",
          "q": "Как поступить с закрытым учебным стендом?",
          "options": [
            "Сохранить защиту доступа и ограничение индексации",
            "Разрешить индексацию, оставив на нём копию рабочих данных",
            "Снять пароль со стенда, чтобы проверить добавление Sitemap",
            "Считать настройку видимости WordPress заменой защиты доступа"
          ],
          "why": "Для освоения инструмента не требуется публиковать учебную копию и её данные."
        },
        {
          "k": "input",
          "q": "Как называется файл карты сайта, который сообщает поисковой системе список URL? Укажите термин латиницей без расширения.",
          "a": [
            "Sitemap"
          ],
          "why": "Sitemap перечисляет адреса и помогает роботу узнать о структуре сайта."
        },
        {
          "k": "order",
          "q": "Расположите действия по подготовке страниц к поиску.",
          "words": [
            "Подготовить содержание",
            "Проверить доступность",
            "Подтвердить права",
            "Передать Sitemap"
          ],
          "a": "Подготовить содержание Проверить доступность Подтвердить права Передать Sitemap",
          "why": "Сначала готовят доступный полезный сайт, затем подключают диагностику и передают карту."
        }
      ]
    },
    {
      "id": "wp-22",
      "t": "Защита и скорость без поломки оформления",
      "plan": "Настроить доступы и обновления, измерить скорость и проверить кеширование вместе с совместимостью HPOS и Checkout Blocks.",
      "theory": {
        "rule": "Безопасность магазина складывается из понятных правил обслуживания. Пользуйтесь уникальными паролями и двухфакторной защитой входа для ответственных аккаунтов. Сохраните резервные коды восстановления в защищённом месте вне сайта. Каждому сотруднику выдавайте отдельную учётную запись с минимально нужной ролью; управление заказами не требует передачи общего пароля администратора. Доступы уволенных и временных исполнителей своевременно отзывают.\n\nУстанавливайте WordPress, темы и расширения из официальных источников или у подтверждённого разработчика. Взломанные платные плагины, называемые nulled, нельзя считать экономией: происхождение их кода и обновлений не подтверждено. Удаляйте неиспользуемые компоненты после проверки зависимостей. Обновления планируйте вместе с резервированием: на стенде проверяйте новую версию и ключевой путь покупки, затем переносите согласованное изменение. Срочные исправления безопасности требуют оперативного решения ответственного, а не бесконечного откладывания.\n\nСкорость оценивают до и после изменения на одинаковых страницах и устройстве. Начните с размеров изображений, лишних компонентов и возможностей сервера. Не включайте сразу несколько кеширующих плагинов. Уточните у хостинга существующие уровни кеша и совместимость выбранного решения. Корзина, оформление заказа и личный кабинет содержат индивидуальные данные и должны обходить полный кеш страницы. Проверьте также правила для сессий, cookies и платёжных уведомлений по документации конкретного сервера и модуля.\n\nHPOS меняет способ хранения заказов, а блоки корзины и оформления используют отдельную архитектуру интеграций. Поддержку обеих возможностей проверяйте у каждого значимого расширения; одна совместимость не доказывает другую. Не переключайте хранилище заказов наугад ради скорости. После оптимизации пройдите покупку в разных браузерных сессиях: товары и данные одного покупателя не должны появляться у другого. Готовый результат — измеренное улучшение при сохранении оплаты, писем, остатков и личного доступа, с понятным способом отката.",
        "ex": [
          [
            "На стенде составьте список учётных записей и назначений ролей. Настройте двухфакторный вход ответственного администратора, сохраните коды восстановления защищённо. Создайте копию, обновите один компонент и повторите путь покупки. Зафиксируйте проверку версий и результата.",
            "Практика по шагам"
          ],
          [
            "Измерьте загрузку каталога и карточки до оптимизации. Уточните у хостинга уровни кеша; исключите корзину, оформление и личный кабинет по его инструкции. Проверьте две независимые сессии, оплату в песочнице и совместимость расширений с HPOS и используемыми блоками.",
            "Самостоятельная задача"
          ],
          [
            "Нет общих администраторских аккаунтов и nulled-компонентов; защита входа и восстановление доступа проверены. Изменения прошли стенд. Кеш не выдаёт чужие данные, динамические страницы исключены, оформление работает, совместимость HPOS и блоков подтверждена отдельно. Измерения до и после сопоставимы.",
            "Критерии приёмки"
          ],
          [
            "Корзина показывает старое содержимое. В изолированной проверке временно обойдите кеш и сравните результат, затем проверьте серверный кеш, CDN и исключения. Если после оптимизации исчезла оплата, отмените последнее изменение и проверьте объединение скриптов и совместимость модуля с оформлением.",
            "Если что-то не работает"
          ],
          [
            "Промпт: «Помоги составить план диагностики WooCommerce: [обезличенные симптомы], кеш на уровне [описание], оформление [блоки/другое], HPOS [состояние]. Предлагай по одному обратимому действию на стенде и критерий результата. Не запрашивай пароли, резервные коды 2FA, ключи или данные заказов». ",
            "Запрос к ИИ без секретов"
          ]
        ],
        "tip": "Исключения кеша: https://developer.woocommerce.com/docs/best-practices/performance/configuring-caching-plugins/ ; HPOS: https://woocommerce.com/document/high-performance-order-storage/ ; защита: https://developer.wordpress.org/advanced-administration/security/hardening/ ."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Какие страницы обычно исключают из полного кеша WooCommerce?",
          "options": [
            "Корзину, оформление заказа и личный кабинет",
            "Только оформление заказа, оставив полный кеш личного кабинета",
            "Только каталог и карточки, оставив кеш корзины включённым",
            "Только админку, поскольку покупатели в неё не входят"
          ],
          "why": "Эти страницы показывают индивидуальные данные пользователя и должны оставаться динамическими."
        },
        {
          "k": "choice",
          "q": "Какой доступ нужен сотруднику для работы?",
          "options": [
            "Отдельная учётная запись с минимально необходимыми правами",
            "Общая администраторская запись для всех сотрудников",
            "Отдельная запись с ролью администратора независимо от задачи",
            "Учётная запись владельца с передачей пароля на время работы"
          ],
          "why": "Отдельная запись и минимальные права снижают риск и позволяют управлять доступом конкретного сотрудника."
        },
        {
          "k": "choice",
          "q": "Что доказывает заявление «расширение совместимо с HPOS»?",
          "options": [
            "Поддержку соответствующего хранения заказов; блоки оформления проверяют отдельно",
            "Автоматическую поддержку блочного оформления заказа",
            "Гарантию корректной работы всех платёжных уведомлений",
            "Возможность переключить хранилище без проверки и резервирования"
          ],
          "why": "HPOS и Checkout Blocks относятся к разным механизмам WooCommerce."
        },
        {
          "k": "choice",
          "q": "Как оценить пользу оптимизации?",
          "options": [
            "Сравнить одинаковые измерения и проверить покупку после изменения",
            "Сравнить первый запуск без кеша с повторным запуском с кешем и не учитывать разницу",
            "Оценить только скорость главной страницы без проверки оформления",
            "Считать рост оценки одного теста достаточным без проверки заказа"
          ],
          "why": "Ускорение имеет смысл, если измерено сопоставимо и не нарушило функции магазина."
        },
        {
          "k": "input",
          "q": "Как сокращённо называется хранилище заказов WooCommerce на отдельных таблицах? Ответ — четыре латинские буквы.",
          "a": [
            "HPOS"
          ],
          "why": "High-Performance Order Storage хранит заказы в специализированных таблицах."
        },
        {
          "k": "order",
          "q": "Расположите действия при обновлении компонента магазина.",
          "words": [
            "Создать копию",
            "Обновить на стенде",
            "Проверить покупку",
            "Перенести проверенное изменение"
          ],
          "a": "Создать копию Обновить на стенде Проверить покупку Перенести проверенное изменение",
          "why": "Резервирование и проверка на стенде должны предшествовать изменению рабочего магазина."
        }
      ]
    },
    {
      "id": "wp-23",
      "t": "Перенос со стенда на рабочий домен",
      "plan": "Подготовить перенос с резервированием и HTTPS, защитить новые заказы и проверить рабочую среду по плану отката.",
      "theory": {
        "rule": "Стенд нужен для безопасной подготовки изменений, рабочий магазин — для покупателей и заказов. Перенос между ними выполняют по явному плану: что именно переносится, когда, кто проверяет и как возвращается прежнее состояние. Полная замена рабочего сайта копией стенда допустима не для каждого случая. Если на рабочем магазине уже появляются заказы, старая база стенда может затереть новые покупки, пользователей и остатки.\n\nПеред переносом сохраните базу и файлы обеих сред и проверьте доступ к копиям. Согласуйте окно обслуживания и остановку новых оформлений, если выбранный способ требует замены базы. При этом нужно учесть ещё ожидающие платёжные уведомления и изменение статусов. Для действующего магазина безопасный состав переноса и работу с данными заказов определяют отдельно; начинающему не следует самостоятельно сливать таблицы. Экспорт товаров или записей решает ограниченную задачу и не заменяет полную резервную копию.\n\nНа новом месте заранее проверьте серверные требования, сертификат HTTPS и доступы ответственных. Адреса WordPress, ссылки в содержимом и изображения должны соответствовать целевому домену. Для замены URL применяйте совместимый инструмент по документации, учитывающий структуру данных WordPress, а не массовое редактирование SQL вслепую. Проверьте отсутствие смешанного содержимого и цепочек ошибочных перенаправлений.\n\nПосле переноса пересмотрите настройки, которые относятся к среде: почтовую отправку, режим платёжного модуля, уведомления, адреса возврата, индексацию и кеш. Не включайте реальные оплаты автоматически вместе с копированием файлов. На рабочем домене повторите согласованные технические проверки и получите решение владельца о запуске. Заранее назначьте признаки неудачи и ответственного за откат. Откат базы также может удалить новые заказы, поэтому при их наличии требуется отдельное восстановление с сохранением актуальных данных. Закройте стенд от посетителей и поискового робота после завершения.",
        "ex": [
          [
            "Составьте план переноса: исходная и целевая среды, состав изменений, копии, окно обслуживания, ответственный и критерии отката. Отметьте, есть ли на рабочем сайте новые заказы. Если есть, исключите простую замену его базы старой копией стенда.",
            "Практика по шагам"
          ],
          [
            "Выполните учебный перенос между двумя изолированными средами. Проверьте HTTPS, адреса сайта, изображения и постоянные ссылки. Сверьте настройки почты и песочницы оплаты; запишите, какие параметры нельзя автоматически переносить в рабочий режим.",
            "Самостоятельная задача"
          ],
          [
            "Копии доступны, способ переноса соответствует наличию заказов, HTTPS работает, URL и изображения ведут в целевую среду. Оформление и контрольные письма проверены. Есть ответственный, условия отката и письменное решение владельца перед реальными продажами. Стенд закрыт.",
            "Критерии приёмки"
          ],
          [
            "После переноса изображения ведут на старый домен. Проверьте настройки URL и ссылки в данных, затем используйте совместимый способ замены на копии. Если обнаружены пропавшие заказы, остановите новые изменения, сохраните текущее состояние и привлеките специалиста; повторное восстановление старой базы может увеличить потерю.",
            "Если что-то не работает"
          ],
          [
            "Промпт: «Проверь план учебного переноса WooCommerce: [обезличенный план]. На целевой среде [есть/нет] новых заказов. Найди риск перезаписи данных, недостающие проверки HTTPS, URL, почты и оплаты. Не предлагай слепое объединение таблиц. Доступы, SQL, реальные домены клиентов и ключи я не передаю». ",
            "Запрос к ИИ без секретов"
          ]
        ],
        "tip": "Начинайте перенос с копий файлов и базы; новые заказы требуют отдельного плана сохранения. Официальное руководство: https://developer.wordpress.org/advanced-administration/upgrade/migrating/ ."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Чем опасна замена рабочей базы старой базой стенда?",
          "options": [
            "Можно потерять новые заказы, пользователей и остатки",
            "Будут заменены только изображения, а заказы всегда сохранятся",
            "Пострадают только настройки темы, поскольку заказы хранятся вне базы",
            "Все заказы объединятся автоматически при совпадении домена"
          ],
          "why": "Старая копия не содержит изменений, которые появились в рабочей базе позднее."
        },
        {
          "k": "choice",
          "q": "Что сделать до переноса?",
          "options": [
            "Сохранить и проверить доступность копий обеих сред",
            "Скопировать стенд поверх рабочего сайта, затем сделать резервную копию",
            "Сохранить только CSV товаров, считая его полной копией магазина",
            "Полагаться на копию стенда без сохранения целевой рабочей базы"
          ],
          "why": "Копии нужны для восстановления исходного и целевого состояний при неудаче."
        },
        {
          "k": "choice",
          "q": "Как менять домен внутри данных WordPress?",
          "options": [
            "Совместимым инструментом по документации с проверкой на копии",
            "Обычной заменой строк во всём SQL без учёта структуры данных",
            "Изменением только заголовка сайта, оставив адреса в содержимом",
            "Заменой только домена у регистратора без проверки ссылок сайта"
          ],
          "why": "Ссылки находятся в разных данных, часть которых имеет структуру, чувствительную к обычной текстовой замене."
        },
        {
          "k": "choice",
          "q": "Что проверить после переноса кроме внешнего вида?",
          "options": [
            "HTTPS, URL, оформление, почту, платёжный режим и уведомления",
            "Только открытие главной страницы и админки",
            "Только количество товаров без проверки оплаты и уведомлений",
            "Только сертификат, считая все интеграции независимыми от домена"
          ],
          "why": "Перенос меняет окружение интеграций, поэтому визуального совпадения недостаточно."
        },
        {
          "k": "input",
          "q": "Как называется протокол защищённого подключения, сертификат которого проверяют при переносе? Укажите сокращение латиницей.",
          "a": [
            "HTTPS"
          ],
          "why": "HTTPS обеспечивает защищённое соединение; его работоспособность проверяют на целевом домене."
        },
        {
          "k": "order",
          "q": "Расположите основные этапы учебного переноса.",
          "words": [
            "Согласовать план",
            "Сделать копии",
            "Выполнить перенос",
            "Проверить целевую среду"
          ],
          "a": "Согласовать план Сделать копии Выполнить перенос Проверить целевую среду",
          "why": "План и копии готовят до изменения среды, а затем проверяют технический результат."
        }
      ]
    },
    {
      "id": "wp-24",
      "t": "Итоговый проект: магазин обуви перед запуском",
      "plan": "Собрать магазин с двенадцатью товарами и пятью содержательными страницами, пройти сценарии песочницы и подготовить пакет приёмки владельцу.",
      "theory": {
        "rule": "Итоговый проект объединяет каталог, содержание и проверку работы магазина. Создайте учебный магазин обуви с двенадцатью карточками товаров, включая вариативные модели с размерами. Для вариаций задайте цену, доступность и осмысленные изображения там, где они отличаются. Недоступный размер не должен превращаться в доступную покупку только потому, что заполнена родительская карточка. Все сведения и изображения должны быть разрешены для использования.\n\nПодготовьте пять содержательных страниц: «О магазине», «Контакты», «Оплата и доставка», «Обмен и возврат», «Политика обработки персональных данных». Это учебный комплект содержания, а не исчерпывающий юридический перечень. Последние документы и реквизиты владелец согласует со специалистом применительно к бизнесу. Системные страницы каталога, корзины, оформления и личного кабинета проверьте отдельно. Навигация должна помогать покупателю найти товар и условия до оплаты.\n\nПройдите настоящий пользовательский путь на стенде: выбор модели и размера, корзина, доставка, оформление и оплата в официальной песочнице выбранного поставщика. Настоящий здесь означает проверку поведения интерфейса и интеграции тестовыми средствами, без реального списания. Проверьте успех, отказ или отмену платежа и возврат в поддерживаемом тестовом сценарии. Сопоставьте события поставщика, статус заказа, остатки и письма покупателю и администратору. Возврат оформляйте по инструкции модуля, а не простым переименованием статуса.\n\nОтдельно проверьте телефон, восстановление резервной копии, изоляцию данных между сессиями и готовность переноса. Соберите отчёт с ожидаемым и фактическим результатом каждого сценария. Ошибки оплаты, чужие данные и отсутствие проверенной копии блокируют запуск. Успешное завершение курса не включает реальные платежи автоматически. Владелец письменно подтверждает техническую приёмку, правовые контрольные точки, ответственных и план отката, после чего отдельно разрешает согласованное включение рабочего режима.",
        "ex": [
          [
            "Создайте двенадцать карточек, включая вариативную обувь по размерам. Подготовьте пять страниц из задания, меню и системные страницы WooCommerce. Заполните таблицу приёмки с колонками «Сценарий — ожидается — получено — доказательство — решение».",
            "Практика по шагам"
          ],
          [
            "На телефоне и компьютере оформите разные учебные заказы в песочнице: успех, отказ или отмена, возврат по доступному тестовому сценарию. Проверьте отсутствующий размер, доставку, остатки и письма обоим адресатам. Выполните восстановление копии на отдельном стенде и приложите обезличенный отчёт.",
            "Самостоятельная задача"
          ],
          [
            "Есть двенадцать корректных товаров, вариации размеров, пять заполненных страниц и рабочая навигация. Пройдены мобильный путь, успех и ошибка оплаты, тест возврата, письма, независимые сессии и восстановление. Все блокирующие дефекты закрыты, правовые вопросы подтверждены владельцем; разрешение реальных продаж оформлено отдельно письменно.",
            "Критерии приёмки"
          ],
          [
            "Песочница показывает успех, а заказ остаётся неоплаченным. Сопоставьте идентификаторы тестового заказа и платежа, журнал модуля и доставку уведомления поставщика. Не выдавайте товар по одной странице успеха и не переводите рабочий заказ вручную ради отчёта. Исправьте интеграцию и повторите сценарий на стенде.",
            "Если что-то не работает"
          ],
          [
            "Промпт: «Выступи проверяющим учебного магазина обуви. Вот обезличенная матрица тестов и результаты: [таблица]. Проверь покрытие вариаций, оплаты в песочнице, отказа, возврата, почты, мобильной версии и восстановления. Раздели дефекты по влиянию на запуск. Не считай сдачу проекта разрешением реальных списаний и не запрашивай секреты». ",
            "Запрос к ИИ без секретов"
          ]
        ],
        "tip": "Сдача проекта заканчивается отчётом и письменным решением владельца. Настройки конкретной интеграции сверяйте с https://yookassa.ru/docs/support/payments/onboarding/integration/cms-module/woocommerce ; пример восстановления: https://teamupdraft.com/docs/updraftplus/getting-started/tutorial/restore-wordpress-site-with-updraftplus/ ."
      },
      "ex": [
        {
          "k": "choice",
          "q": "Что означает полноценный тест покупки в итоговом проекте?",
          "options": [
            "Путь покупателя через интеграцию в официальной песочнице без реального списания",
            "Открытие страницы успеха без сопоставления статуса заказа и платежа",
            "Только ручное создание заказа администратором",
            "Один реальный платёж для проверки без отдельного разрешения владельца"
          ],
          "why": "Нужно проверить интерфейс и интеграцию тестовыми средствами, сохраняя отдельное решение о реальных продажах."
        },
        {
          "k": "choice",
          "q": "Что проверить у вариативной обуви?",
          "options": [
            "Цену, доступность и корректное добавление выбранного размера",
            "Только родительскую карточку, считая доступность размеров одинаковой",
            "Только выбранный по умолчанию размер без проверки остальных",
            "Только наличие атрибута размера без проверки вариаций в корзине"
          ],
          "why": "Покупатель приобретает конкретную вариацию, поэтому проверка родительской карточки недостаточна."
        },
        {
          "k": "choice",
          "q": "Как проверить возврат по учебной оплате?",
          "options": [
            "Пройти поддерживаемый тестовый сценарий по инструкции поставщика и сверить результат",
            "Сменить статус заказа на «Возвращён» и считать операцию завершённой",
            "Удалить заказ, чтобы остатки и деньги вернулись автоматически",
            "Проверить только сообщение сайта, не сверяя результат платёжной операции"
          ],
          "why": "Возврат связан с платёжной операцией; смена текста статуса сама по себе не подтверждает возврат средств."
        },
        {
          "k": "choice",
          "q": "Кто разрешает включение реальных продаж после приёмки?",
          "options": [
            "Владелец отдельным письменным решением после закрытия контрольных точек",
            "Исполнитель автоматически после прохождения последнего упражнения",
            "Платёжный модуль автоматически после успешной песочницы",
            "Проверяющий курса по внешнему виду без решения владельца"
          ],
          "why": "Техническая сдача курса не заменяет решение ответственного владельца о рабочем режиме."
        },
        {
          "k": "input",
          "q": "Как называется плагин магазина, в котором в проекте создаются товары и заказы? Напишите латиницей.",
          "a": [
            "WooCommerce"
          ],
          "why": "Итоговый магазин использует WooCommerce для каталога, вариаций, корзины и заказов."
        },
        {
          "k": "order",
          "q": "Расположите этапы итоговой приёмки.",
          "words": [
            "Собрать магазин",
            "Пройти тестовые сценарии",
            "Исправить блокирующие дефекты",
            "Получить решение владельца"
          ],
          "a": "Собрать магазин Пройти тестовые сценарии Исправить блокирующие дефекты Получить решение владельца",
          "why": "Решение о запуске опирается на работающий магазин и результаты исправленных проверок."
        }
      ]
    },
    {
      "id": "wp-x3",
      "t": "Экзамен 3: Надёжность и запуск в России",
      "exam": true,
      "pass": 0.8,
      "covers": [
        "wp-17",
        "wp-18",
        "wp-19",
        "wp-20",
        "wp-21",
        "wp-22",
        "wp-23",
        "wp-24"
      ],
      "q": [
        {
          "k": "choice",
          "q": "Что доказывает письмо WooCommerce «Заказ получен»?",
          "options": [
            "Магазин сформировал уведомление о заказе",
            "Кассовая система обязательно сформировала фискальный чек",
            "Платёжный сервис окончательно подтвердил поступление денег",
            "Товар уже передан покупателю и заказ завершён"
          ],
          "why": "Уведомление WooCommerce относится к заказу; фискализация и маркировка требуют отдельной проверки.",
          "s": "wp-17"
        },
        {
          "k": "choice",
          "q": "Кто подтверждает применимость правовых требований к конкретному магазину?",
          "options": [
            "Владелец со специалистом по актуальным официальным документам",
            "Исполнитель настройки сайта по шаблонному списку из курса",
            "Поставщик платёжного модуля без сведений об ассортименте",
            "Владелец по советам для другого магазина без сверки документов"
          ],
          "why": "Применимость зависит от бизнеса и фактической схемы работы, а не от темы сайта.",
          "s": "wp-17"
        },
        {
          "k": "choice",
          "q": "С чего начать выбор расширения?",
          "options": [
            "С описания задачи и проверки уже доступных средств",
            "С копирования списка плагинов популярного магазина",
            "С установки всех рекомендованных расширений одновременно",
            "С выбора плагина с наибольшим количеством функций"
          ],
          "why": "Задача определяет необходимость инструмента; часть функций уже есть в системе или у хостинга.",
          "s": "wp-18"
        },
        {
          "k": "choice",
          "q": "Когда нужен отдельный плагин перевозчика?",
          "options": [
            "Когда согласованная доставка требует его интеграции",
            "При любой фиксированной стоимости доставки независимо от задачи",
            "Всегда, даже когда магазин предлагает только самовывоз",
            "Чтобы включить штатную зону доставки WooCommerce"
          ],
          "why": "При простых сценариях может хватать штатных методов WooCommerce.",
          "s": "wp-18"
        },
        {
          "k": "choice",
          "q": "Что нужно для полной восстанавливаемой копии магазина?",
          "options": [
            "База данных и необходимые файлы согласованного состояния",
            "Только база данных, поскольку в ней перечислены изображения",
            "Только папка uploads, поскольку товары видны в каталоге",
            "Экспорт товаров CSV и список плагинов вместо базы и файлов"
          ],
          "why": "Данные и файлы решают разные части восстановления; один список настроек не заменяет их.",
          "s": "wp-19"
        },
        {
          "k": "choice",
          "q": "Почему нужна копия вне рабочего сайта?",
          "options": [
            "Чтобы сбой или потеря доступа к сайту не уничтожили единственный архив",
            "Чтобы отказаться от сохранения базы и оставлять только файлы",
            "Чтобы любая старая копия автоматически содержала новые заказы",
            "Чтобы считать копию проверенной без восстановления"
          ],
          "why": "Независимое хранение снижает зависимость копий от одного места и одной учётной записи.",
          "s": "wp-19"
        },
        {
          "k": "choice",
          "q": "Что надёжнее подтверждает доставку письма?",
          "options": [
            "Его получение на контрольном ящике с проверкой содержимого",
            "Сообщение плагина об успешной передаче письма на отправку",
            "Зелёный статус соединения с почтовым сервером",
            "Успешное сохранение настроек SMTP и адреса отправителя"
          ],
          "why": "Принятие сообщения компонентом отправки не гарантирует его появление у адресата.",
          "s": "wp-20"
        },
        {
          "k": "choice",
          "q": "Откуда брать значения SPF и DKIM?",
          "options": [
            "Из документации и настроек выбранного почтового поставщика",
            "Из инструкции другого почтового сервиса без адаптации",
            "Из старых настроек домена без проверки текущих отправителей",
            "Из шаблонного набора DNS, одинакового для всех магазинов"
          ],
          "why": "Параметры связаны с конкретным доменом и почтовой инфраструктурой.",
          "s": "wp-20"
        },
        {
          "k": "choice",
          "q": "Что даёт передача Sitemap Яндексу?",
          "options": [
            "Сообщает поисковой системе структуру доступных страниц",
            "Гарантирует включение каждого переданного товара в поиск",
            "Автоматически снимает запреты robots.txt и noindex",
            "Заменяет ссылки меню и навигацию между категориями"
          ],
          "why": "Яндекс прямо указывает, что переданные URL не обязательно попадут в результаты поиска.",
          "s": "wp-21"
        },
        {
          "k": "choice",
          "q": "Что делать перед изменением URL действующего каталога?",
          "options": [
            "Подготовить карту старых и новых адресов и перенаправления",
            "Изменить адреса сразу и оставить старые ссылки без перенаправлений",
            "Удалить прежние URL из Sitemap и считать переход завершённым",
            "Изменить только заголовки страниц вместо настройки адресов"
          ],
          "why": "Переход со старых адресов нужно сохранить для посетителей и поисковых систем.",
          "s": "wp-21"
        },
        {
          "k": "choice",
          "q": "Какие страницы обычно исключают из полного кеша WooCommerce?",
          "options": [
            "Корзину, оформление заказа и личный кабинет",
            "Только оформление заказа, оставив полный кеш личного кабинета",
            "Только каталог и карточки, оставив кеш корзины включённым",
            "Только админку, поскольку покупатели в неё не входят"
          ],
          "why": "Эти страницы показывают индивидуальные данные пользователя и должны оставаться динамическими.",
          "s": "wp-22"
        },
        {
          "k": "choice",
          "q": "Какой доступ нужен сотруднику для работы?",
          "options": [
            "Отдельная учётная запись с минимально необходимыми правами",
            "Общая администраторская запись для всех сотрудников",
            "Отдельная запись с ролью администратора независимо от задачи",
            "Учётная запись владельца с передачей пароля на время работы"
          ],
          "why": "Отдельная запись и минимальные права снижают риск и позволяют управлять доступом конкретного сотрудника.",
          "s": "wp-22"
        },
        {
          "k": "choice",
          "q": "Чем опасна замена рабочей базы старой базой стенда?",
          "options": [
            "Можно потерять новые заказы, пользователей и остатки",
            "Будут заменены только изображения, а заказы всегда сохранятся",
            "Пострадают только настройки темы, поскольку заказы хранятся вне базы",
            "Все заказы объединятся автоматически при совпадении домена"
          ],
          "why": "Старая копия не содержит изменений, которые появились в рабочей базе позднее.",
          "s": "wp-23"
        },
        {
          "k": "choice",
          "q": "Что сделать до переноса?",
          "options": [
            "Сохранить и проверить доступность копий обеих сред",
            "Скопировать стенд поверх рабочего сайта, затем сделать резервную копию",
            "Сохранить только CSV товаров, считая его полной копией магазина",
            "Полагаться на копию стенда без сохранения целевой рабочей базы"
          ],
          "why": "Копии нужны для восстановления исходного и целевого состояний при неудаче.",
          "s": "wp-23"
        },
        {
          "k": "choice",
          "q": "Что означает полноценный тест покупки в итоговом проекте?",
          "options": [
            "Путь покупателя через интеграцию в официальной песочнице без реального списания",
            "Открытие страницы успеха без сопоставления статуса заказа и платежа",
            "Только ручное создание заказа администратором",
            "Один реальный платёж для проверки без отдельного разрешения владельца"
          ],
          "why": "Нужно проверить интерфейс и интеграцию тестовыми средствами, сохраняя отдельное решение о реальных продажах.",
          "s": "wp-24"
        },
        {
          "k": "choice",
          "q": "Что проверить у вариативной обуви?",
          "options": [
            "Цену, доступность и корректное добавление выбранного размера",
            "Только родительскую карточку, считая доступность размеров одинаковой",
            "Только выбранный по умолчанию размер без проверки остальных",
            "Только наличие атрибута размера без проверки вариаций в корзине"
          ],
          "why": "Покупатель приобретает конкретную вариацию, поэтому проверка родительской карточки недостаточна.",
          "s": "wp-24"
        },
        {
          "k": "input",
          "q": "Как называется основное расширение каталога и заказов в этом курсе? Напишите латиницей.",
          "a": [
            "WooCommerce"
          ],
          "why": "WooCommerce обеспечивает основные функции магазина; дополнительные модули решают отдельные задачи.",
          "s": "wp-18"
        },
        {
          "k": "input",
          "q": "Как сокращённо называется механизм подписи писем, проверку которого описывает урок? Ответ — четыре латинские буквы.",
          "a": [
            "DKIM"
          ],
          "why": "DKIM использует подпись, которая помогает принимающей стороне проверить письмо.",
          "s": "wp-20"
        },
        {
          "k": "input",
          "q": "Как сокращённо называется хранилище заказов WooCommerce на отдельных таблицах? Ответ — четыре латинские буквы.",
          "a": [
            "HPOS"
          ],
          "why": "High-Performance Order Storage хранит заказы в специализированных таблицах.",
          "s": "wp-22"
        },
        {
          "k": "input",
          "q": "Как называется плагин магазина, в котором в проекте создаются товары и заказы? Напишите латиницей.",
          "a": [
            "WooCommerce"
          ],
          "why": "Итоговый магазин использует WooCommerce для каталога, вариаций, корзины и заказов.",
          "s": "wp-24"
        }
      ]
    }
  ]
}
];
