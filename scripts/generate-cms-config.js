import fs from "fs";
import path from "path";

// Read environment variables
const isDev = process.env.NODE_ENV === "development";

// Base config
const config = {
  backend: {
    name: "git-gateway",
    branch: "main",
  },
  local_backend: isDev,
  media_folder: "public/uploads",
  public_folder: "/uploads",
  locale: "ru",
  collections: [
    {
      name: "menu-items",
      label: "Меню Позиции",
      folder: "content/menu-items",
      create: true,
      slug: "{{category}}-{{slug}}",
      identifier_field: "name",
      fields: [
        { label: "Название", name: "name", widget: "string" },
        {
          label: "Категория",
          name: "category",
          collection: "settings",
          file: "pages",
          widget: "relation",
          search_fields: ["menu.categories.*.name", "menu.categories.*.title"],
          value_field: "menu.categories.*.name",
          display_fields: ["menu.categories.*.title"],
          default: "coffee",
        },
        { label: "Описание", name: "description", widget: "text" },
        {
          label: "Варианты продукта",
          name: "variants",
          widget: "list",
          required: false,
          fields: [
            {
              label: "Размер (л)",
              name: "size",
              widget: "string",
              required: false,
              hint: "Например: 0.3, 0.5, 1.0 или оставьте пустым для чая",
            },
            {
              label: "Цена (сом)",
              name: "price",
              widget: "number",
              value_type: "int",
            },
            {
              label: "Описание",
              name: "description",
              widget: "string",
              required: false,
              hint: "Например: маленький, средний, большой",
            },
          ],
          hint: "Добавьте варианты продукта с размерами и ценами",
        },
        {
          label: "Картинка",
          name: "image",
          widget: "image",
          required: false,
          allow_multiple: false,
        },
        {
          label: "Доступность",
          name: "available",
          widget: "boolean",
          default: true,
        },
        {
          label: "Порядок отображения",
          name: "order",
          widget: "number",
          value_type: "int",
          default: 1,
          hint: "Меньшее число = выше в списке",
        },
        {
          label: "Рекомендуемый на главной",
          name: "featured",
          widget: "boolean",
          required: false,
          default: false,
          hint: "Отображать этот товар на главной странице",
        },
        {
          label: "Новинка",
          name: "isNew",
          widget: "boolean",
          required: false,
          default: false,
          hint: "Отображать значок новинки для этого товара",
        },
      ],
    },
    {
      name: "promotions",
      label: "Акции",
      folder: "content/promotions",
      create: true,
      slug: "{{slug}}",
      required: false,
      identifier_field: "title",
      fields: [
        {
          label: "Заголовок",
          name: "title",
          widget: "string",
          required: false,
        },
        {
          label: "Описание",
          name: "description",
          widget: "text",
          required: false,
        },
        {
          label: "Скидка (%)",
          name: "discount",
          widget: "number",
          value_type: "int",
          required: false,
          hint: "Укажите процент скидки, если применимо",
        },
        {
          label: "Условия",
          name: "terms",
          widget: "text",
          required: false,
        },
        {
          label: "Активна",
          name: "active",
          widget: "boolean",
          default: true,
        },
        {
          label: "Иконка",
          name: "icon",
          widget: "string",
          required: false,
          hint: "Emoji или название иконки",
        },
      ],
    },
    {
      name: "settings",
      label: "Настройки Сайта",
      files: [
        {
          label: "Общие настройки",
          name: "general",
          file: "content/settings/general.json",
          fields: [
            {
              label: "Название заведения",
              name: "siteName",
              widget: "string",
              default: "Кофе и Чай",
            },
            {
              label: "Логотип",
              name: "logo",
              widget: "image",
              required: false,
            },
            {
              label: "Часы работы",
              name: "hours",
              widget: "object",
              fields: [
                {
                  label: "Будни",
                  name: "weekdays",
                  widget: "string",
                  default: "08:00 - 22:00",
                },
                {
                  label: "Выходные",
                  name: "weekend",
                  widget: "string",
                  default: "09:00 - 23:00",
                },
              ],
            },
            {
              label: "Контакты",
              name: "contact",
              widget: "object",
              fields: [
                { label: "Телефон", name: "phone", widget: "string" },
                { label: "Адрес", name: "address", widget: "text" },
                {
                  label: "Instagram",
                  name: "instagram",
                  widget: "string",
                  required: false,
                },
              ],
            },
          ],
        },
        {
          label: "SEO и Метаданные",
          name: "metadata", 
          file: "content/settings/metadata.json",
          fields: [
            {
              label: "Основные метаданные",
              name: "site",
              widget: "object",
              fields: [
                {
                  label: "Заголовок сайта",
                  name: "title",
                  widget: "string",
                  default: "Coffee & Tea Menu",
                  hint: "Основной заголовок сайта для поисковых систем",
                },
                {
                  label: "Описание сайта",
                  name: "description",
                  widget: "text",
                  default: "Лучший кофе, чай и матча в городе. Свежеобжаренные зерна, авторские рецепты и уютная атмосфера.",
                  hint: "Краткое описание сайта для поисковых систем (150-160 символов)",
                },
                {
                  label: "Ключевые слова",
                  name: "keywords",
                  widget: "list",
                  allow_add: true,
                  field: { label: "Ключевое слово", name: "keyword", widget: "string" },
                  default: ["кофе", "чай", "матча", "кафе", "Бишкек"],
                  hint: "Ключевые слова для поисковых систем",
                },
                {
                  label: "URL сайта",
                  name: "url",
                  widget: "string",
                  default: "https://your-coffee-site.com",
                  hint: "Основной URL сайта",
                },
                {
                  label: "Изображение сайта",
                  name: "image",
                  widget: "image",
                  required: false,
                  hint: "Основное изображение для социальных сетей (рекомендуется 1200x630px)",
                },
              ],
            },
            {
              label: "Open Graph (Facebook, ВКонтакте)",
              name: "openGraph",
              widget: "object",
              fields: [
                {
                  label: "OG заголовок",
                  name: "title",
                  widget: "string",
                  required: false,
                  hint: "Заголовок для социальных сетей (по умолчанию - заголовок сайта)",
                },
                {
                  label: "OG описание",
                  name: "description",
                  widget: "text",
                  required: false,
                  hint: "Описание для социальных сетей (по умолчанию - описание сайта)",
                },
                {
                  label: "OG изображение",
                  name: "image",
                  widget: "image",
                  required: false,
                  hint: "Изображение для социальных сетей (рекомендуется 1200x630px)",
                },
                {
                  label: "Тип контента",
                  name: "type",
                  widget: "select",
                  options: ["website", "article", "business.business"],
                  default: "website",
                },
              ],
            },
            {
              label: "Twitter Card",
              name: "twitter",
              widget: "object",
              fields: [
                {
                  label: "Twitter заголовок",
                  name: "title",
                  widget: "string",
                  required: false,
                  hint: "Заголовок для Twitter (по умолчанию - заголовок сайта)",
                },
                {
                  label: "Twitter описание",
                  name: "description",
                  widget: "text",
                  required: false,
                  hint: "Описание для Twitter (по умолчанию - описание сайта)",
                },
                {
                  label: "Twitter изображение",
                  name: "image",
                  widget: "image",
                  required: false,
                  hint: "Изображение для Twitter (рекомендуется 1200x600px)",
                },
                {
                  label: "Тип карточки",
                  name: "card",
                  widget: "select",
                  options: ["summary", "summary_large_image"],
                  default: "summary_large_image",
                },
                {
                  label: "Twitter аккаунт",
                  name: "site",
                  widget: "string",
                  required: false,
                  hint: "Twitter аккаунт сайта (например: @yoursite)",
                },
              ],
            },
          ],
        },
        {
          label: "Настройки страниц",
          name: "pages",
          file: "content/settings/pages.json",
          fields: [
            {
              label: "Главная страница",
              name: "home",
              widget: "object",
              fields: [
                {
                  label: "Заголовок героя",
                  name: "heroTitle",
                  widget: "string",
                  default: "Добро пожаловать в наш уютный мир",
                },
                {
                  label: "Подзаголовок героя",
                  name: "heroSubtitle",
                  widget: "string",
                  default: "Лучший кофе, чай и матча в городе",
                },
                {
                  label: "Текст кнопки меню",
                  name: "menuButtonText",
                  widget: "string",
                  default: "Посмотреть меню",
                },
                {
                  label: "Секция акций",
                  name: "promotionsSection",
                  widget: "object",
                  required: false,
                  fields: [
                    {
                      label: "Заголовок",
                      name: "title",
                      widget: "string",
                      default: "🎉 Актуальные акции",
                    },
                    {
                      label: "Описание",
                      name: "description",
                      widget: "text",
                      default:
                        "Не упустите возможность попробовать наши новинки и получить скидки!",
                    },
                    {
                      label: "Текст кнопки",
                      name: "buttonText",
                      widget: "string",
                      default: "Смотреть все акции",
                    },
                  ],
                },
              ],
            },
            {
              label: "Страница меню",
              name: "menu",
              widget: "object",
              fields: [
                {
                  label: "Заголовок страницы",
                  name: "pageTitle",
                  widget: "string",
                  default: "Наше меню",
                },
                {
                  label: "Категории",
                  name: "categories",
                  widget: "list",
                  fields: [
                    { label: "Название", name: "name", widget: "string" },
                    { label: "Заголовок", name: "title", widget: "string" },
                    { label: "Иконка", name: "icon", widget: "string" },
                  ],
                },
              ],
            },
            {
              label: "Страница акций",
              name: "promotions",
              widget: "object",
              required: false,
              fields: [
                {
                  label: "Заголовок страницы",
                  name: "pageTitle",
                  widget: "string",
                  default: "Актуальные акции",
                  required: false,
                },
                {
                  label: "Описание",
                  required: false,
                  name: "description",
                  widget: "text",
                  default:
                    "Следите за нашими специальными предложениями и скидками",
                },
                {
                  label: "Условия",
                  name: "terms",
                  widget: "object",
                  required: false,
                  fields: [
                    {
                      label: "Заголовок",
                      name: "title",
                      widget: "string",
                      required: false,
                      default: "Условия акций",
                    },
                    {
                      label: "Пункты условий",
                      name: "items",
                      widget: "list",
                      required: false,
                      field: {
                        label: "Условие",
                        name: "item",
                        widget: "string",
                        required: false,
                      },
                    },
                  ],
                },
              ],
            },
            {
              label: "UI сообщения",
              name: "ui",
              widget: "object",
              fields: [
                {
                  label: "Загрузка",
                  name: "loading",
                  widget: "string",
                  default: "Загрузка меню...",
                },
                {
                  label: "Не найдено",
                  name: "notFound",
                  widget: "string",
                  default: "Товар не найден",
                },
                {
                  label: "Недоступно",
                  name: "unavailable",
                  widget: "string",
                  default: "Временно недоступно",
                },
                {
                  label: "В наличии",
                  name: "available",
                  widget: "string",
                  default: "В наличии",
                },
                {
                  label: "Нет в наличии",
                  name: "outOfStock",
                  widget: "string",
                  default: "Нет в наличии",
                },
                {
                  label: "Цена не указана",
                  name: "noPriceText",
                  widget: "string",
                  default: "Цена не указана",
                },
                {
                  label: "Назад к меню",
                  name: "backToMenu",
                  widget: "string",
                  default: "← Назад к меню",
                },
                {
                  label: "Значок новинки",
                  name: "newItemBadge",
                  widget: "string",
                  default: "Новинка",
                  hint: "Текст значка для новых позиций в меню",
                },
              ],
            },
            {
              label: "Подвал",
              name: "footer",
              widget: "object",
              required: false,
              fields: [
                {
                  label: "Социальные сети",
                  name: "social",
                  widget: "object",
                  required: false,
                  fields: [
                    {
                      label: "Сообщение о присоединении",
                      name: "joinMessage",
                      widget: "string",
                      required: false,
                      default: "Присоединяйтесь к нашему сообществу",
                    },
                    {
                      label: "URL Telegram",
                      name: "telegramUrl",
                      widget: "string",
                      required: false,
                      default: "https://t.me/+o6dcETGoWoVjYWZi",
                    },
                    {
                      label: "Текст кнопки Telegram",
                      name: "telegramLabel",
                      widget: "string",
                      required: false,
                      default: "Telegram",
                    },
                    {
                      label: "Описание",
                      name: "description",
                      widget: "string",
                      required: false,
                      default: "Новости, акции и общение с кофеманами",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// Convert to YAML-like format
function toYAML(obj, indent = 0) {
  const spaces = "  ".repeat(indent);
  let yaml = "";

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) continue;

    if (Array.isArray(value)) {
      yaml += `${spaces}${key}:\n`;
      value.forEach((item) => {
        if (typeof item === "object") {
          yaml += `${spaces}  - ${toYAML(item, indent + 2).replace(
            /^\s*/,
            "",
          )}`;
        } else {
          yaml += `${spaces}  - ${JSON.stringify(item)}\n`;
        }
      });
    } else if (typeof value === "object") {
      yaml += `${spaces}${key}:\n`;
      yaml += toYAML(value, indent + 1);
    } else if (typeof value === "string") {
      yaml += `${spaces}${key}: ${JSON.stringify(value)}\n`;
    } else {
      yaml += `${spaces}${key}: ${value}\n`;
    }
  }

  return yaml;
}

// Generate YAML content
let yamlContent = "";

// Add comments
if (isDev) {
  yamlContent += "# Development configuration with local backend\n";
} else {
  yamlContent += "# Production configuration for Netlify\n";
}

yamlContent += toYAML(config);

// Write to config.yml
const configPath = path.join(process.cwd(), "public", "admin", "config.yml");
fs.writeFileSync(configPath, yamlContent);

console.log(
  `CMS config generated for ${
    isDev ? "development" : "production"
  } environment`,
);
