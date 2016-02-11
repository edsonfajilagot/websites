dialog --title "Inputbox - To take input from you" --backtitle "Linux Shell\
Script Tutorial" --inputbox "Enter your name please" 8 60 2>/tmp/input.$$ 

sel=$?

na=`cat /tmp/input.$$`
case $sel in
    0) echo "Hello $na" ;;
    1) echo "Cancel is Press" ;; 
    255) echo "[ESCAPE] key pressed" ;;
esac

rm -f /tmp/input.$$

#
# ./ch.sh: vivek-tech.com to nixcraft.com referance converted using this tool
# See the tool at http://www.nixcraft.com/uniqlinuxfeatures/tools/
#
