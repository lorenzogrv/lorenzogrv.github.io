# lorenzogrv.tech

Arranqué este proyecto en 2021 como uno de los retos prácticos de un bootcamp
de frontend. No llegué a darle "el toque final". En otoño de 2022, empiezo a
reconvertirlo en mi página de marca principal, para <https://lorenzogrv.tech>

## Bitácora

Lo que sigue son anotaciones que fuí haciendo mientras desarrollé el proyecto.
Me gusta escribir, me sirven como diario y referencia, y quizá a alguien le
resulten útiles o guste de leerlas algún día.

### Tramo I: Bootcamp 2011

Las siguientes entradas describen cómo monté este proyecto desde 0, o como me
gusta decir, _from scratch_ (de la nada).

#### Intro

**Lo que me piden es**:

- Usar HTML5, CSS3 y `git`; y más concretamente los modelos flexbox y grid para
  el layout
- El sitio debe tener 3 páginas: Inicio, Contacto, y Perfil. Perfil es opcional,
  pero _let's go_ :rocket:
- Evaluarán:
  - Respetar la nomenclatura HTML5
  - Estructura correcta de archivos HTML y CSS
  - Código limpio e identado
  - Técnicas de diseño CSS

**Me vendré arriba y a mayores**:

- Usaré lorenzogrv.github.io para publicarlo

#### Creando el proyecto

Lo primero es crear un repositorio vacío en github.com. Como voy a usar el sitio
`*.github.com` el nombre en mi caso es `lorenzogrv.github.io`.

```shell
mkdir lorenzogrv.github.io
cd lorenzogrv.github.io
git init
touch README.md
git add README.md
git commit -m "Let's go"
# Por comodidad empleo el acceso vía ssh y ssh-agent
git remote add origin git@github.com:lorenzogrv/lorenzogrv.github.io.git
git push -u origin master
```

#### Usando el sitio *.github.io

