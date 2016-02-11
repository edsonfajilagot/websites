#!/bin/bash
#
# Linux Shell Scripting Tutorial 1.05r3, Summer-2002
#
# Written by Vivek G. Gite <vivek@nixcraft.com>
#
# Latest version can be found at http://www.nixcraft.com/
#

MAX_NO=0

echo -n "Enter Number between (5 to 9) : "
read MAX_NO

if ! [ $MAX_NO -ge 5 -a $MAX_NO -le 9 ] ; then
   echo "I ask to enter number between 5 and 9, Okay"
   exit 1
fi

clear

for (( i=1; i<=MAX_NO; i++ ))
do
    for (( s=MAX_NO; s>=i; s-- ))
    do
       echo -n " "
    done
    for (( j=1; j<=i;  j++ ))
    do
     echo -n " ." 
    done
    echo ""
done
###### Second stage ######################
##
##
for (( i=MAX_NO; i>=1; i-- ))
do
    for (( s=i; s<=MAX_NO; s++ ))
    do
       echo -n " "
    done
    for (( j=1; j<=i;  j++ ))
    do
     echo -n " ."
    done
    echo ""
done


echo -e "\n\n\t\t\tI hope you like it my stupidity (?)"

#
# ./ch.sh: vivek-tech.com to nixcraft.com referance converted using this tool
# See the tool at http://www.nixcraft.com/uniqlinuxfeatures/tools/
#
