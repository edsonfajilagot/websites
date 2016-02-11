BEGIN{
   printf "Press ENTER to continue with for loop example from LSST v1.05r3\n"
}
{
  sum = 0
  i = 1
  for (i=1; i<=10; i++)
  {
 	sum += i; # sum = sum + i
  }
 printf "Sum for 1 to 10 numbers = %d \nGoodbuy!\n\n", sum
 exit 1
}