La [documentación explica todo paso a paso](https://docs.github.com/es/github/working-with-github-pages/creating-a-github-pages-site):

1. Crear un repositorio cuyo nombre sea el `<root_namespace>.github.io`.
2. En la [configuración del repositorio](https://github.com/lorenzogrv/lorenzogrv.github.io/settings),
   se puede elegir el branch deseado. [Guía aquí](https://docs.github.com/es/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#choosing-a-publishing-source).
   Al crear un repositorio `*.github.io` parece que se activa por defecto. De
   momento lo que se ve es el contenido de este `README.md` reconvertido a HTML
   por el sistema que emplean por defecto (Jekyll).

#### Estructura de directorios

Para mantenerlo ordenado, usaré como raíz un directorio `public/` contenido en
la raíz del repositorio.

```shell
mkdir -p public/{css,img}
touch public/index.html
touch public/css/styles.css
```

En este caso y como se trata de una práctica, escribiré el html y css "a pelo",
partiendo de ficheros vacíos

##### Power user tip

Voy a descargar el thumbnail de mi gravatar personal empleando `wget` y `jq`.

> No sé si voy a usar el thumbnail, pero me apetecía hacer alguna frikeada con
> el [`jq`](https://stedolan.github.io/jq/), y si alguien lee esto y no lo
> conoce que le heche un ojo. Es alucinantemente rápido, aunque este ejemplo no
> sirva para demostrarlo. Pruébalo para trabajar sobre cientos o miles de
> ficheros `json` y verás.

```shell
# esto llama a la API de gravatar e imprime el JSON en plan "pretty"
wget --no-verbose -O - http://es.gravatar.com/laconbass.json 2>/dev/null | jq
# esto descarga la imagen directamente
wget "$(
  wget --no-verbose -O - http://es.gravatar.com/laconbass.json 2>/dev/null \
  | jq --raw-output '.entry[0].thumbnailUrl'
)" -O public/img/laconbass.thumb
```

Realizo unas ediciones mínimas, y subo los ficheros

```shell
vim public/index.html public/css/styles.css
git add public
git add README.md
git commit -m "Minimal structure"
```

#### Configurando el sitio *.github.com

Por lo que investigué rápidamente sobre [Github Pages](https://pages.github.com/)
la configuración por defecto de jekyll "traga" con un `index.html` en la raíz.

Para no rallarme a buscar un ejemplo de configuración `yml` por el momento para
el setup de CI/CD, muevo los ficheros a la raíz.

```shell
mv public/* .
rm -r public
git add .
git commit -m "Move everything to root"
```

Ahora ya se puede ver lo feo que es el sitio en <https://lorenzogrv.github.io>

#### Dándole unos toques _à la_ single page

Dado que se trata de hacerlo "a pelo" _from scratch_, empiezo a darle unos
toques totalmente a mano. Para ello uso mi amado `vim` y [`budo --dir .
--live`](https://github.com/mattdesl/budo) (`npm i -g budo`).

Usaré alguna foto de [picsum](https://picsum.photos ) para hacer backgrounds y
darle un poco de feel. También voy a cargarme el layout cutre que monté a base
de `absolute`, antes de que alguien aterrice y lo vea XD.

> Despues de un rato...

Sigue siendo feo pero ahora tiene un toque. Aproveché para probar (ya era hora)
el `scroll snap`. De momento toqué los enlaces para navegar vía hash a los `id`,
ya veré luego.

Tiene un mínimo de _responsivity_, pero tengo que decidir aún como voy a ubicar
los elementos en los distintos _breakpoints_. Aún no introducí `@media` queries,
quiero darle una vuelta al contenido html primero.

El _look&feel_ es una mierda aún, tengo que decidir la paleta. De momento dejé
los backgrounds en grayscale.

## Tramo II: Otoño 2022

Llevo un tiempo queriendo montar una web _principal_ (por llamarlo de algún
modo) para mi dominio principal lorenzogrv.tech; y por algún motivo hoy decidí
reconvertir este sitio estático en ella. Aún hay trabajo que hacer aquí.

### Configurar el dominio

Un checkup rápido por en los "Settings" > "Pages" del proyecto me dirige a un
par de enlaces de la doc de gitlab sobre cómo proceder.

1. Añadir un dominio verificado en la **configuración de la cuenta de usuario**.
   En esta [guía](https://docs.github.com/es/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
   explican detalladamente como añadir y verificar un dominio.
2. Apuntar los registros DNS del dominio a los servidores de gitlab pages.
   En [esta guía](https://docs.github.com/es/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
   lo explican en detalle. En mi caso, como estoy usando un dominio de primer
   nivel (_apex domain_) utilizo registros `A` y las IPs
3. Configurar el dominio en la configuración de _Pages_ del proyecto.
   Github recomienda apuntar también el subdominio `www` para _apex domains_
   pero quiero el dominio limpio en la url. Como me mostraba un warning,
   redirigí el subdominio (usando 302 Permanently) a la url del dominio
   principal. De este modo eliminé el warning.

### Setup con un tooling moderno

[parcel]: https://parceljs.org/
[vite]: https://vitejs.dev/

Por el momento no haré cosas complicadas pero sí sentaré las bases del tooling
para la web. En un inicio pensé en montarlo con [parcel] dado que últimamente es
lo que estoy usando, pero me apetece dar el paso ya con [vite] y probarlo. Voy a
ello.

```bash
npm init --yes

# Para no ensuciar, veo la estructura aparte
pushd ..
npm create vite@latest # uso la plantilla vanilla
tree vite-project # ...

# Y luego voy adaptando cosillas
popd
npm install --save-dev vite
vim package.json
# set private=true
# set type=module
# add basic scripts (start, build, preview)
mkdir public

# Retoco conforme a lo que veo interesante
vim index.html
# Descubro alguna cosa interesante que no conocía
cat ../vite-project/styles.css
# Ediciones, ediciones, ediciones ...
```

- [x] Retocar la cabecera
- [x] Retocar los textos
- [x] Tunear el año del ©
- [x] Tunear el texto del about
- [x] Mejorar la legibilidad
- [x] Animar la navegación
- [x] Substituír la sección contacto por otra cosa

### Publicación usando github actions

Toca probar ya los github actions. Salieron poco después de cambiarme a Gitlab
precisamente por el CI, y me apetece ver cómo va. Algo tan simple como un deploy
estático de pages es perfecto para probar.

Para hacerlo más interesante usé estados de `history` para ver cómo puedo
corregir los 404.

En [esta guía](https://docs.github.com/es/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
como proceder. En la propia guía no hay ejemplos de código, por lo que voy a
investigar un poco y probar siguiendo mi intuición...
