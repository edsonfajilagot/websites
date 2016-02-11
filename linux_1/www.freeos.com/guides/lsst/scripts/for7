#!/bin/bash
#
# Linux Shell Scripting Tutorial 1.05r3, Summer-2002
#
# Written by Vivek G. Gite <vivek@nixcraft.com>
#
# Latest version can be found at http://www.nixcraft.com/
#

clear

for (( i=1; i<=3; i++ ))
do
    for (( j=1; j<=i;  j++ ))
    do
     echo -n "|Linux"
    done
    echo "______"
done

for (( i=3; i>=1; i-- ))
do
    for (( j=1; j<=i;  j++ ))
    do
     echo -n "|Linux"
    done
    
    if [ $i -eq 3 ]; then
       echo -n "______"
       echo -n -e ">> Powerd Server.\n"
    else
       echo "~~~~~"
    fi
done

#
# ./ch.sh: vivek-tech.com to nixcraft.com referance converted using this tool
# See the tool at http://www.nixcraft.com/uniqlinuxfeatures/tools/
#
