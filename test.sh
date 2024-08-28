LINKS=(
    "https://www.vprok.ru/product/domik-v-derevne-dom-v-der-moloko-ster-3-2-950g--3092"02
    "https://www.vprok.ru/product/domik-v-derevne-dom-v-der-moloko-ster-2-5-950g--3107"78
    "https://www.vprok.ru/product/makfa-makfa-izd-mak-spirali-450g--3067"39
    "https://www.vprok.ru/product/greenfield-greenf-chay-gold-ceyl-bl-pak-100h2g--3074"03
    "https://www.vprok.ru/product/chaykofskiy-chaykofskiy-sahar-pesok-krist-900g--3087"37
    "https://www.vprok.ru/product/lavazza-kofe-lavazza-1kg-oro-zerno--45064"7 
    "https://www.vprok.ru/product/parmalat-parmal-moloko-pit-ulster-3-5-1l--30663"4 
    "https://www.vprok.ru/product/perekrestok-spmi-svinina-duhovaya-1kg--11313"62
    "https://www.vprok.ru/product/vinograd-kish-mish-1-kg--31462"3 
    "https://www.vprok.ru/product/eko-kultura-tomaty-cherri-konfetto-250g--94675"6 
    "https://www.vprok.ru/product/bio-perets-ramiro-1kg--4765"48
    "https://www.vprok.ru/product/korkunov-kollektsiya-shokoladnyh-konfet-korkunov-iz-molochnogo-shokolada-s-fundukom-karamelizirovannym-gretskim-orehom-vafley-svetloy-orehovoy--129569"0 
    "https://www.vprok.ru/product/picnic-picnic-batonchik-big-76g--31199"6 
    "https://www.vprok.ru/product/ritter-sport-rit-sport-shokol-tsel-les-oreh-mol-100g--30508"8 
    "https://www.vprok.ru/product/lays-chipsy-kartofelnye-lays-smetana-luk-140g--1197579" 
)

REGLIST=(
    "Москва и область"
    "Санкт-Петербург и область"
    "Владимирская обл."
    "Калужская обл."
    "Рязанская обл."
    "Тверская обл."
    "Тульская обл."
)

COUNTER=0

for link in "${LINKS[@]}"
do
   echo "Проверка ссылки $link"
   for region in "${REGLIST[@]}"
   do
    echo "$region"
    
    COUNTER=$(expr $COUNTER + 1)
        node index.js $link "${region}"
        echo "Пробрано:" $COUNTER
   done
done